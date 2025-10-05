'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fonction utilitaire pour traiter les photos
async function processPhoto(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `/uploads/${fileName}`;
  
  const { writeFile, mkdir } = require('fs/promises');
  const { join } = require('path');
  
  await mkdir('public/uploads', { recursive: true });
  await writeFile(join(process.cwd(), 'public', 'uploads', fileName), buffer);
  
  return filePath;
}

const DEFAULT_AVATAR = '/images/default-avatar.png';

// Récupérer tous les patients avec pagination
export async function getPatients(page = 1, limit = 10, medecinId?: number) {
  try {
    const skip = (page - 1) * limit;
    
    // Construire la requête
    const whereClause: any = {};
    if (medecinId) {
      whereClause.medecinId = medecinId;
    }

    // Récupérer les patients avec pagination
    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where: whereClause,
        include: {
          medecin: {
            include: {
              user: {
                select: {
                  nom: true,
                  prenom: true
                }
              }
            }
          }
        },
        orderBy: {
          id: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.patient.count({
        where: whereClause
      })
    ]);

    // Formater les données
    const formattedPatients = patients.map(patient => ({
      ...patient,
      date_naissance: patient.date_naissance.toISOString(),
      consultation: patient.consultation?.toISOString() || null,
      consultation_specialisee: patient.consultation_specialisee?.toISOString() || null,
      ct_sim: patient.ct_sim?.toISOString() || null,
      debut_traitement: patient.debut_traitement?.toISOString() || null,
      fin_traitement: patient.fin_traitement?.toISOString() || null,
      rdv_traitement: patient.rdv_traitement?.toISOString() || null,
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null
    }));

    return { 
      success: true, 
      data: {
        patients: formattedPatients,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    return { success: false, error: "Erreur lors de la récupération des patients" };
  }
}

// Récupérer un patient par son ID
export async function getPatientById(id: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        medecin: {
          include: {
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        },
        consultations: {
          orderBy: {
            date: 'desc'
          },
          take: 5
        },
        historique: {
          orderBy: {
            date: 'desc'
          },
          take: 10
        }
      }
    });

    if (!patient) {
      return { success: false, error: "Patient non trouvé" };
    }

    // Si pas de photo, utiliser l'avatar par défaut
    if (!patient.photo) {
      patient.photo = DEFAULT_AVATAR;
    }

    // Formater la réponse
    const formattedPatient = {
      ...patient,
      date_naissance: patient.date_naissance.toISOString(),
      consultation: patient.consultation?.toISOString() || null,
      consultation_specialisee: patient.consultation_specialisee?.toISOString() || null,
      ct_sim: patient.ct_sim?.toISOString() || null,
      debut_traitement: patient.debut_traitement?.toISOString() || null,
      fin_traitement: patient.fin_traitement?.toISOString() || null,
      rdv_traitement: patient.rdv_traitement?.toISOString() || null,
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null,
      consultations: patient.consultations.map(c => ({
        ...c,
        date: c.date.toISOString(),
        cree_le: c.cree_le.toISOString()
      })),
      historique: patient.historique.map(h => ({
        ...h,
        date: h.date.toISOString()
      }))
    };

    return { success: true, data: formattedPatient };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la récupération du patient" };
  }
}

