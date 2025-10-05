'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllFileAttente } from '@/app/actions/fileAttente';

// Clés de requête pour React Query
export const adminFileAttenteKeys = {
  all: ['adminFileAttente'] as const,
  counts: () => [...adminFileAttenteKeys.all, 'counts'] as const,
};

/**
 * Hook pour récupérer les compteurs de la file d'attente côté admin
 * avec une mise à jour automatique toutes les 10 secondes
 */
export function useAdminFileAttenteCounts() {
  return useQuery({
    queryKey: adminFileAttenteKeys.counts(),
    queryFn: async () => {
      const result = await getAllFileAttente();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Erreur lors de la récupération de la file d\'attente');
      }
      
      // Calculer les compteurs
      const enAttente = result.data.filter(item => item.statut === 'EN_ATTENTE').length;
      const enCours = result.data.filter(item => item.statut === 'EN_COURS').length;
      
      return {
        EN_ATTENTE: enAttente,
        EN_COURS: enCours
      };
    },
    refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
    refetchOnWindowFocus: false,
    staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
