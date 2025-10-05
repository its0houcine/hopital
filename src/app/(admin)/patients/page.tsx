import { Suspense } from 'react';
import { getMedecins } from '@/app/actions/medecin';
import PatientsClient from './PatientsClient';
import PageTransition from '@/components/ui/PageTransition';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Composant de chargement optimisé
function PatientsLoading() {
  return <SkeletonLoader type="patients" count={9} />;
}

// Composant principal (Server Component)
export default async function PatientsPage() {
  // Récupérer les données initiales côté serveur
  const initialData = await getInitialData();

  return (
    <Suspense fallback={<PatientsLoading />}>
      <PageTransition>
        <PatientsClient initialData={initialData} />
      </PageTransition>
    </Suspense>
  );
}

// Optimiser le chargement avec ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalider toutes les 60 secondes

// Fonction pour récupérer les données initiales
async function getInitialData() {
  try {
    // Importer prisma directement dans cette fonction serveur
    const prisma = (await import('@/lib/prisma')).default;

    // Récupérer les patients directement depuis Prisma
    const [patients, totalPatients] = await Promise.all([
      prisma.patient.findMany({
        take: 12,
        orderBy: { id: 'desc' },
        include: {
          medecin: {
            include: {
              user: {
                select: {
                  nom: true,
                  prenom: true
                }
              }
            }
          }
        }
      }),
      prisma.patient.count()
    ]);

    // Formater les patients
    const formattedPatients = patients.map(patient => ({
      ...patient,
      date_naissance: patient.date_naissance?.toISOString(),
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null
    }));

    // Récupérer les médecins
    const medecinsResult = await getMedecins();
    const medecins = medecinsResult.success ? medecinsResult.data : [];

    return {
      patients: formattedPatients,
      pagination: {
        total: totalPatients,
        page: 1,
        limit: 12,
        totalPages: Math.ceil(totalPatients / 12)
      },
      medecins: medecins || [] // Assurer que medecins est toujours un tableau
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données initiales:', error);
    return {
      patients: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0
      },
      medecins: []
    };
  }
}
