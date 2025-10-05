'use server'

import prisma from "@/lib/prisma";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createToken, verifyAuth } from "@/lib/auth-server";

// Authentification
export async function login(email: string, password: string) {
  try {
    if (!email || !password) {
      return { success: false, error: "Email et mot de passe requis" };
    }

    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        medecin: true
      }
    });

    if (!user) {
      return { success: false, error: "Utilisateur non trouvé" };
    }

    // Vérifier le mot de passe
    const passwordMatch = await compare(password, user.mot_de_passe);
    if (!passwordMatch) {
      return { success: false, error: "Mot de passe incorrect" };
    }

    // Créer un token JWT
    const token = createToken(user);

    // Définir le cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/"
    });

    // Déterminer la page de redirection en fonction du rôle
    let redirectUrl = '/';
    if (user.role === 'super_admin') {
      redirectUrl = '/';  // Page d'administration pour super_admin
      console.log('Redirection super_admin vers:', redirectUrl);
    } else if (user.role === 'admin') {
      redirectUrl = '/';  // Page d'administration pour admin
      console.log('Redirection admin vers:', redirectUrl);
    } else if (user.role === 'medecin') {
      redirectUrl = '/medecin/dashboard';  // Dashboard médecin
      console.log('Redirection médecin vers:', redirectUrl);
    }

    return {
      success: true,
      data: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        photo: user.photo,
        medecinId: user.medecin?.id
      },
      redirectUrl
    };
  } catch (error) {
    console.error("Erreur:", error);
    return { success: false, error: "Erreur lors de l'authentification" };
  }
}

// Déconnexion
export async function logout() {
  cookies().delete("auth-token");
  redirect("/login");
}

// Vérifier l'authentification
export async function checkAuth() {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    return { success: false, authenticated: false };
  }

  try {
    // Vérifier le token
    const user = await verifyAuth(token);

    return {
      success: true,
      authenticated: true,
      user
    };
  } catch (error) {
    cookies().delete("auth-token");
    return { success: false, authenticated: false };
  }
}

// Enregistrement d'un nouvel utilisateur
export async function register(formData: {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  specialite?: string;
  telephone?: string;
}) {
  try {
    const { nom, prenom, email, mot_de_passe, specialite, telephone } = formData;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: "Cet email est déjà utilisé" };
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(mot_de_passe, 10);

    // Créer l'utilisateur et le médecin dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer l'utilisateur
      const user = await tx.user.create({
        data: {
          nom,
          prenom,
          email,
          mot_de_passe: hashedPassword,
          role: "medecin"
        }
      });

      // 2. Créer le médecin associé
      const medecin = await tx.medecin.create({
        data: {
          specialite: specialite || "Généraliste",
          telephone,
          userId: user.id
        }
      });

      return {
        user,
        medecin
      };
    });

    // Créer un token JWT
    const token = createToken(result.user);

    // Définir le cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/"
    });

    return {
      success: true,
      data: {
        id: result.user.id,
        nom: result.user.nom,
        prenom: result.user.prenom,
        email: result.user.email,
        role: result.user.role,
        medecinId: result.medecin.id
      }
    };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
    return { success: false, error: "Erreur lors de l'enregistrement" };
  }
}