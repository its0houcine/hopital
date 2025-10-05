import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function GET() {
  try {
    // Hasher les mots de passe
    const superAdminPassword = await hash('superadmin123', 10);
    const adminPassword = await hash('admin123', 10);

    // Créer un super admin
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@elhassi.dz' },
      update: {},
      create: {
        nom: 'Super',
        prenom: 'Admin',
        email: 'superadmin@elhassi.dz',
        mot_de_passe: superAdminPassword,
        role: 'super_admin',
        photo: null
      }
    });

    // Créer un admin (secrétaire/réceptionniste)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@elhassi.dz' },
      update: {},
      create: {
        nom: 'Secrétaire',
        prenom: 'Réceptionniste',
        email: 'admin@elhassi.dz',
        mot_de_passe: adminPassword,
        role: 'admin',
        photo: null
      }
    });

    return NextResponse.json({
      success: true,
      message: "Utilisateurs créés avec succès",
      users: [
        { email: superAdmin.email, role: superAdmin.role },
        { email: admin.email, role: admin.role }
      ]
    });
  } catch (error) {
    console.error("Erreur lors de la création des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création des utilisateurs" },
      { status: 500 }
    );
  }
}
