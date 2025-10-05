import { Suspense } from 'react';
import MedecinsClient from './MedecinsClient';
import PageTransition from '@/components/ui/PageTransition';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Composant de chargement optimisé
function MedecinsLoading() {
  return <SkeletonLoader type="medecins" count={9} />;
}

// Composant principal (Server Component)
export default async function MedecinsPage() {
  // Récupérer les données initiales côté serveur
  const initialData = await getInitialData();

  return (
    <Suspense fallback={<MedecinsLoading />}>
      <PageTransition>
        <MedecinsClient initialData={initialData} />
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

    // Récupérer les médecins directement depuis Prisma
    const [medecins, totalMedecins] = await Promise.all([
      prisma.medecin.findMany({
        take: 12,
        orderBy: { id: 'desc' },
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
          }
        }
      }),
      prisma.medecin.count()
    ]);

    // Formater les médecins
    const formattedMedecins = medecins.map(medecin => ({
      id: medecin.id,
      userId: medecin.userId,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      email: medecin.user.email,
      telephone: medecin.telephone,
      specialite: medecin.specialite,
      photo: medecin.user.photo,
      cree_le: medecin.user.cree_le.toISOString(),
      role: medecin.user.role
    }));

    return {
      medecins: formattedMedecins,
      pagination: {
        total: totalMedecins,
        page: 1,
        limit: 12,
        totalPages: Math.ceil(totalMedecins / 12)
      }
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données initiales:', error);
    return {
      medecins: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0
      }
    };
  }
}
