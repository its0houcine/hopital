import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-server';

// Récupérer les médecins les plus actifs (avec le plus de consultations récentes)
export async function GET(request: Request) {
  try {
    // Utiliser getCurrentUser au lieu de getServerSession
    const currentUser = await getCurrentUser();

    // Vérifier l'authentification
    if (!currentUser) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est un admin ou super admin
    if (currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer le paramètre limit de l'URL
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 5;

    // Calculer la date d'il y a 30 jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Récupérer les médecins les plus actifs en utilisant Prisma plutôt que SQL brut
    const medecins = await prisma.medecin.findMany({
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            photo: true
          }
        },
        consultations: {
          where: {
            date: {
              gte: thirtyDaysAgo
            }
          },
          select: {
            id: true
          }
        }
      }
    });

    // Calculer le nombre de consultations et formater les données
    const activeMedecins = medecins
      .map(medecin => ({
        id: medecin.id,
        nom: medecin.user.nom,
        prenom: medecin.user.prenom,
        email: medecin.user.email,
        photo: medecin.user.photo,
        consultation_count: medecin.consultations.length
      }))
      .sort((a, b) => b.consultation_count - a.consultation_count)
      .slice(0, limit);

    return NextResponse.json(activeMedecins, {
      headers: {
        'Cache-Control': 'private, max-age=300', // Cache de 5 minutes côté client
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des médecins actifs:', error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
