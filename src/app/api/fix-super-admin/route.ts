import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Mettre à jour l'utilisateur avec l'email superadmin@elhassi.dz pour avoir le rôle super_admin
    const updatedUser = await prisma.$executeRaw`
      UPDATE "User" 
      SET role = 'super_admin'::Role 
      WHERE email = 'superadmin@elhassi.dz'
    `;

    return NextResponse.json({
      success: true,
      message: "Le rôle super_admin a été correctement appliqué",
      updatedUser
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle super_admin:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du rôle super_admin" },
      { status: 500 }
    );
  }
}
