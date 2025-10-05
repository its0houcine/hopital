import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { diagnostic, traitement, notes, type, patientId, medecinId } = await request.json();
    const consultationId = parseInt(params.id);

    // Vérification des données requises
    if (!consultationId || !patientId || !medecinId) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Mettre à jour la consultation
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        diagnostic: diagnostic || null,
        traitement: traitement || null,
        notes: notes || null,
        type: type || 'STANDARD'
      },
      include: {
        patient: true,
        medecin: true
      }
    });

    // Supprimer de la file d'attente
    await prisma.fileAttente.deleteMany({
      where: {
        AND: [
          { patient_id: patientId },
          { medecin_id: medecinId },
          { statut: 'EN_COURS' }
        ]
      }
    });

    return NextResponse.json({ 
      success: true, 
      consultation: updatedConsultation 
    });
  } catch (error) {
    console.error('Erreur lors de la finalisation de la consultation:', error);
    return NextResponse.json(
      { error: "Erreur lors de la finalisation de la consultation" },
      { status: 500 }
    );
  }
}



