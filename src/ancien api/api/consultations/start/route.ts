import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileAttenteId, medecinId } = body;

    if (!fileAttenteId || !medecinId) {
      return NextResponse.json(
        { error: "fileAttenteId et medecinId sont requis" },
        { status: 400 }
      );
    }

    const fileAttenteIdNum = Number(fileAttenteId);
    const medecinIdNum = Number(medecinId);

    // Vérification de la file d'attente avec le patient
    const fileAttenteItem = await prisma.fileAttente.findUnique({
      where: { id: fileAttenteIdNum },
      include: { 
        patient: true,
        medecin: true
      }
    });

    if (!fileAttenteItem) {
      return NextResponse.json(
        { error: "Patient non trouvé dans la file d'attente" },
        { status: 404 }
      );
    }

    // Vérifier s'il y a une consultation active en cours (pas terminée)
    const activeConsultation = await prisma.consultation.findFirst({
      where: {
        AND: [
          {
            patientId: fileAttenteItem.patient_id,
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)) // Aujourd'hui
            }
          },
          {
            patient: {
              fileAttente: {
                some: {
                  statut: 'EN_COURS'
                }
              }
            }
          }
        ]
      }
    });

    if (activeConsultation) {
      return NextResponse.json(
        { error: "Une consultation est déjà en cours pour ce patient" },
        { status: 400 }
      );
    }

    // Création de la consultation et mise à jour dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer la consultation
      const consultation = await tx.consultation.create({
        data: {
          patientId: fileAttenteItem.patient_id,
          medecinId: medecinIdNum,
          date: new Date(),
          type: 'STANDARD'
        },
        include: {
          patient: true,
          medecin: true
        }
      });

      // 2. Mettre à jour le statut dans la file d'attente
      await tx.fileAttente.update({
        where: { id: fileAttenteIdNum },
        data: { statut: 'EN_COURS' }
      });

      // 3. Créer l'historique
      await tx.historiqueConsultation.create({
        data: {
          patient_id: fileAttenteItem.patient_id,
          medecin_id: medecinIdNum,
          action: 'CONSULTATION',
          date: new Date()
        }
      });

      return consultation;
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur détaillée:', error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la consultation" },
      { status: 500 }
    );
  }
}



