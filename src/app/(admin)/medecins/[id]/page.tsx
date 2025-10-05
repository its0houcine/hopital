import { Suspense } from 'react';
import prisma from "@/lib/prisma";
import MedecinClient from "./MedecinClient";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageTransition from '@/components/ui/PageTransition';

interface MedecinPageProps {
  params: { id: string };
}

// Composant de chargement
function MedecinLoading() {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center" style={{ backgroundColor: "oklch(0.964 0.018 257.5)" }}>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 font-medium">Chargement du profil du médecin...</p>
    </div>
  );
}

export default async function MedecinPage({ params }: MedecinPageProps) {
  // Résoudre params comme une promesse
  const resolvedParams = await Promise.resolve(params);
  const medecinId = Number(resolvedParams.id);

  if (isNaN(medecinId)) {
    return <div className="p-6 text-center text-red-500">ID du médecin invalide.</div>;
  }

  // Récupérer les données du médecin et les statistiques
  const medecinData = await getMedecinData(medecinId);

  if (!medecinData) {
    return <div className="p-6 text-center text-red-500">Médecin non trouvé</div>;
  }

  return (
    <Suspense fallback={<MedecinLoading />}>
      <MedecinClient medecinData={medecinData} />
    </Suspense>
  );
}

// Fonction pour récupérer les données du médecin et les statistiques
async function getMedecinData(medecinId: number) {
  try {
    // Récupérer le médecin avec ses informations utilisateur
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinId },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            photo: true,
            cree_le: true,
            role: true
          }
        },
        // Inclure les patients associés à ce médecin
        patients: {
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

    if (!medecin) {
      return null;
    }

    // Récupérer le nombre de consultations
    const consultationsCount = await prisma.consultation.count({
      where: { medecinId }
    });

    // Récupérer le nombre de patients en file d'attente
    const fileAttenteCount = await prisma.fileAttente.count({
      where: { medecinId }
    });

    // Récupérer les consultations récentes
    const recentConsultations = await prisma.consultation.findMany({
      where: { medecinId },
      orderBy: { date: 'desc' },
      take: 5,
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            photo: true,
            numero_patient: true
          }
        }
      }
    });

    // Récupérer l'historique récent
    const recentHistorique = await prisma.historiqueConsultation.findMany({
      where: { medecinId },
      orderBy: { date: 'desc' },
      take: 5,
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            photo: true
          }
        }
      }
    });

    // Formater les données
    return {
      id: medecin.id,
      userId: medecin.userId,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      email: medecin.user.email,
      telephone: medecin.telephone,
      specialite: medecin.specialite,
      photo: medecin.user.photo,
      cree_le: medecin.user.cree_le.toISOString(),
      role: medecin.user.role,
      patients: medecin.patients,
      stats: {
        patientsCount: medecin.patients.length,
        consultationsCount,
        fileAttenteCount
      },
      recentConsultations: recentConsultations.map(c => ({
        ...c,
        date: c.date.toISOString()
      })),
      recentHistorique: recentHistorique.map(h => ({
        ...h,
        date: h.date.toISOString()
      }))
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données du médecin:", error);
    return null;
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
