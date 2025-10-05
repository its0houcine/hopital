import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const encoder = new TextEncoder();
  
  const customReadable = new ReadableStream({
    async start(controller) {
      let isActive = true;
      let intervalId: NodeJS.Timeout | null = null;

      const sendUpdate = async () => {
        if (!isActive) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          return;
        }
        
        try {
          const fileAttente = await prisma.fileAttente.findMany({
            include: {
              patient: true,
              medecin: true,
            },
            orderBy: {
              ordre: 'asc',
            },
          });

          if (isActive) {
            const data = `data: ${JSON.stringify(fileAttente)}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        } catch (error) {
          console.error('Erreur streaming:', error);
          if (isActive) {
            isActive = false;
            if (intervalId) {
              clearInterval(intervalId);
            }
            controller.error(error);
          }
        }
      };

      // Initial update
      await sendUpdate();

      // Set up interval
      intervalId = setInterval(sendUpdate, 2000);

      return () => {
        isActive = false;
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
    },

    cancel() {
      // Cette méthode sera appelée quand le client se déconnecte
      console.log('Stream cancelled by client');
    }
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}


