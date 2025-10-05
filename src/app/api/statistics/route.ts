import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly'; // daily, monthly, yearly
    const range = parseInt(searchParams.get('range') || '12'); // Nombre de périodes à récupérer

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

    // Générer les labels pour l'axe X
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

    // Récupérer les données réelles de la base de données
    // 1. Patients par période
    const patients = await prisma.patient.findMany({
      where: {
        cree_le: {
          gte: startDate
        }
      },
      select: {
        id: true,
        cree_le: true
      }
    });

    // 2. Consultations par période
    const consultations = await prisma.consultation.findMany({
      where: {
        date: {
          gte: startDate
        }
      },
      select: {
        id: true,
        date: true,
        patientId: true,
        medecinId: true,
        debut: true,
        fin: true
      }
    });

    // Initialiser les tableaux de données avec des zéros
    const patientData = Array(range).fill(0);
    const consultationData = Array(range).fill(0);
    const durationData = Array(range).fill(0);
    const visitData = Array(range).fill(0);

    // Compter les patients par période
    patients.forEach(patient => {
      const patientDate = new Date(patient.cree_le);
      let index = -1;

      switch (period) {
        case 'daily':
          // Calculer le nombre de jours depuis la date de début
          index = Math.floor((patientDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          break;
        case 'monthly':
          // Calculer le nombre de mois depuis la date de début
          index = (patientDate.getFullYear() - startDate.getFullYear()) * 12 +
                  patientDate.getMonth() - startDate.getMonth();
          break;
        case 'yearly':
          // Calculer le nombre d'années depuis la date de début
          index = patientDate.getFullYear() - startDate.getFullYear();
          break;
      }

      if (index >= 0 && index < range) {
        patientData[index]++;
      }
    });

    // Compter les consultations par période
    consultations.forEach(consultation => {
      const consultationDate = new Date(consultation.date);
      let index = -1;

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
        consultationData[index]++;

        // Pour les visites quotidiennes, on compte simplement le nombre de consultations
        if (period === 'daily') {
          visitData[index]++;
        }
      }
    });

    // Pour les périodes mensuelles et annuelles, calculer la moyenne quotidienne des visites
    if (period !== 'daily') {
      for (let i = 0; i < range; i++) {
        let daysInPeriod;
        const periodDate = new Date(startDate);

        if (period === 'monthly') {
          periodDate.setMonth(startDate.getMonth() + i);
          // Nombre de jours dans le mois
          const lastDay = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 0);
          daysInPeriod = lastDay.getDate();
        } else { // yearly
          periodDate.setFullYear(startDate.getFullYear() + i);
          // Vérifier si c'est une année bissextile
          daysInPeriod = (periodDate.getFullYear() % 4 === 0 &&
                          (periodDate.getFullYear() % 100 !== 0 ||
                           periodDate.getFullYear() % 400 === 0)) ? 366 : 365;
        }

        // Calculer la moyenne quotidienne (si aucune consultation, la moyenne est 0)
        visitData[i] = consultationData[i] > 0 ? Math.round(consultationData[i] / daysInPeriod) : 0;
      }
    }

    // Calculer la durée moyenne des consultations par période en utilisant les données réelles
    // Initialiser des compteurs pour chaque période
    const durationTotalByPeriod = Array(range).fill(0);
    const consultationCountByPeriod = Array(range).fill(0);

    // Parcourir toutes les consultations
    consultations.forEach(consultation => {
      const consultationDate = new Date(consultation.date);
      let index = -1;

      // Déterminer la période
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
          durationTotalByPeriod[index] += durationMinutes;
          consultationCountByPeriod[index]++;
        }
      }
    });

    // Calculer la durée moyenne pour chaque période
    for (let i = 0; i < range; i++) {
      if (consultationCountByPeriod[i] > 0) {
        durationData[i] = Math.round(durationTotalByPeriod[i] / consultationCountByPeriod[i]);
      } else {
        // Si aucune consultation dans cette période, utiliser la moyenne globale ou une valeur par défaut
        durationData[i] = 25; // Valeur par défaut de 25 minutes
      }
    }

    // Calculer la durée moyenne globale
    const totalDuration = durationTotalByPeriod.reduce((sum, val) => sum + val, 0);
    const totalCount = consultationCountByPeriod.reduce((sum, val) => sum + val, 0);
    const averageDuration = totalCount > 0 ? Math.round(totalDuration / totalCount) : 25;

    // Calculer les variations en pourcentage
    const calculateChange = (data: number[]) => {
      if (data.length < 2 || data[data.length - 2] === 0) return '+0.0%';

      const lastValue = data[data.length - 1];
      const previousValue = data[data.length - 2];
      const change = ((lastValue - previousValue) / previousValue) * 100;

      return (change > 0 ? '+' : '') + change.toFixed(1) + '%';
    };

    // Calculer les totaux et moyennes
    const patientTotal = patientData.reduce((sum, val) => sum + val, 0);
    const consultationTotal = consultationData.reduce((sum, val) => sum + val, 0);
    const durationAverage = averageDuration; // Valeur fixe pour l'exemple
    const visitsAverage = Math.round(
      visitData.reduce((sum, val) => sum + val, 0) /
      visitData.filter(val => val > 0).length || 1
    );

    return NextResponse.json({
      period,
      labels,
      patients: {
        data: patientData,
        change: calculateChange(patientData),
        total: patientTotal
      },
      consultations: {
        data: consultationData,
        change: calculateChange(consultationData),
        total: consultationTotal
      },
      duration: {
        data: durationData,
        change: calculateChange(durationData),
        average: averageDuration
      },
      visits: {
        data: visitData,
        change: calculateChange(visitData),
        average: visitsAverage
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
