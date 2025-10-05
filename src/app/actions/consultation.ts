'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Récupérer toutes les consultations avec pagination
export async function getConsultations(page = 1, limit = 10, medecinId?: number, patientId?: number, date?: string) {
  try {
    const skip = (page - 1) * limit;
    
    // Construire la requête
    const whereClause: any = {};
    if (medecinId) {
      whereClause.medecinId = parseInt(medecinId.toString());
    }
    if (patientId) {
      whereClause.patientId = parseInt(patientId.toString());
    }
    if (date) {
      const dateObj = new Date(date);
      dateObj.setHours(0, 0, 0, 0);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      
      whereClause.date = {
        gte: dateObj,
        lt: nextDay
      };
    }

    // Récupérer les consultations avec pagination
    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where: whereClause,
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
          date: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.consultation.count({
        where: whereClause
      })
    ]);

    // Formater les données
    const formattedConsultations = consultations.map(consultation => ({
      id: consultation.id,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      date: consultation.date.toISOString(),
      diagnostic: consultation.diagnostic,
      traitement: consultation.traitement,
      notes: consultation.notes,
      type: consultation.type,
      cree_le: consultation.cree_le.toISOString(),
      patient: consultation.patient,
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom
      }
    }));

    return { 
      success: true, 
      data: {
        consultations: formattedConsultations,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des consultations:", error);
    return { success: false, error: "Erreur lors de la récupération des consultations" };
  }
}

// Récupérer une consultation par son ID
export async function getConsultationById(id: number) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id },
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
      return { success: false, error: "Consultation non trouvée" };
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

    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la récupération de la consultation" };
  }
}

// Récupérer la consultation en cours
export async function getCurrentConsultation(medecinId?: number) {
  try {
    // Construire la requête
    const whereClause: any = {
      statut: 'EN_COURS'
    };
    
    if (medecinId) {
      whereClause.medecinId = parseInt(medecinId.toString());
    }

    // 1. Trouver le patient EN_COURS dans la file d'attente
    const patientEnCours = await prisma.fileAttente.findFirst({
      where: whereClause,
      include: {
        patient: true,
        medecin: {
          include: {
            user: true
          }
        }
      }
    });

    if (!patientEnCours) {
      return { success: true, data: null };
    }

    // 2. Chercher la consultation du jour pour ce patient
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentConsultation = await prisma.consultation.findFirst({
      where: {
        patientId: patientEnCours.patientId,
        medecinId: patientEnCours.medecinId,
        date: {
          gte: today
        }
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
      },
      orderBy: {
        date: 'desc'
      }
    });

    if (!currentConsultation) {
      return { success: true, data: null };
    }

    // Formater la réponse
    const formattedConsultation = {
      id: currentConsultation.id,
      patientId: currentConsultation.patientId,
      medecinId: currentConsultation.medecinId,
      date: currentConsultation.date.toISOString(),
      diagnostic: currentConsultation.diagnostic,
      traitement: currentConsultation.traitement,
      notes: currentConsultation.notes,
      type: currentConsultation.type,
      cree_le: currentConsultation.cree_le.toISOString(),
      patient: {
        ...currentConsultation.patient,
        date_naissance: currentConsultation.patient.date_naissance.toISOString()
      },
      medecin: {
        id: currentConsultation.medecin.id,
        specialite: currentConsultation.medecin.specialite,
        nom: currentConsultation.medecin.user.nom,
        prenom: currentConsultation.medecin.user.prenom
      },
      fileAttenteId: patientEnCours.id
    };

    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la récupération de la consultation en cours" };
  }
}

// Créer une nouvelle consultation
export async function createConsultation(patientId: number, medecinId: number, type?: string, diagnostic?: string, traitement?: string, notes?: string) {
  try {
    // Créer la consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        medecinId,
        date: new Date(),
        type: type || 'STANDARD',
        diagnostic: diagnostic || null,
        traitement: traitement || null,
        notes: notes || null
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
      id: consultation.id,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      date: consultation.date.toISOString(),
      diagnostic: consultation.diagnostic,
      traitement: consultation.traitement,
      notes: consultation.notes,
      type: consultation.type,
      cree_le: consultation.cree_le.toISOString(),
      patient: consultation.patient,
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom
      }
    };

    // Revalider les chemins pour mettre à jour les données
    revalidatePath(`/medecin/${medecinId}/consultations`);
    revalidatePath(`/patients/${patientId}`);
    
    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur lors de la création de la consultation:", error);
    return { success: false, error: "Erreur lors de la création de la consultation" };
  }
}

