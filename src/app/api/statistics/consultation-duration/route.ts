import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly'; // daily, monthly, yearly
    const range = parseInt(searchParams.get('range') || '12'); // Nombre de périodes à récupérer
    const medecinId = searchParams.get('medecinId') ? parseInt(searchParams.get('medecinId') || '0') : undefined;

    // Calculer la date de début en fonction de la période
    const today = new Date();
    let startDate = new Date(today);

    switch (period) {
      case 'daily':
        startDate.setDate(today.getDate() - range + 1);
        break;
      case 'monthly':
        startDate.setMonth(today.getMonth() - range + 1);
        startDate.setDate(1);
        break;
      case 'yearly':
        startDate.setFullYear(today.getFullYear() - range + 1);
        startDate.setMonth(0);
        startDate.setDate(1);
        break;
    }

    startDate.setHours(0, 0, 0, 0);

    // Générer les labels pour l'axe X (comme dans l'API statistics)
    const labels = [];
    for (let i = 0; i < range; i++) {
      let date = new Date(startDate);

      switch (period) {
        case 'daily':
          date.setDate(startDate.getDate() + i);
          labels.push(date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }));
          break;
        case 'monthly':
          date.setMonth(startDate.getMonth() + i);
          labels.push(date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }));
          break;
        case 'yearly':
          date.setFullYear(startDate.getFullYear() + i);
          labels.push(date.getFullYear().toString());
          break;
      }
    }

    // Construire la requête de base
    let whereClause: any = {
      date: {
        gte: startDate
      }
    };

    // Ajouter le filtre par médecin si spécifié
    if (medecinId) {
      whereClause.medecinId = medecinId;
    }

    // Récupérer les consultations
    const consultations = await prisma.consultation.findMany({
      where: whereClause,
      select: {
        id: true,
        date: true,
        patientId: true,
        medecinId: true,
        debut: true,
        fin: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Calculer la durée moyenne des consultations par période
    // Initialiser le tableau de données avec des zéros
    const durationData = Array(range).fill(0);
    const countByPeriod = Array(range).fill(0);

    // Calculer la durée des consultations
    // Pour les consultations sans fin, nous utiliserons une durée estimée
    consultations.forEach(consultation => {
      const consultationDate = new Date(consultation.date);
      let index = -1;

      // Déterminer l'index de la période
      switch (period) {
        case 'daily':
          index = Math.floor((consultationDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          break;
        case 'monthly':
          index = (consultationDate.getFullYear() - startDate.getFullYear()) * 12 +
                  consultationDate.getMonth() - startDate.getMonth();
          break;
        case 'yearly':
          index = consultationDate.getFullYear() - startDate.getFullYear();
          break;
      }

      if (index >= 0 && index < range) {
        let durationMinutes = 0;

        // Si la consultation a une date de début et de fin, calculer la durée réelle
        if (consultation.debut && consultation.fin) {
          durationMinutes = Math.round(
            (consultation.fin.getTime() - consultation.debut.getTime()) / (1000 * 60)
          );
        }
        // Sinon, si la consultation a seulement une date de début, estimer la durée
        // en fonction du temps écoulé depuis le début (max 60 minutes)
        else if (consultation.debut) {
          const now = new Date();
          const elapsedMinutes = Math.round(
            (now.getTime() - consultation.debut.getTime()) / (1000 * 60)
          );
          durationMinutes = Math.min(elapsedMinutes, 60); // Limiter à 60 minutes
        }
        // Si pas de date de début ni de fin, utiliser une valeur par défaut
        else {
          durationMinutes = 25; // Durée moyenne par défaut
        }

        // Ne prendre en compte que les durées raisonnables (entre 1 et 180 minutes)
        if (durationMinutes > 0 && durationMinutes <= 180) {
          durationData[index] += durationMinutes;
          countByPeriod[index]++;
        }
      }
    });

    // Calculer la moyenne pour chaque période
    for (let i = 0; i < range; i++) {
      if (countByPeriod[i] > 0) {
        durationData[i] = Math.round(durationData[i] / countByPeriod[i]);
      } else {
        // Si aucune consultation dans cette période, utiliser la moyenne globale ou une valeur par défaut
        const globalAverage = consultations.length > 0
          ? Math.round(durationData.reduce((sum, val) => sum + val, 0) / durationData.filter(val => val > 0).length)
          : 25;
        durationData[i] = globalAverage;
      }
    }

    // Calculer la variation en pourcentage
    const calculateChange = (data: number[]) => {
      if (data.length < 2 || data[data.length - 2] === 0) return '+0.0%';

      const lastValue = data[data.length - 1];
      const previousValue = data[data.length - 2];
      const change = ((lastValue - previousValue) / previousValue) * 100;

      return (change > 0 ? '+' : '') + change.toFixed(1) + '%';
    };

    // Calculer la durée moyenne globale
    const durationAverage = Math.round(
      durationData.reduce((sum, val) => sum + val, 0) /
      durationData.filter(val => val > 0).length || 1
    );

    return NextResponse.json({
      period,
      labels,
      duration: {
        data: durationData,
        change: calculateChange(durationData),
        average: durationAverage
      }
    });
  } catch (error) {
    console.error("Erreur lors du calcul de la durée des consultations:", error);
    return NextResponse.json(
      { error: "Erreur lors du calcul de la durée des consultations" },
      { status: 500 }
    );
  }
}
