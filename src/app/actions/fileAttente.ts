'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Récupérer toutes les files d'attente
export async function getAllFileAttente() {
  try {
    const fileAttente = await prisma.fileAttente.findMany({
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
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Formater la réponse
    const formattedFileAttente = fileAttente.map(item => ({
      id: item.id,
      patientId: item.patientId,
      medecinId: item.medecinId,
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
      patient: item.patient,
      medecin: {
        id: item.medecin.id,
        userId: item.medecin.userId,
        specialite: item.medecin.specialite,
        nom: item.medecin.user.nom,
        prenom: item.medecin.user.prenom
      }
    }));

    return { success: true, data: formattedFileAttente };
  } catch (error) {
    console.error("Erreur lors de la récupération de la file d'attente:", error);
    return { success: false, error: "Erreur lors de la récupération de la file d'attente" };
  }
}

// Récupérer la file d'attente d'un médecin
export async function getMedecinFileAttente(medecinId: number) {
  try {
    // Vérifier si le médecin existe
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinId }
    });

    if (!medecin) {
      return { success: false, error: "Médecin non trouvé" };
    }

    // Récupérer la file d'attente
    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
      },
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            numero_patient: true,
            photo: true,
            genre: true,
            date_naissance: true
          }
        }
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Récupérer le patient en cours de consultation
    const patientEnCours = await prisma.fileAttente.findFirst({
      where: {
        medecinId,
        statut: 'EN_COURS'
      },
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            numero_patient: true,
            photo: true,
            genre: true,
            date_naissance: true
          }
        }
      }
    });

    // Formater la réponse
    const formattedFileAttente = fileAttente.map(item => ({
      id: item.id,
      patientId: item.patientId,
      medecinId: item.medecinId,
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
      patient: {
        ...item.patient,
        date_naissance: item.patient.date_naissance.toISOString()
      }
    }));

    const formattedPatientEnCours = patientEnCours ? {
      id: patientEnCours.id,
      patientId: patientEnCours.patientId,
      medecinId: patientEnCours.medecinId,
      statut: patientEnCours.statut,
      ordre: patientEnCours.ordre,
      ajoute_le: patientEnCours.ajoute_le.toISOString(),
      patient: {
        ...patientEnCours.patient,
        date_naissance: patientEnCours.patient.date_naissance.toISOString()
      }
    } : null;

    return {
      success: true,
      data: {
        enAttente: formattedFileAttente,
        enCours: formattedPatientEnCours
      }
    };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la récupération de la file d'attente" };
  }
}

// Ajouter un patient à la file d'attente
export async function addToFileAttente(patientId: number, medecinId: number) {
  try {
    // Vérifier si le patient existe déjà dans la file d'attente
    const existingEntry = await prisma.fileAttente.findFirst({
      where: {
        patientId,
        medecinId,
        statut: 'EN_ATTENTE'
      }
    });

    if (existingEntry) {
      return { success: false, error: "Ce patient est déjà dans la file d'attente" };
    }

    // Trouver l'ordre maximum actuel
    const maxOrdre = await prisma.fileAttente.findFirst({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
      },
      orderBy: {
        ordre: 'desc'
      },
      select: {
        ordre: true
      }
    });

    const newOrdre = maxOrdre ? maxOrdre.ordre + 1 : 1;

    // Ajouter à la file d'attente dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer l'entrée dans la file d'attente
      const fileAttente = await tx.fileAttente.create({
        data: {
          patientId,
          medecinId,
          statut: 'EN_ATTENTE',
          ordre: newOrdre,
          ajoute_le: new Date()
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

      // 2. Créer l'historique
      await tx.historiqueConsultation.create({
        data: {
          patientId,
          medecinId,
          action: 'AJOUT_FILE',
          date: new Date()
        }
      });

      return fileAttente;
    });

    // Formater la réponse
    const formattedResult = {
      id: result.id,
      patientId: result.patientId,
      medecinId: result.medecinId,
      statut: result.statut,
      ordre: result.ordre,
      ajoute_le: result.ajoute_le.toISOString(),
      patient: result.patient,
      medecin: {
        id: result.medecin.id,
        userId: result.medecin.userId,
        specialite: result.medecin.specialite,
        nom: result.medecin.user.nom,
        prenom: result.medecin.user.prenom
      }
    };

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/medecin/${medecinId}/file-attente`);

    return { success: true, data: formattedResult };
  } catch (error) {
    console.error("Erreur lors de l'ajout à la file d'attente:", error);
    return { success: false, error: "Erreur lors de l'ajout à la file d'attente" };
  }
}

// Mettre à jour une entrée de file d'attente
export async function updateFileAttente(id: number, statut?: string, ordre?: number) {
  try {
    // Vérifier si l'entrée existe
    const existingFileAttente = await prisma.fileAttente.findUnique({
      where: { id }
    });

    if (!existingFileAttente) {
      return { success: false, error: "Entrée de file d'attente non trouvée" };
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    if (statut) updateData.statut = statut;
    if (ordre !== undefined) updateData.ordre = ordre;

    // Mettre à jour l'entrée
    const updatedFileAttente = await prisma.fileAttente.update({
      where: { id },
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

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/medecin/${updatedFileAttente.medecinId}/file-attente`);

    return { success: true, data: formattedFileAttente };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la mise à jour de l'entrée de file d'attente" };
  }
}

// Réorganiser la file d'attente d'un médecin
export async function reorganizeFileAttente(medecinId: number) {
  try {
    // Récupérer la file d'attente actuelle
    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Réorganiser les ordres
    const updates = fileAttente.map((item, index) => {
      return prisma.fileAttente.update({
        where: { id: item.id },
        data: { ordre: index + 1 }
      });
    });

    // Exécuter toutes les mises à jour
    await prisma.$transaction(updates);

    // Récupérer la file d'attente mise à jour
    const updatedFileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
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

    // Formater la réponse
    const formattedFileAttente = updatedFileAttente.map(item => ({
      id: item.id,
      patientId: item.patientId,
      medecinId: item.medecinId,
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
      patient: item.patient
    }));

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/medecin/${medecinId}/file-attente`);

    return { success: true, data: formattedFileAttente };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la réorganisation de la file d'attente" };
  }
}

// Supprimer une entrée de file d'attente
export async function deleteFileAttente(id: number) {
  try {
    // Vérifier si l'entrée existe
    const existingFileAttente = await prisma.fileAttente.findUnique({
      where: { id },
      select: {
        medecinId: true
      }
    });

    if (!existingFileAttente) {
      return { success: false, error: "Entrée de file d'attente non trouvée" };
    }

    // Supprimer l'entrée
    await prisma.fileAttente.delete({
      where: { id }
    });

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/medecin/${existingFileAttente.medecinId}/file-attente`);

    return { success: true, message: "Entrée de file d'attente supprimée avec succès" };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { success: false, error: 'Erreur lors de la suppression' };
  }
}