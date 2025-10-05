import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Trouver uniquement le patient EN_COURS dans la file d'attente
    const patientEnCours = await prisma.fileAttente.findFirst({
      where: {
        statut: 'EN_COURS'
      },
      include: {
        patient: true
      }
    });

    if (!patientEnCours) {
      return NextResponse.json(null);
    }

    // 2. Chercher la consultation du jour pour ce patient
    const currentConsultation = await prisma.consultation.findFirst({
      where: {
        AND: [
          {
            patientId: patientEnCours.patient_id
          },
          {
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)) // Aujourd'hui
            }
          }
        ]
      },
      include: {
        patient: true,
        medecin: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(currentConsultation);

  } catch (error) {
    console.error('Error fetching current consultation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




