import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-server';

// Récupérer les données du dashboard pour un médecin
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
    
    // Vérifier que l'utilisateur est un médecin
    if (currentUser.role !== 'medecin') {
      return NextResponse.json(
        { error: "Accès réservé aux médecins" },
        { status: 403 }
      );
    }
    
    // Récupérer l'ID du médecin
    let medecinId = currentUser.medecinId;
    
    // Si l'ID du médecin n'est pas dans le token, le récupérer depuis la base de données
    if (!medecinId) {
      const medecin = await prisma.medecin.findFirst({
        where: { userId: currentUser.id }
      });
      
      if (!medecin) {
        return NextResponse.json(
          { error: "Profil médecin non trouvé" },
          { status: 404 }
        );
      }
      
      medecinId = medecin.id;
    }
    
    // Récupérer les données du dashboard en parallèle pour optimiser les performances
    const [fileAttenteStats, consultationsAujourdhui, totalPatients, consultationsTotal] = await Promise.all([
      // Statistiques de la file d'attente
      prisma.fileAttente.groupBy({
        by: ['statut'],
        where: { medecinId },
        _count: true
      }),
      
      // Consultations d'aujourd'hui
      prisma.consultation.count({
        where: {
          medecinId,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      
      // Nombre total de patients
      prisma.patient.count({
        where: { medecinId }
      }),
      
      // Total des consultations
      prisma.consultation.count({
        where: { medecinId }
      })
    ]);
    
    // Calculer le nombre de patients en attente et en cours
    const patientsEnAttente = fileAttenteStats.find(stat => stat.statut === 'EN_ATTENTE')?._count || 0;
    const patientsEnCours = fileAttenteStats.find(stat => stat.statut === 'EN_COURS')?._count || 0;
    
    // Récupérer le temps moyen des consultations
    const tempsMoyenResult = await prisma.$queryRaw`
      SELECT AVG(EXTRACT(EPOCH FROM ("fin" - "debut")) / 60) as avg_minutes
      FROM "Consultation"
      WHERE "medecinId" = ${medecinId}
      AND "debut" IS NOT NULL
      AND "fin" IS NOT NULL
    `;
    
    // Extraire le temps moyen
    const tempsMoyenMinutes = Math.round(parseFloat((tempsMoyenResult as any[])[0]?.avg_minutes || '0'));
    
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
    
    // Formater les données du dashboard
    const dashboardData = {
      patientsEnAttente,
      patientsEnCours,
      consultationsAujourdhui,
      totalPatients,
      consultationsTotal,
      tempsMoyen,
      timestamp: Date.now()
    };
    
    // Retourner les données avec des en-têtes de cache appropriés
    return NextResponse.json(dashboardData, {
      headers: {
        'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard:', error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
