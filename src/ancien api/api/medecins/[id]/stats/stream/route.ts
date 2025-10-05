import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Cache pour le temps moyen
const tempsMoyenCache = new Map<number, { 
  valeur: string;
  timestamp: number;
  nombreConsultations: number; 
}>();

// Durée du cache: 15 minutes
const CACHE_DURATION = 15 * 60 * 1000;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const { id } = await Promise.resolve(params);
  const medecinId = parseInt(id);

  if (isNaN(medecinId)) {
    return NextResponse.json(
      { error: "ID du médecin invalide" },
      { status: 400 }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const sendStats = async () => {
        try {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          // Récupérer les patients en attente (requête légère)
          const fileAttente = await prisma.fileAttente.findMany({
            where: {
              medecin_id: medecinId,
              statut: 'EN_ATTENTE'
            },
          });

          // Récupérer les consultations du jour (requête légère)
          const consultations = await prisma.consultation.count({
            where: {
              medecinId: medecinId,
              date: {
                gte: today,
                lt: tomorrow,
              },
            },
          });

          // Vérifier le cache pour le temps moyen
          let tempsMoyen = '00:00';
          const cacheData = tempsMoyenCache.get(medecinId);
          const maintenant = Date.now();

          if (cacheData && 
              (maintenant - cacheData.timestamp < CACHE_DURATION) && 
              (consultations === cacheData.nombreConsultations)) {
            tempsMoyen = cacheData.valeur;
          } else {
            // Calculer uniquement si nécessaire
            const derniereConsultation = await prisma.consultation.findFirst({
              where: {
                medecinId: medecinId,
                date: {
                  gte: today,
                  lt: tomorrow,
                },
                diagnostic: { not: null }, // Une consultation avec diagnostic est considérée comme terminée
              },
              orderBy: {
                date: 'desc',
              },
              select: {
                date: true,
                cree_le: true,
              },
            });

            let tempsMoyen = '00:00';
            if (derniereConsultation) {
              const dureeMinutes = Math.max(
                0,
                Math.floor(
                  (derniereConsultation.date.getTime() - 
                   derniereConsultation.cree_le.getTime()) / (1000 * 60)
                )
              );
              
              const heures = Math.floor(dureeMinutes / 60);
              const minutes = dureeMinutes % 60;
              tempsMoyen = `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            }

            // Mettre en cache
            tempsMoyenCache.set(medecinId, {
              valeur: tempsMoyen,
              timestamp: maintenant,
              nombreConsultations: consultations
            });
          }

          const stats = {
            enAttente: fileAttente.length,
            consultationsDuJour: consultations,
            tempsMoyen
          };

          controller.enqueue(`data: ${JSON.stringify(stats)}\n\n`);
        } catch (error) {
          console.error('Erreur lors de la récupération des stats:', error);
          controller.enqueue(`data: ${JSON.stringify({ error: 'Erreur serveur' })}\n\n`);
        }
      };

      await sendStats();
      const interval = setInterval(sendStats, 5000);

      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
      });
    }
  });

  return new Response(stream, { headers });
}
