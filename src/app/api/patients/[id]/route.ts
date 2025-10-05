import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { Prisma } from '@prisma/client';

// Fonction utilitaire pour traiter les photos - optimisée avec imports statiques
async function processPhoto(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `/uploads/${fileName}`;

  // Utiliser les imports statiques au lieu de require dynamiques
  await mkdir('public/uploads', { recursive: true });
  await writeFile(join(process.cwd(), 'public', 'uploads', fileName), buffer);

  return filePath;
}

const DEFAULT_AVATAR = '/images/default-avatar.png';

// Récupérer un patient par son ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    const patientId = parseInt(resolvedParams.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "ID du patient invalide" },
        { status: 400 }
      );
    }

    // Vérifier si c'est un préchargement
    const { searchParams } = new URL(request.url);
    const isPreload = searchParams.get('preload') === 'true';

    // Définir les sélections communes pour optimiser la requête
    const medecinSelect = {
      include: {
        user: {
          select: {
            nom: true,
            prenom: true
          }
        }
      }
    };

    // Déterminer les données à inclure en fonction du mode
    const includeOptions = isPreload
      ? {
          medecin: medecinSelect
        }
      : {
          medecin: medecinSelect,
          consultations: {
            orderBy: { date: 'desc' as const },
            take: 5,
            include: {
              medecin: medecinSelect
            }
          },
          historique: {
            orderBy: { date: 'desc' as const },
            take: 10
          }
        };

    // Exécuter la requête avec les options appropriées
    const patientQuery = prisma.patient.findUnique({
      where: { id: patientId },
      include: includeOptions
    });

    const patient = await patientQuery;

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    // Définir les en-têtes de cache en fonction du mode
    const cacheHeaders = isPreload
      ? { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' } // 5 minutes + 10 minutes stale
      : { 'Cache-Control': 'private, max-age=60, stale-while-revalidate=300' }; // 1 minute + 5 minutes stale

    // Si pas de photo, utiliser l'avatar par défaut
    if (!patient.photo) {
      patient.photo = DEFAULT_AVATAR;
    }

    // Fonction utilitaire pour formater les dates
    const formatDate = (date: Date | null) => date ? date.toISOString() : null;

    // Fonction utilitaire pour formater les médecins
    const formatMedecin = (medecin: any) => medecin ? {
      id: medecin.id,
      specialite: medecin.specialite,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom
    } : null;

    // Formater la réponse
    const formattedPatient = {
      ...patient,
      date_naissance: formatDate(patient.date_naissance),
      consultation: formatDate(patient.consultation),
      consultation_specialisee: formatDate(patient.consultation_specialisee),
      ct_sim: formatDate(patient.ct_sim),
      debut_traitement: formatDate(patient.debut_traitement),
      fin_traitement: formatDate(patient.fin_traitement),
      rdv_traitement: formatDate(patient.rdv_traitement),
      medecin: formatMedecin(patient.medecin),
      consultations: isPreload ? [] : (patient as any).consultations?.map((c: any) => ({
        ...c,
        date: formatDate(c.date),
        cree_le: formatDate(c.cree_le),
        medecin: formatMedecin(c.medecin)
      })) || [],
      historique: isPreload ? [] : (patient as any).historique?.map((h: any) => ({
        ...h,
        date: formatDate(h.date)
      })) || []
    };

    return NextResponse.json(formattedPatient, {
      headers: {
        ...cacheHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du patient" },
      { status: 500 }
    );
  }
}

// Mettre à jour un patient
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = parseInt(params.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "ID du patient invalide" },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    // Vérifier si le patient existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!existingPatient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {};

    // Champs de type String
    const stringFields = ['nom', 'prenom', 'numero_patient', 'telephone', 'adresse', 'antecedent', 'diagnostic', 'technique_irradiation'];
    for (const field of stringFields) {
      if (formData.has(field)) {
        const value = formData.get(field);
        updateData[field] = value === '' ? null : value;
      }
    }

    // Champs de type Date
    const dateFields = ['date_naissance', 'consultation', 'consultation_specialisee', 'ct_sim', 'debut_traitement', 'fin_traitement', 'rdv_traitement'];
    for (const field of dateFields) {
      if (formData.has(field)) {
        const value = formData.get(field);
        updateData[field] = value ? new Date(value as string) : null;
      }
    }

    // Champs de type Float
    const floatFields = ['dose_totale', 'dose_fraction'];
    for (const field of floatFields) {
      if (formData.has(field)) {
        const value = formData.get(field);
        updateData[field] = value ? parseFloat(value as string) : null;
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
      const medecinId = formData.get('medecinId');
      updateData.medecinId = medecinId ? parseInt(medecinId as string) : null;
    }

    // Photo
    if (formData.has('photo') && formData.get('photo')) {
      const photo = formData.get('photo');
      if (photo instanceof File) {
        updateData.photo = await processPhoto(photo);
      }
    }

    try {
      // Mettre à jour le patient
      const updatedPatient = await prisma.patient.update({
        where: { id: patientId },
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

      return NextResponse.json(formattedPatient);
    } catch (error) {
      console.error("Erreur Prisma:", error);
      if (error instanceof Error) {
        return NextResponse.json(
          { error: `Erreur lors de la mise à jour du patient: ${error.message}` },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Erreur inconnue lors de la mise à jour du patient" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}

// Supprimer un patient
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = parseInt(params.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "ID du patient invalide" },
        { status: 400 }
      );
    }

    // Vérifier si le patient existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!existingPatient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer le patient et toutes ses relations dans une transaction
    await prisma.$transaction(async (tx) => {
      // 1. Supprimer les entrées dans la file d'attente
      await tx.fileAttente.deleteMany({
        where: { patientId }
      });

      // 2. Supprimer les messages
      await tx.message.deleteMany({
        where: { patientId }
      });

      // 3. Supprimer l'historique des consultations
      await tx.historiqueConsultation.deleteMany({
        where: { patientId }
      });

      // 4. Supprimer les consultations
      await tx.consultation.deleteMany({
        where: { patientId }
      });

      // 5. Supprimer le patient
      await tx.patient.delete({
        where: { id: patientId }
      });
    });

    return NextResponse.json({ message: "Patient supprimé avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du patient" },
      { status: 500 }
    );
  }
}