// Mettre à jour une consultation
export async function updateConsultation(id: number, diagnostic?: string, traitement?: string, notes?: string, type?: string) {
  try {
    // Vérifier si la consultation existe
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id },
      select: {
        patientId: true,
        medecinId: true
      }
    });

    if (!existingConsultation) {
      return { success: false, error: "Consultation non trouvée" };
    }

    // Mettre à jour la consultation
    const updatedConsultation = await prisma.consultation.update({
      where: { id },
      data: {
        diagnostic: diagnostic !== undefined ? diagnostic : null,
        traitement: traitement !== undefined ? traitement : null,
        notes: notes !== undefined ? notes : null,
        type: type || 'STANDARD'
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

    // Revalider les chemins pour mettre à jour les données
    revalidatePath(`/medecin/${existingConsultation.medecinId}/consultations`);
    revalidatePath(`/patients/${existingConsultation.patientId}`);
    revalidatePath(`/consultations/${id}`);
    
    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la mise à jour de la consultation" };
  }
}

// Terminer une consultation
export async function endConsultation(id: number, patientId: number, medecinId: number, diagnostic?: string, traitement?: string, notes?: string, type?: string) {
  try {
    // Utiliser une transaction pour garantir l'atomicité
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mettre à jour la consultation
      const updatedConsultation = await tx.consultation.update({
        where: { id },
        data: {
          diagnostic: diagnostic || null,
          traitement: traitement || null,
          notes: notes || null,
          type: type || 'STANDARD'
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

      // 2. Mettre à jour le statut dans la file d'attente
      const fileAttente = await tx.fileAttente.findFirst({
        where: {
          patientId,
          medecinId,
          statut: 'EN_COURS'
        }
      });

      if (fileAttente) {
        await tx.fileAttente.delete({
          where: { id: fileAttente.id }
        });
      }

      // 3. Créer l'historique
      await tx.historiqueConsultation.create({
        data: {
          patientId,
          medecinId,
          action: 'FIN_TRAITEMENT',
          date: new Date()
        }
      });

      return updatedConsultation;
    });

    // Formater la réponse
    const formattedConsultation = {
      id: result.id,
      patientId: result.patientId,
      medecinId: result.medecinId,
      date: result.date.toISOString(),
      diagnostic: result.diagnostic,
      traitement: result.traitement,
      notes: result.notes,
      type: result.type,
      cree_le: result.cree_le.toISOString(),
      patient: result.patient,
      medecin: {
        id: result.medecin.id,
        specialite: result.medecin.specialite,
        nom: result.medecin.user.nom,
        prenom: result.medecin.user.prenom
      }
    };

    // Revalider les chemins pour mettre à jour les données
    revalidatePath(`/medecin/${medecinId}/consultations`);
    revalidatePath(`/medecin/${medecinId}/file-attente`);
    revalidatePath(`/patients/${patientId}`);
    revalidatePath(`/consultations/${id}`);
    
    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la fin de la consultation" };
  }
}

// Démarrer une consultation
export async function startConsultation(fileAttenteId: number, medecinId: number) {
  try {
    // Vérifier si la file d'attente existe
    const fileAttenteItem = await prisma.fileAttente.findUnique({
      where: { id: fileAttenteId },
      include: { 
        patient: true
      }
    });

    if (!fileAttenteItem) {
      return { success: false, error: "Patient non trouvé dans la file d'attente" };
    }

    // Vérifier s'il y a une consultation active
    const activeConsultation = await prisma.consultation.findFirst({
      where: {
        patientId: fileAttenteItem.patientId,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)) // Aujourd'hui
        }
      }
    });

    if (activeConsultation) {
      return { success: false, error: "Une consultation est déjà en cours pour ce patient" };
    }

    // Utiliser une transaction pour garantir l'atomicité
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer la consultation
      const consultation = await tx.consultation.create({
        data: {
          patientId: fileAttenteItem.patientId,
          medecinId,
          date: new Date(),
          type: 'STANDARD'
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

      // 2. Mettre à jour le statut dans la file d'attente
      await tx.fileAttente.update({
        where: { id: fileAttenteId },
        data: { statut: 'EN_COURS' }
      });

      // 3. Créer l'historique
      await tx.historiqueConsultation.create({
        data: {
          patientId: fileAttenteItem.patientId,
          medecinId,
          action: 'CONSULTATION',
          date: new Date()
        }
      });

      return consultation;
    });

    // Formater la réponse
    const formattedConsultation = {
      id: result.id,
      patientId: result.patientId,
      medecinId: result.medecinId,
      date: result.date.toISOString(),
      diagnostic: result.diagnostic,
      traitement: result.traitement,
      notes: result.notes,
      type: result.type,
      cree_le: result.cree_le.toISOString(),
      patient: {
        ...result.patient,
        date_naissance: result.patient.date_naissance.toISOString()
      },
      medecin: {
        id: result.medecin.id,
        specialite: result.medecin.specialite,
        nom: result.medecin.user.nom,
        prenom: result.medecin.user.prenom
      },
      fileAttenteId
    };

    // Revalider les chemins pour mettre à jour les données
    revalidatePath(`/medecin/${medecinId}/consultations`);
    revalidatePath(`/medecin/${medecinId}/file-attente`);
    revalidatePath(`/patients/${result.patientId}`);
    
    return { success: true, data: formattedConsultation };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors du démarrage de la consultation" };
  }
}
