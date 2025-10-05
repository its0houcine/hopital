import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

// Fonction utilitaire pour traiter les photos
async function processPhoto(file: File) {
  try {
    console.log(`Traitement de la photo: ${file.name}, taille: ${file.size} bytes`);

    // Vérifier que le fichier est valide
    if (!file.size) {
      throw new Error("Le fichier est vide");
    }

    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error(`Type de fichier non supporté: ${file.type}. Types acceptés: ${validTypes.join(', ')}`);
    }

    // Limiter la taille du fichier (5 Mo)
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    if (file.size > maxSize) {
      throw new Error(`Fichier trop volumineux: ${(file.size / 1024 / 1024).toFixed(2)} Mo. Maximum: 5 Mo`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${randomString}-${safeFileName}`;
    const filePath = `/uploads/${fileName}`;

    const { writeFile, mkdir } = require('fs/promises');
    const { join } = require('path');

    // Créer le dossier s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Écrire le fichier
    await writeFile(join(uploadDir, fileName), buffer);

    console.log(`Photo enregistrée avec succès: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Erreur lors du traitement de la photo:", error);
    throw new Error(`Erreur lors du traitement de la photo: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Récupérer un médecin par son ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    // Convertir l'ID en nombre
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de médecin invalide" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Vérifier si c'est un préchargement
    const { searchParams } = new URL(request.url);
    const isPreload = searchParams.get('preload') === 'true';

    // Déterminer les données à inclure en fonction du mode
    let medecinQuery;

    if (isPreload) {
      // Version légère pour le préchargement (moins de données)
      medecinQuery = prisma.medecin.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              photo: true,
              cree_le: true,
              role: true
            }
          }
          // Ne pas inclure la file d'attente pour le préchargement
        }
      });
    } else {
      // Version complète pour l'affichage normal
      medecinQuery = prisma.medecin.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              photo: true,
              cree_le: true,
              role: true
            }
          },
          // Inclure les patients associés à ce médecin via la file d'attente
          fileAttente: {
            where: { statut: 'EN_ATTENTE' },
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
            }
          }
        }
      });
    }

    const medecin = await medecinQuery;

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Définir les en-têtes de cache en fonction du mode
    const cacheHeaders = isPreload
      ? {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',  // 5 minutes + 10 minutes stale
          'Content-Type': 'application/json'
        }
      : {
          'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',  // 1 minute + 5 minutes stale
          'Content-Type': 'application/json'
        };

    // Récupérer les patients distincts de ce médecin
    const patientsInQueue = medecin.fileAttente.map(item => item.patient);

    // Éliminer les doublons en utilisant un Set sur les IDs
    const uniquePatientIds = new Set();
    const uniquePatients = patientsInQueue.filter(patient => {
      const isDuplicate = uniquePatientIds.has(patient.id);
      uniquePatientIds.add(patient.id);
      return !isDuplicate;
    });

    // Formater la réponse
    const formattedMedecin = {
      id: medecin.id,
      userId: medecin.userId,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      email: medecin.user.email,
      telephone: medecin.telephone,
      specialite: medecin.specialite,
      photo: medecin.user.photo,
      cree_le: medecin.user.cree_le.toISOString(),
      role: medecin.user.role,
      patients: uniquePatients
    };

    return NextResponse.json(formattedMedecin, {
      headers: cacheHeaders
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du médecin:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du médecin" },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}

// Mettre à jour un médecin
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    // Convertir l'ID en nombre
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de médecin invalide" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    const formData = await request.formData();

    // Vérifier si le médecin existe
    const existingMedecin = await prisma.medecin.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!existingMedecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Mettre à jour les données du médecin et de l'utilisateur
    const result = await prisma.$transaction(async (tx) => {
      // Mettre à jour l'utilisateur
      const userUpdateData: any = {};

      if (formData.get('nom')) userUpdateData.nom = formData.get('nom') as string;
      if (formData.get('prenom')) userUpdateData.prenom = formData.get('prenom') as string;
      if (formData.get('email')) {
        const newEmail = formData.get('email') as string;
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        if (newEmail !== existingMedecin.user.email) {
          const existingUser = await tx.user.findUnique({
            where: { email: newEmail }
          });

          if (existingUser) {
            throw new Error("Cet email est déjà utilisé");
          }
        }
        userUpdateData.email = newEmail;
      }

      // Mettre à jour le mot de passe si fourni
      if (formData.get('mot_de_passe')) {
        const newPassword = formData.get('mot_de_passe') as string;
        if (newPassword.length < 6) {
          throw new Error("Le mot de passe doit contenir au moins 6 caractères");
        }
        userUpdateData.mot_de_passe = await hash(newPassword, 10);
      }

      // Traiter la photo si fournie
      if (formData.get('photo') && (formData.get('photo') as File).size > 0) {
        try {
          userUpdateData.photo = await processPhoto(formData.get('photo') as File);
        } catch (photoError) {
          throw new Error(photoError instanceof Error ? photoError.message : "Erreur lors du traitement de la photo");
        }
      }

      // Mettre à jour l'utilisateur si nécessaire
      let updatedUser = existingMedecin.user;
      if (Object.keys(userUpdateData).length > 0) {
        updatedUser = await tx.user.update({
          where: { id: existingMedecin.userId },
          data: userUpdateData
        });
      }

      // Mettre à jour le médecin
      const medecinUpdateData: any = {};

      if (formData.get('telephone')) medecinUpdateData.telephone = formData.get('telephone') as string;
      if (formData.get('specialite')) medecinUpdateData.specialite = formData.get('specialite') as string;

      // Mettre à jour le médecin si nécessaire
      let updatedMedecin = existingMedecin;
      if (Object.keys(medecinUpdateData).length > 0) {
        updatedMedecin = await tx.medecin.update({
          where: { id },
          data: medecinUpdateData
        });
      }

      // Récupérer le médecin mis à jour
      return {
        id: updatedMedecin.id,
        userId: updatedUser.id,
        nom: updatedUser.nom,
        prenom: updatedUser.prenom,
        email: updatedUser.email,
        telephone: updatedMedecin.telephone,
        specialite: updatedMedecin.specialite,
        photo: updatedUser.photo,
        cree_le: updatedUser.cree_le.toISOString(),
        role: updatedUser.role
      };
    });

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du médecin:", error);

    // Déterminer le message d'erreur à renvoyer
    let errorMessage = "Erreur lors de la mise à jour du médecin";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      if (error.message === "Cet email est déjà utilisé" ||
          error.message === "Le mot de passe doit contenir au moins 6 caractères" ||
          error.message.includes("Erreur lors du traitement de la photo")) {
        statusCode = 400;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}

// Supprimer un médecin
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    // Convertir l'ID en nombre
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de médecin invalide" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Vérifier si le médecin existe
    const existingMedecin = await prisma.medecin.findUnique({
      where: { id }
    });

    if (!existingMedecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Vérifier si le médecin a des patients dans la file d'attente
    const fileAttente = await prisma.fileAttente.findFirst({
      where: { medecinId: id }
    });

    if (fileAttente) {
      return NextResponse.json(
        { error: "Impossible de supprimer ce médecin car il a des patients dans la file d'attente" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Supprimer le médecin et l'utilisateur associé dans une transaction
    await prisma.$transaction(async (tx) => {
      // Supprimer d'abord le médecin
      await tx.medecin.delete({
        where: { id }
      });

      // Puis supprimer l'utilisateur associé
      await tx.user.delete({
        where: { id: existingMedecin.userId }
      });
    });

    return NextResponse.json(
      { message: "Médecin supprimé avec succès" },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du médecin:", error);

    // Déterminer le message d'erreur à renvoyer
    let errorMessage = "Erreur lors de la suppression du médecin";
    let statusCode = 500;

    if (error instanceof Error) {
      // Vérifier si c'est une erreur de contrainte de clé étrangère
      if (error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2003') {
        errorMessage = "Impossible de supprimer ce médecin car il est référencé par d'autres données";
        statusCode = 400;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}
