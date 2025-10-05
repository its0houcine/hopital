import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer une entrée de file d'attente par son ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileAttenteId = parseInt(params.id);
    
    if (isNaN(fileAttenteId)) {
      return NextResponse.json(
        { error: "ID de file d'attente invalide" },
        { status: 400 }
      );
    }

    const fileAttente = await prisma.fileAttente.findUnique({
      where: { id: fileAttenteId },
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

    if (!fileAttente) {
      return NextResponse.json(
        { error: "Entrée de file d'attente non trouvée" },
        { status: 404 }
      );
    }

    // Formater la réponse
    const formattedFileAttente = {
      id: fileAttente.id,
      patientId: fileAttente.patientId,
      medecinId: fileAttente.medecinId,
      statut: fileAttente.statut,
      ordre: fileAttente.ordre,
      ajoute_le: fileAttente.ajoute_le.toISOString(),
      patient: fileAttente.patient,
      medecin: {
        id: fileAttente.medecin.id,
        userId: fileAttente.medecin.userId,
        specialite: fileAttente.medecin.specialite,
        nom: fileAttente.medecin.user.nom,
        prenom: fileAttente.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedFileAttente);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'entrée de file d'attente" },
      { status: 500 }
    );
  }
}

// Mettre à jour une entrée de file d'attente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileAttenteId = parseInt(params.id);
    
    if (isNaN(fileAttenteId)) {
      return NextResponse.json(
        { error: "ID de file d'attente invalide" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { statut, ordre } = body;

    // Vérifier si l'entrée existe
    const existingFileAttente = await prisma.fileAttente.findUnique({
      where: { id: fileAttenteId }
    });

    if (!existingFileAttente) {
      return NextResponse.json(
        { error: "Entrée de file d'attente non trouvée" },
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    if (statut) updateData.statut = statut;
    if (ordre !== undefined) updateData.ordre = ordre;

    // Mettre à jour l'entrée
    const updatedFileAttente = await prisma.fileAttente.update({
      where: { id: fileAttenteId },
      data: updateData,
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
    const formattedFileAttente = {
      id: updatedFileAttente.id,
      patientId: updatedFileAttente.patientId,
      medecinId: updatedFileAttente.medecinId,
      statut: updatedFileAttente.statut,
      ordre: updatedFileAttente.ordre,
      ajoute_le: updatedFileAttente.ajoute_le.toISOString(),
      patient: updatedFileAttente.patient,
      medecin: {
        id: updatedFileAttente.medecin.id,
        userId: updatedFileAttente.medecin.userId,
        specialite: updatedFileAttente.medecin.specialite,
        nom: updatedFileAttente.medecin.user.nom,
        prenom: updatedFileAttente.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedFileAttente);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'entrée de file d'attente" },
      { status: 500 }
    );
  }
}

// Supprimer une entrée de file d'attente
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileAttenteId = parseInt(params.id);
    
    if (isNaN(fileAttenteId)) {
      return NextResponse.json(
        { error: "ID de file d'attente invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'entrée existe
    const existingFileAttente = await prisma.fileAttente.findUnique({
      where: { id: fileAttenteId }
    });

    if (!existingFileAttente) {
      return NextResponse.json(
        { error: "Entrée de file d'attente non trouvée" },
        { status: 404 }
      );
    }

    // Supprimer l'entrée
    await prisma.fileAttente.delete({
      where: { id: fileAttenteId }
    });

    return NextResponse.json({ message: "Entrée de file d'attente supprimée avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'entrée de file d'attente" },
      { status: 500 }
    );
  }
}
