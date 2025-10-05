import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-server';

// Récupérer les patients récemment consultés
export async function GET(request: Request) {
  try {
    // Utiliser getCurrentUser au lieu de getServerSession
    const currentUser = await getCurrentUser();

    // Vérifier l'authentification
    if (!currentUser) {
      return NextResponse.json(
        [], // Retourner un tableau vide au lieu d'une erreur
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=60'
          }
        }
      );
    }

    // Récupérer le paramètre limit de l'URL
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 5;

    // Récupérer l'ID du médecin si l'utilisateur est un médecin
    let medecinId: number | null = null;

    if (currentUser.role === 'medecin') {
      const medecin = await prisma.medecin.findFirst({
        where: { userId: currentUser.id }
      });

      if (medecin) {
        medecinId = medecin.id;
      }
    }

    // Construire la requête en fonction du rôle
    let recentPatients;

    if (medecinId) {
      // Pour les médecins, récupérer leurs patients récemment consultés
      recentPatients = await prisma.consultation.findMany({
        where: { medecinId },
        orderBy: { date: 'desc' },
        take: limit,
        select: {
          patient: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              numero_patient: true,
              photo: true
            }
          }
        },
        distinct: ['patientId']
      });

      // Transformer les résultats
      recentPatients = recentPatients.map(c => c.patient);
    } else {
      // Pour les admins, récupérer les patients récemment consultés par n'importe quel médecin
      recentPatients = await prisma.consultation.findMany({
        orderBy: { date: 'desc' },
        take: limit * 2, // Prendre plus de résultats pour avoir assez après déduplication
        select: {
          patient: {
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

      // Dédupliquer les patients et prendre les premiers
      const patientIds = new Set();
      recentPatients = recentPatients
        .map(c => c.patient)
        .filter(patient => {
          if (patientIds.has(patient.id)) {
            return false;
          }
          patientIds.add(patient.id);
          return true;
        })
        .slice(0, limit);
    }

    return NextResponse.json(recentPatients, {
      headers: {
        'Cache-Control': 'private, max-age=60', // Cache de 1 minute côté client
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des patients récents:', error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
