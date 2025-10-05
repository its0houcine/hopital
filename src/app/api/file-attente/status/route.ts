import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mettre à jour le statut d'un patient dans la file d'attente
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { patientId, status } = body;

    if (!patientId || !status) {
      return NextResponse.json(
        { error: "patientId et status sont requis" },
        { status: 400 }
      );
    }

    // Vérifier que le statut est valide
    // Si le statut est 'TERMINE', on le traite différemment
    let statusToUse = status;

    if (status === 'TERMINE') {
      // Pour 'TERMINE', on supprime l'entrée de la file d'attente
      statusToUse = 'EN_COURS'; // Temporairement pour trouver l'entrée
    } else if (status !== 'EN_ATTENTE' && status !== 'EN_COURS') {
      return NextResponse.json(
        { error: "Le statut doit être 'EN_ATTENTE', 'EN_COURS' ou 'TERMINE'" },
        { status: 400 }
      );
    }

    // Trouver l'entrée dans la file d'attente
    const fileAttenteItem = await prisma.fileAttente.findFirst({
      where: {
        patientId: Number(patientId),
        OR: [
          { statut: 'EN_ATTENTE' },
          { statut: 'EN_COURS' }
        ]
      }
    });

    if (!fileAttenteItem) {
      return NextResponse.json(
        { error: "Patient non trouvé dans la file d'attente" },
        { status: 404 }
      );
    }

    // Si le statut est 'TERMINE', supprimer l'entrée de la file d'attente
    let updatedItem;

    if (status === 'TERMINE') {
      // Sauvegarder les données avant de supprimer
      const itemToDelete = await prisma.fileAttente.findUnique({
        where: { id: fileAttenteItem.id },
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

      // Supprimer l'entrée
      await prisma.fileAttente.delete({
        where: { id: fileAttenteItem.id }
      });

      updatedItem = itemToDelete;
    } else {
      // Mettre à jour le statut
      updatedItem = await prisma.fileAttente.update({
        where: {
          id: fileAttenteItem.id
        },
        data: {
          statut: statusToUse
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
    }

    // Créer une entrée dans l'historique avec les valeurs correctes de l'enum ActionHistorique
    let action;
    if (status === 'EN_COURS') {
      action = 'CONSULTATION'; // Valeur valide selon l'enum ActionHistorique
    } else if (status === 'TERMINE') {
      action = 'FIN_TRAITEMENT'; // Valeur valide selon l'enum ActionHistorique
    } else {
      action = 'AUTRE'; // Valeur valide selon l'enum ActionHistorique
    }

    await prisma.historiqueConsultation.create({
      data: {
        patientId: Number(patientId),
        medecinId: updatedItem.medecinId,
        action,
        date: new Date()
      }
    });

    // Formater la réponse
    const formattedResponse = {
      id: updatedItem.id,
      patientId: updatedItem.patientId,
      medecinId: updatedItem.medecinId,
      statut: updatedItem.statut,
      ordre: updatedItem.ordre,
      ajoute_le: updatedItem.ajoute_le.toISOString(),
      patient: updatedItem.patient,
      medecin: {
        id: updatedItem.medecin.id,
        userId: updatedItem.medecin.userId,
        specialite: updatedItem.medecin.specialite,
        nom: updatedItem.medecin.user.nom,
        prenom: updatedItem.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
