import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer une consultation par son ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = parseInt(params.id);
    
    if (isNaN(consultationId)) {
      return NextResponse.json(
        { error: "ID de consultation invalide" },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            numero_patient: true,
            photo: true,
            genre: true,
            date_naissance: true,
            antecedent: true,
            diagnostic: true
          }
        },
        medecin: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation non trouvée" },
        { status: 404 }
      );
    }

    // Formater la réponse
    const formattedConsultation = {
      id: consultation.id,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      date: consultation.date.toISOString(),
      diagnostic: consultation.diagnostic,
      traitement: consultation.traitement,
      notes: consultation.notes,
      type: consultation.type,
      cree_le: consultation.cree_le.toISOString(),
      patient: {
        ...consultation.patient,
        date_naissance: consultation.patient.date_naissance.toISOString()
      },
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedConsultation);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la consultation" },
      { status: 500 }
    );
  }
}

// Mettre à jour une consultation
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = parseInt(params.id);
    
    if (isNaN(consultationId)) {
      return NextResponse.json(
        { error: "ID de consultation invalide" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { diagnostic, traitement, notes, type } = body;

    // Vérifier si la consultation existe
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id: consultationId }
    });

    if (!existingConsultation) {
      return NextResponse.json(
        { error: "Consultation non trouvée" },
        { status: 404 }
      );
    }

    // Mettre à jour la consultation
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        diagnostic: diagnostic !== undefined ? diagnostic : existingConsultation.diagnostic,
        traitement: traitement !== undefined ? traitement : existingConsultation.traitement,
        notes: notes !== undefined ? notes : existingConsultation.notes,
        type: type || existingConsultation.type
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
        },
        medecin: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    // Formater la réponse
    const formattedConsultation = {
      id: updatedConsultation.id,
      patientId: updatedConsultation.patientId,
      medecinId: updatedConsultation.medecinId,
      date: updatedConsultation.date.toISOString(),
      diagnostic: updatedConsultation.diagnostic,
      traitement: updatedConsultation.traitement,
      notes: updatedConsultation.notes,
      type: updatedConsultation.type,
      cree_le: updatedConsultation.cree_le.toISOString(),
      patient: updatedConsultation.patient,
      medecin: {
        id: updatedConsultation.medecin.id,
        specialite: updatedConsultation.medecin.specialite,
        nom: updatedConsultation.medecin.user.nom,
        prenom: updatedConsultation.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedConsultation);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la consultation" },
      { status: 500 }
    );
  }
}
