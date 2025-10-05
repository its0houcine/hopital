import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { getCurrentUser } from "@/lib/auth-server";

// Récupérer tous les administrateurs
export async function GET() {
  try {
    // Vérifier si l'utilisateur est un super admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer tous les administrateurs
    const admins = await prisma.user.findMany({
      where: {
        OR: [
          { role: 'admin' },
          { role: 'super_admin' }
        ]
      },
      orderBy: {
        cree_le: 'desc'
      }
    });

    // Formater les données pour le client
    const formattedAdmins = admins.map(admin => ({
      id: admin.id,
      nom: admin.nom,
      prenom: admin.prenom,
      email: admin.email,
      role: admin.role,
      photo: admin.photo,
      cree_le: admin.cree_le.toISOString()
    }));

    return NextResponse.json(formattedAdmins);
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des administrateurs" },
      { status: 500 }
    );
  }
}

// Créer un nouvel administrateur
export async function POST(request: Request) {
  try {
    // Vérifier si l'utilisateur est un super admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer les données du formulaire
    const body = await request.json();
    const { nom, prenom, email, mot_de_passe, role } = body;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(mot_de_passe, 10);

    // Créer l'administrateur
    const admin = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role: role === 'super_admin' ? 'super_admin' : 'admin'
      }
    });

    // Formater la réponse
    return NextResponse.json({
      id: admin.id,
      nom: admin.nom,
      prenom: admin.prenom,
      email: admin.email,
      role: admin.role,
      photo: admin.photo,
      cree_le: admin.cree_le.toISOString()
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'administrateur" },
      { status: 500 }
    );
  }
}
