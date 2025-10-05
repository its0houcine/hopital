import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-server";
import { hash } from "bcrypt";

// Récupérer un administrateur par son ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID d'administrateur invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est un super admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer l'administrateur
    const admin = await prisma.user.findUnique({
      where: {
        id,
        OR: [
          { role: 'admin' },
          { role: 'super_admin' }
        ]
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Administrateur non trouvé" },
        { status: 404 }
      );
    }

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
    console.error("Erreur lors de la récupération de l'administrateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'administrateur" },
      { status: 500 }
    );
  }
}

// Mettre à jour un administrateur
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID d'administrateur invalide" },
        { status: 400 }
      );
    }

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

    // Vérifier si l'administrateur existe
    const admin = await prisma.user.findUnique({
      where: { id }
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Administrateur non trouvé" },
        { status: 404 }
      );
    }

    // Empêcher la modification du rôle de son propre compte de super_admin à admin
    if (currentUser.id === id && currentUser.role === 'super_admin' && role === 'admin') {
      return NextResponse.json(
        { error: "Vous ne pouvez pas rétrograder votre propre compte de super admin à admin" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà (sauf pour le même utilisateur)
    if (email !== admin.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 400 }
        );
      }
    }

    // Préparer les données à mettre à jour
    const updateData: any = {
      nom,
      prenom,
      email,
      role: role === 'super_admin' ? 'super_admin' : 'admin'
    };

    // Hasher le mot de passe si fourni
    if (mot_de_passe) {
      updateData.mot_de_passe = await hash(mot_de_passe, 10);
    }

    // Mettre à jour l'administrateur
    const updatedAdmin = await prisma.user.update({
      where: { id },
      data: updateData
    });

    // Formater la réponse
    return NextResponse.json({
      id: updatedAdmin.id,
      nom: updatedAdmin.nom,
      prenom: updatedAdmin.prenom,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      photo: updatedAdmin.photo,
      cree_le: updatedAdmin.cree_le.toISOString()
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'administrateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'administrateur" },
      { status: 500 }
    );
  }
}

// Supprimer un administrateur
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Résoudre params comme une promesse
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID d'administrateur invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est un super admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Vérifier si l'administrateur existe
    const admin = await prisma.user.findUnique({
      where: { id }
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Administrateur non trouvé" },
        { status: 404 }
      );
    }

    // Empêcher la suppression de son propre compte
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }

    // Supprimer l'administrateur
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'administrateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'administrateur" },
      { status: 500 }
    );
  }
}
