import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    // Récupérer le token d'authentification
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Vérifier et décoder le token
    const decoded = verify(token, process.env.JWT_SECRET || 'secret-key') as any;
    console.log('Token décodé:', decoded);

    // Récupérer l'utilisateur complet depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        medecin: true
      }
    });

    if (!user) {
      console.log('Utilisateur non trouvé dans la base de données');
      return NextResponse.json({ authenticated: false });
    }

    console.log('Utilisateur trouvé:', { id: user.id, email: user.email, role: user.role });

    // Retourner les informations complètes de l'utilisateur
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        photo: user.photo,
        telephone: user.telephone,
        cree_le: user.cree_le,
        medecin: user.medecin ? {
          id: user.medecin.id,
          specialite: user.medecin.specialite,
          telephone: user.medecin.telephone,
          adresse: user.medecin.adresse
        } : null
      }
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error);
    return NextResponse.json({ authenticated: false });
  }
}
