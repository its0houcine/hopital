import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const medecinId = parseInt(id);

  if (isNaN(medecinId)) {
    return NextResponse.json(
      { error: "ID du médecin invalide" },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let isActive = true;
      let intervalId: NodeJS.Timeout | null = null;

      const sendFileAttente = async () => {
        if (!isActive) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          return;
        }

        try {
          const fileAttente = await prisma.fileAttente.findMany({
            where: {
              medecin_id: medecinId,
              statut: 'EN_ATTENTE',
            },
            include: {
              patient: {
                select: {
                  id: true,
                  nom: true,
                  prenom: true,
                  numero_patient: true,
                  photo: true
                }
              }
            },
            orderBy: {
              ordre: 'asc'
            }
          });

          if (isActive) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(fileAttente)}\n\n`));
          }
        } catch (error) {
          console.error('Erreur:', error);
          if (isActive) {
            isActive = false;
            if (intervalId) {
              clearInterval(intervalId);
            }
            controller.error(error);
          }
        }
      };

      // Envoi initial
      await sendFileAttente();

      // Mise à jour toutes les 2 secondes
      intervalId = setInterval(sendFileAttente, 2000);

      return () => {
        isActive = false;
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
    },

    cancel() {
      console.log('Stream cancelled by client');
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

