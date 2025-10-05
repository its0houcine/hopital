import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-server';

// Récupérer les données du dashboard pour un administrateur
export async function GET(request: Request) {
  try {
    // Récupérer l'utilisateur actuel
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
        { error: "Accès réservé aux administrateurs" },
        { status: 403 }
      );
    }

    // Récupérer les données du dashboard en parallèle pour optimiser les performances
    const [fileAttenteStats, consultationsAujourdhui, totalPatients, totalMedecins, totalConsultations] = await Promise.all([
      // Statistiques de la file d'attente
      prisma.fileAttente.groupBy({
        by: ['statut'],
        _count: true
      }),

      // Consultations d'aujourd'hui
      prisma.consultation.count({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),

      // Nombre total de patients
      prisma.patient.count(),

      // Nombre total de médecins
      prisma.medecin.count(),

      // Total des consultations
      prisma.consultation.count()
    ]);

    // Calculer le nombre de patients en attente et en cours
    const patientsEnAttente = fileAttenteStats.find(stat => stat.statut === 'EN_ATTENTE')?._count || 0;
    const patientsEnCours = fileAttenteStats.find(stat => stat.statut === 'EN_COURS')?._count || 0;

    // Vérifier si la requête est minimale (pour le préchargement)
    const url = new URL(request.url);
    const isMinimal = url.searchParams.get('minimal') === 'true';

    // Si la requête est minimale, retourner uniquement les données de base
    if (isMinimal) {
      const dashboardData = {
        patientsEnAttente,
        patientsEnCours,
        consultationsAujourdhui,
        totalPatients,
        totalMedecins,
        totalConsultations,
        tempsMoyen: "N/A",
        medecinsActifs: [],
        timestamp: Date.now(),
        minimal: true
      };

      return NextResponse.json(dashboardData, {
        headers: {
          'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
          'Content-Type': 'application/json'
        }
      });
    }

    // Pour les requêtes complètes, calculer une durée moyenne approximative
    // Puisque nous n'avons pas de colonnes debut et fin, nous utilisons une valeur par défaut
    const tempsMoyenMinutes = 30; // Valeur par défaut de 30 minutes

    // Formater le temps moyen
    let tempsMoyen: string;
    if (tempsMoyenMinutes > 0) {
      const heures = Math.floor(tempsMoyenMinutes / 60);
      const minutes = tempsMoyenMinutes % 60;
      tempsMoyen = heures > 0
        ? `${heures}h ${minutes}min`
        : `${minutes} minutes`;
    } else {
      tempsMoyen = "N/A";
    }

    // Récupérer les statistiques des médecins les plus actifs
    const medecinStats = await prisma.consultation.groupBy({
      by: ['medecinId'],
      _count: true,
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 5
    });

    // Récupérer les détails des médecins les plus actifs
    const medecinIds = medecinStats.map(stat => stat.medecinId);
    const medecinsDetails = await prisma.medecin.findMany({
      where: {
        id: {
          in: medecinIds
        }
      },
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            photo: true
          }
        }
      }
    });

    // Combiner les statistiques avec les détails des médecins
    const medecinsActifs = medecinStats.map(stat => {
      const medecin = medecinsDetails.find(m => m.id === stat.medecinId);
      return {
        id: stat.medecinId,
        nom: medecin?.user.nom || '',
        prenom: medecin?.user.prenom || '',
        photo: medecin?.user.photo || null,
        consultations: stat._count
      };
    });

    // Formater les données du dashboard
    const dashboardData = {
      patientsEnAttente,
      patientsEnCours,
      consultationsAujourdhui,
      totalPatients,
      totalMedecins,
      totalConsultations,
      tempsMoyen,
      medecinsActifs,
      timestamp: Date.now()
    };

    // Retourner les données avec des en-têtes de cache appropriés
    return NextResponse.json(dashboardData, {
      headers: {
        'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard admin:', error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
