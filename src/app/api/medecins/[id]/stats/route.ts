import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Cache pour les statistiques
const statsCache = new Map<number, {
  data: any;
  timestamp: number;
}>();

// Durée du cache: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

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

    // Vérifier le cache
    const cachedStats = statsCache.get(medecinId);
    if (cachedStats && Date.now() - cachedStats.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedStats.data);
    }

    // Vérifier si le médecin existe
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinId }
    });

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        { status: 404 }
      );
    }

    // Calculer les statistiques
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalPatients,
      patientsEnAttente,
      consultationsAujourdhui,
      consultationsTotal
    ] = await Promise.all([
      // Nombre total de patients
      prisma.patient.count({
        where: { medecinId }
      }),

      // Patients en attente
      prisma.fileAttente.count({
        where: {
          medecinId,
          statut: 'EN_ATTENTE'
        }
      }),

      // Consultations aujourd'hui
      prisma.consultation.count({
        where: {
          medecinId,
          date: {
            gte: today
          }
        }
      }),

      // Total des consultations
      prisma.consultation.count({
        where: { medecinId }
      })
    ]);

    // Temps moyen de consultation (en minutes) basé sur les données réelles
    const consultations = await prisma.consultation.findMany({
      where: {
        medecinId,
        date: {
          gte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 derniers jours
        }
      },
      select: {
        debut: true,
        fin: true
      }
    });

    // Calculer le temps moyen des consultations
    let tempsMoyen = 0;
    if (consultations.length > 0) {
      let totalTemps = 0;
      let count = 0;

      for (const consultation of consultations) {
        let dureeEnMinutes = 0;

        // Si la consultation a une date de début et de fin, calculer la durée réelle
        if (consultation.debut && consultation.fin) {
          dureeEnMinutes = Math.round(
            (consultation.fin.getTime() - consultation.debut.getTime()) / (1000 * 60)
          );
        }
        // Sinon, si la consultation a seulement une date de début, estimer la durée
        // en fonction du temps écoulé depuis le début (max 60 minutes)
        else if (consultation.debut) {
          const now = new Date();
          const elapsedMinutes = Math.round(
            (now.getTime() - consultation.debut.getTime()) / (1000 * 60)
          );
          dureeEnMinutes = Math.min(elapsedMinutes, 60); // Limiter à 60 minutes
        }
        // Si pas de date de début ni de fin, utiliser une valeur par défaut
        else {
          dureeEnMinutes = 25; // Durée moyenne par défaut
        }

        // Ne prendre en compte que les durées raisonnables (entre 1 et 180 minutes)
        if (dureeEnMinutes > 0 && dureeEnMinutes <= 180) {
          totalTemps += dureeEnMinutes;
          count++;
        }
      }

      tempsMoyen = count > 0 ? Math.round(totalTemps / count) : 0;
    }

    const stats = {
      totalPatients,
      patientsEnAttente,
      consultationsAujourdhui,
      consultationsTotal,
      tempsMoyen: `${tempsMoyen} minutes`
    };

    // Mettre en cache
    statsCache.set(medecinId, {
      data: stats,
      timestamp: Date.now()
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
