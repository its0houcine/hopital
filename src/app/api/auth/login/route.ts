import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// Authentification
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        medecin: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier le mot de passe
    const passwordMatch = await compare(password, user.mot_de_passe);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer un token JWT
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        medecinId: user.medecin?.id
      },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "1d" }
    );

    // Formater la réponse
    const response = NextResponse.json({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      photo: user.photo,
      medecinId: user.medecin?.id,
      token
    });

    // Définir le cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'authentification" },
      { status: 500 }
    );
  }
}
