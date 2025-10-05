'use server'

import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
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

// Récupérer tous les médecins
export async function getMedecins() {
  try {
    const medecins = await prisma.medecin.findMany({
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
      },
      orderBy: {
        id: 'desc'
      }
    });
    
    // Formater les données
    const formattedMedecins = medecins.map(medecin => ({
      id: medecin.id,
      userId: medecin.userId,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      email: medecin.user.email,
      telephone: medecin.telephone,
      specialite: medecin.specialite,
      photo: medecin.user.photo,
      cree_le: medecin.user.cree_le,
      role: medecin.user.role
    }));
    
    return { success: true, data: formattedMedecins };
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins:", error);
    return { success: false, error: "Erreur lors de la récupération des médecins" };
  }
}

// Récupérer un médecin par son ID
export async function getMedecinById(id: number) {
  try {
    const medecin = await prisma.medecin.findUnique({
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
        patients: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            numero_patient: true,
            photo: true
          }
        }
      }
    });

    if (!medecin) {
      return { success: false, error: "Médecin non trouvé" };
    }

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
      cree_le: medecin.user.cree_le,
      role: medecin.user.role,
      patients: medecin.patients
    };

    return { success: true, data: formattedMedecin };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la récupération du médecin" };
  }
}

// Créer un nouveau médecin
export async function createMedecin(formData: FormData) {
  try {
    // Utiliser une transaction pour créer à la fois l'utilisateur et le médecin
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer l'utilisateur
      const hashedPassword = await hash(
        (formData.get("mot_de_passe") as string) || "password123",
        10
      );
      
      const user = await tx.user.create({
        data: {
          nom: formData.get("nom") as string,
          prenom: formData.get("prenom") as string,
          email: formData.get("email") as string,
          mot_de_passe: hashedPassword,
          role: "medecin",
          photo: formData.get("photo") ? await processPhoto(formData.get("photo") as File) : null,
        }
      });
      
      // 2. Créer le médecin associé
      const medecin = await tx.medecin.create({
        data: {
          specialite: formData.get("specialite") as string,
          telephone: formData.get("telephone") as string,
          userId: user.id
        },
        include: {
          user: true
        }
      });
      
      return {
        id: medecin.id,
        userId: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: medecin.telephone,
        specialite: medecin.specialite,
        photo: user.photo,
        cree_le: user.cree_le,
        role: user.role
      };
    });

    // Revalider le chemin pour mettre à jour les données
    revalidatePath('/medecins');
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur lors de la création du médecin:", error);
    return { success: false, error: "Erreur lors de la création du médecin" };
  }
}

// Mettre à jour un médecin
export async function updateMedecin(id: number, formData: FormData) {
  try {
    // Vérifier si le médecin existe
    const existingMedecin = await prisma.medecin.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!existingMedecin) {
      return { success: false, error: "Médecin non trouvé" };
    }

    // Mettre à jour dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mettre à jour l'utilisateur
      const userUpdateData: any = {};
      
      if (formData.get("nom")) userUpdateData.nom = formData.get("nom");
      if (formData.get("prenom")) userUpdateData.prenom = formData.get("prenom");
      if (formData.get("email")) userUpdateData.email = formData.get("email");
      if (formData.get("mot_de_passe")) {
        userUpdateData.mot_de_passe = await hash(formData.get("mot_de_passe") as string, 10);
      }
      if (formData.get("photo")) {
        userUpdateData.photo = await processPhoto(formData.get("photo") as File);
      }

      const updatedUser = await tx.user.update({
        where: { id: existingMedecin.userId },
        data: userUpdateData
      });

      // 2. Mettre à jour le médecin
      const medecinUpdateData: any = {};
      
      if (formData.get("specialite")) medecinUpdateData.specialite = formData.get("specialite");
      if (formData.get("telephone")) medecinUpdateData.telephone = formData.get("telephone");

      const updatedMedecin = await tx.medecin.update({
        where: { id },
        data: medecinUpdateData,
        include: { user: true }
      });

      // Formater la réponse
      return {
        id: updatedMedecin.id,
        userId: updatedMedecin.userId,
        nom: updatedUser.nom,
        prenom: updatedUser.prenom,
        email: updatedUser.email,
        telephone: updatedMedecin.telephone,
        specialite: updatedMedecin.specialite,
        photo: updatedUser.photo,
        cree_le: updatedUser.cree_le,
        role: updatedUser.role
      };
    });

    // Revalider le chemin pour mettre à jour les données
    revalidatePath(`/medecins/${id}`);
    revalidatePath('/medecins');
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la mise à jour du médecin" };
  }
}

// Supprimer un médecin
export async function deleteMedecin(id: number) {
  try {
    // Vérifier si le médecin existe
    const existingMedecin = await prisma.medecin.findUnique({
      where: { id }
    });

    if (!existingMedecin) {
      return { success: false, error: "Médecin non trouvé" };
    }

    // Supprimer dans une transaction
    await prisma.$transaction(async (tx) => {
      // 1. Supprimer le médecin
      await tx.medecin.delete({
        where: { id }
      });

      // 2. Supprimer l'utilisateur associé
      await tx.user.delete({
        where: { id: existingMedecin.userId }
      });
    });

    // Revalider le chemin pour mettre à jour les données
    revalidatePath('/medecins');
    
    return { success: true, message: "Médecin supprimé avec succès" };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de la suppression du médecin" };
  }
}