// Rechercher des patients
export async function searchPatients(term: string) {
  try {
    if (!term) {
      return { success: true, data: [] };
    }

    // Optimisation de la recherche
    const searchTerms = term.toLowerCase().split(' ').filter(t => t.length > 0);
    
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { nom: { contains: term, mode: 'insensitive' } },
          { prenom: { contains: term, mode: 'insensitive' } },
          { numero_patient: { contains: term, mode: 'insensitive' } },
          { telephone: { contains: term, mode: 'insensitive' } },
          // Recherches combinées
          {
            AND: [
              { nom: { contains: searchTerms[0], mode: 'insensitive' } },
              { prenom: { contains: searchTerms[1] || '', mode: 'insensitive' } }
            ]
          },
          {
            AND: [
              { prenom: { contains: searchTerms[0], mode: 'insensitive' } },
              { nom: { contains: searchTerms[1] || '', mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        numero_patient: true,
        nom: true,
        prenom: true,
        telephone: true,
        genre: true,
        date_naissance: true,
        photo: true,
        medecinId: true,
        medecin: {
          select: {
            id: true,
            specialite: true,
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      },
      take: 10,
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }]
    });

    const formattedPatients = patients.map(patient => ({
      ...patient,
      date_naissance: patient.date_naissance.toISOString(),
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null
    }));

    return { success: true, data: formattedPatients };
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return { success: false, error: 'Erreur lors de la recherche de patients' };
  }
}

// Créer un nouveau patient
export async function createPatient(formData: FormData) {
  try {
    // Valider les champs requis
    const requiredFields = ['nom', 'prenom', 'date_naissance', 'numero_patient', 'genre'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return { success: false, error: `Le champ ${field} est requis` };
      }
    }

    // Préparer les données
    const patientData: any = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      numero_patient: formData.get('numero_patient'),
      date_naissance: new Date(formData.get('date_naissance') as string),
      genre: formData.get('genre'),
      telephone: formData.get('telephone') || null,
      adresse: formData.get('adresse') || null,
      medecinId: formData.get('medecinId') ? parseInt(formData.get('medecinId') as string) : null,
      antecedent: formData.get('antecedent') || null,
      diagnostic: formData.get('diagnostic') || null
    };

    // Traiter la photo si présente
    if (formData.get('photo')) {
      patientData.photo = await processPhoto(formData.get('photo') as File);
    }

    // Créer le patient
    const patient = await prisma.patient.create({
      data: patientData,
      include: {
        medecin: {
          include: {
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    // Formater la réponse
    const formattedPatient = {
      ...patient,
      date_naissance: patient.date_naissance.toISOString(),
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null
    };

    // Revalider le chemin pour mettre à jour les données
    revalidatePath('/patients');
    
    return { success: true, data: formattedPatient };
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    return { success: false, error: "Erreur lors de la création du patient" };
  }
}

// Mettre à jour un patient
export async function updatePatient(id: number, formData: FormData) {
  try {
    // Vérifier si le patient existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id }
    });

    if (!existingPatient) {
      return { success: false, error: "Patient non trouvé" };
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    
    // Champs de type String
    const stringFields = ['nom', 'prenom', 'numero_patient', 'telephone', 'adresse', 'antecedent', 'diagnostic', 'technique_irradiation'];
    for (const field of stringFields) {
      if (formData.has(field)) {
        updateData[field] = formData.get(field) || null;
      }
    }
    
    // Champs de type Date
    const dateFields = ['date_naissance', 'consultation', 'consultation_specialisee', 'ct_sim', 'debut_traitement', 'fin_traitement', 'rdv_traitement'];
    for (const field of dateFields) {
      if (formData.has(field) && formData.get(field)) {
        updateData[field] = new Date(formData.get(field) as string);
      }
    }
    
    // Champs de type Float
    const floatFields = ['dose_totale', 'dose_fraction'];
    for (const field of floatFields) {
      if (formData.has(field) && formData.get(field)) {
        updateData[field] = parseFloat(formData.get(field) as string);
      }
    }
    
    // Genre
    if (formData.has('genre')) {
      const genre = formData.get('genre');
      if (['Homme', 'Femme', 'Autre'].includes(genre as string)) {
        updateData.genre = genre;
      }
    }
    
    // MedecinId
    if (formData.has('medecinId')) {
      updateData.medecinId = formData.get('medecinId') ? parseInt(formData.get('medecinId') as string) : null;
    }
    
    // Photo
    if (formData.has('photo') && formData.get('photo')) {
      updateData.photo = await processPhoto(formData.get('photo') as File);
    }

    // Mettre à jour le patient
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: updateData,
      include: {
        medecin: {
          include: {
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    // Formater la réponse
    const formattedPatient = {
      ...updatedPatient,
      date_naissance: updatedPatient.date_naissance.toISOString(),
      consultation: updatedPatient.consultation?.toISOString() || null,
      consultation_specialisee: updatedPatient.consultation_specialisee?.toISOString() || null,
      ct_sim: updatedPatient.ct_sim?.toISOString() || null,
      debut_traitement: updatedPatient.debut_traitement?.toISOString() || null,
      fin_traitement: updatedPatient.fin_traitement?.toISOString() || null,
      rdv_traitement: updatedPatient.rdv_traitement?.toISOString() || null,
      medecin: updatedPatient.medecin ? {
        id: updatedPatient.medecin.id,
        specialite: updatedPatient.medecin.specialite,
        nom: updatedPatient.medecin.user.nom,
        prenom: updatedPatient.medecin.user.prenom
      } : null
    };

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/patients/${id}`);
    revalidatePath('/patients');
    
    return { success: true, data: formattedPatient };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la mise à jour du patient" };
  }
}

// Supprimer un patient
export async function deletePatient(id: number) {
  try {
    // Vérifier si le patient existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id }
    });

    if (!existingPatient) {
      return { success: false, error: "Patient non trouvé" };
    }

    // Supprimer le patient et toutes ses relations dans une transaction
    await prisma.$transaction(async (tx) => {
      // 1. Supprimer les entrées dans la file d'attente
      await tx.fileAttente.deleteMany({
        where: { patientId: id }
      });
      
      // 2. Supprimer les messages
      await tx.message.deleteMany({
        where: { patientId: id }
      });
      
      // 3. Supprimer l'historique des consultations
      await tx.historiqueConsultation.deleteMany({
        where: { patientId: id }
      });
      
      // 4. Supprimer les consultations
      await tx.consultation.deleteMany({
        where: { patientId: id }
      });
      
      // 5. Supprimer le patient
      await tx.patient.delete({
        where: { id }
      });
    });

    // Revalider le chemin pour mettre à jour les données
    revalidatePath('/patients');
    
    return { success: true, message: "Patient supprimé avec succès" };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la suppression du patient" };
  }
}
