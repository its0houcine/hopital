import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Redis } from "@upstash/redis";

// Créer une instance Redis pour le cache distribué (si disponible)
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.warn("Redis n'est pas configuré, utilisation du cache en mémoire uniquement");
}

// Cache en mémoire pour les statistiques (fallback si Redis n'est pas disponible)
const statsCache = new Map<string, { 
  data: any;
  timestamp: number;
}>();

// Durée du cache: 2 minutes pour les données fréquemment mises à jour
const CACHE_DURATION_SHORT = 2 * 60 * 1000;
// Durée du cache: 15 minutes pour les données qui changent moins souvent
const CACHE_DURATION_LONG = 15 * 60 * 1000;

// Fonction pour récupérer du cache (Redis ou mémoire)
async function getFromCache(key: string): Promise<any | null> {
  try {
    // Essayer Redis d'abord
    if (redis) {
      const cachedData = await redis.get(key);
      if (cachedData) return cachedData;
    }
    
    // Fallback sur le cache en mémoire
    const memoryCache = statsCache.get(key);
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION_SHORT) {
      return memoryCache.data;
    }
    
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération du cache:", error);
    return null;
  }
}

// Fonction pour mettre en cache (Redis et mémoire)
async function setCache(key: string, data: any, duration: number): Promise<void> {
  try {
    // Mettre en cache dans Redis
    if (redis) {
      await redis.set(key, data, { ex: Math.floor(duration / 1000) });
    }
    
    // Mettre en cache en mémoire comme fallback
    statsCache.set(key, {
      data,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error("Erreur lors de la mise en cache:", error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const medecinId = parseInt(params.id);
    
    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID du médecin invalide" },
        { status: 400 }
      );
    }

    // Ajouter un timestamp à la clé de cache pour éviter les problèmes de cache navigateur
    const { searchParams } = new URL(request.url);
    const timestamp = searchParams.get('t') || Date.now().toString();
    
    // Clés de cache pour différentes parties des statistiques
    const cacheKeyBase = `medecin:${medecinId}:stats`;
    const cacheKeyRealtime = `${cacheKeyBase}:realtime:${Math.floor(Date.now() / (30 * 1000))}`; // Rafraîchir toutes les 30 secondes
    const cacheKeyDaily = `${cacheKeyBase}:daily:${new Date().toISOString().split('T')[0]}`; // Rafraîchir chaque jour
    
    // Vérifier le cache pour les données en temps réel
    const cachedRealtimeStats = await getFromCache(cacheKeyRealtime);
    
    // Vérifier le cache pour les données quotidiennes
    const cachedDailyStats = await getFromCache(cacheKeyDaily);
    
    // Si tout est en cache, retourner les données combinées
    if (cachedRealtimeStats && cachedDailyStats) {
      const combinedStats = {
        ...cachedRealtimeStats,
        ...cachedDailyStats,
        cached: true,
        timestamp
      };
      
      return NextResponse.json(combinedStats, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Response-Time': Date.now().toString(),
        }
      });
    }

    // Vérifier si le médecin existe (cette vérification peut être mise en cache plus longtemps)
    const medecinCacheKey = `medecin:${medecinId}:exists`;
    let medecinExists = await getFromCache(medecinCacheKey);
    
    if (medecinExists === null) {
      const medecin = await prisma.medecin.findUnique({
        where: { id: medecinId },
        select: { id: true } // Sélectionner uniquement l'ID pour une requête légère
      });
      
      medecinExists = !!medecin;
      
      // Mettre en cache pour 24 heures (cette information change rarement)
      await setCache(medecinCacheKey, medecinExists, 24 * 60 * 60 * 1000);
    }

    if (!medecinExists) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer les données en temps réel si elles ne sont pas en cache
    let realtimeStats: any = cachedRealtimeStats;
    if (!realtimeStats) {
      // Utiliser une seule requête agrégée pour les comptages
      const [fileAttenteStats, consultationsAujourdhui] = await Promise.all([
        // Statistiques de la file d'attente (une seule requête)
        prisma.$queryRaw`
          SELECT 
            COUNT(*) FILTER (WHERE statut = 'EN_ATTENTE') as en_attente,
            COUNT(*) FILTER (WHERE statut = 'EN_COURS') as en_cours
          FROM "FileAttente"
          WHERE "medecinId" = ${medecinId}
        `,
        
        // Consultations d'aujourd'hui
        prisma.consultation.count({
          where: {
            medecinId,
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
          }
        })
      ]);
      
      // Extraire les valeurs de la requête agrégée
      const fileAttenteData = fileAttenteStats as any[];
      const enAttente = parseInt(fileAttenteData[0]?.en_attente || '0');
      const enCours = parseInt(fileAttenteData[0]?.en_cours || '0');
      
      realtimeStats = {
        enAttente,
        enCours,
        consultationsDuJour: consultationsAujourdhui
      };
      
      // Mettre en cache les données en temps réel (courte durée)
      await setCache(cacheKeyRealtime, realtimeStats, CACHE_DURATION_SHORT);
    }

    // Récupérer les données quotidiennes si elles ne sont pas en cache
    let dailyStats: any = cachedDailyStats;
    if (!dailyStats) {
      // Récupérer les données qui changent moins fréquemment
      const [totalPatients, consultationsTotal, tempsMoyenData] = await Promise.all([
        // Nombre total de patients
        prisma.patient.count({
          where: { medecinId }
        }),
        
        // Total des consultations
        prisma.consultation.count({
          where: { medecinId }
        }),
        
        // Temps moyen de consultation (requête optimisée)
        prisma.$queryRaw`
          WITH recent_consultations AS (
            SELECT 
              date,
              LAG(date) OVER (ORDER BY date) as prev_date
            FROM "Consultation"
            WHERE "medecinId" = ${medecinId}
            AND date >= ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
            ORDER BY date
          )
          SELECT 
            AVG(
              CASE 
                WHEN EXTRACT(EPOCH FROM (date - prev_date)) / 60 BETWEEN 1 AND 120 
                THEN EXTRACT(EPOCH FROM (date - prev_date)) / 60
                ELSE NULL
              END
            ) as avg_minutes
          FROM recent_consultations
          WHERE prev_date IS NOT NULL
        `
      ]);
      
      // Extraire le temps moyen
      const tempsMoyenResult = tempsMoyenData as any[];
      const tempsMoyenMinutes = Math.round(parseFloat(tempsMoyenResult[0]?.avg_minutes || '0'));
      
      // Formater le temps moyen
      let tempsMoyen: string;
      if (tempsMoyenMinutes > 0) {
        const heures = Math.floor(tempsMoyenMinutes / 60);
        const minutes = tempsMoyenMinutes % 60;
        tempsMoyen = heures > 0 
          ? `${heures}h ${minutes}min` 
          : `${minutes} minutes`;
      } else {
        tempsMoyen = "N/A";
      }
      
      dailyStats = {
        totalPatients,
        consultationsTotal,
        tempsMoyen
      };
      
      // Mettre en cache les données quotidiennes (longue durée)
      await setCache(cacheKeyDaily, dailyStats, CACHE_DURATION_LONG);
    }

    // Combiner les statistiques
    const stats = {
      ...realtimeStats,
      ...dailyStats,
      cached: false,
      timestamp
    };

    // Retourner les statistiques avec des en-têtes pour éviter la mise en cache côté client
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Response-Time': Date.now().toString(),
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
