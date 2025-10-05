'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

// Clés de requête pour React Query
export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  list: (filters: any) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: number) => [...patientKeys.details(), id] as const,
};

/**
 * Hook pour récupérer les détails d'un patient
 * avec mise en cache optimisée
 */
export function usePatientProfile(patientId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: patientKeys.detail(patientId),
    queryFn: async () => {
      // Vérifier si les données sont déjà en cache
      const cachedData = queryClient.getQueryData(patientKeys.detail(patientId));
      if (cachedData) {
        return cachedData;
      }

      // Récupérer les données du patient
      const response = await fetch(`/api/patients/${patientId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du patient');
      }
      
      const data = await response.json();
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 heure
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/**
 * Hook pour précharger les données d'un patient
 */
export function usePrefetchPatientProfile() {
  const queryClient = useQueryClient();

  return (patientId: number) => {
    // Ne pas précharger si les données sont déjà en cache
    if (queryClient.getQueryData(patientKeys.detail(patientId))) {
      return Promise.resolve();
    }

    // Précharger les données du patient
    return queryClient.prefetchQuery({
      queryKey: patientKeys.detail(patientId),
      queryFn: async () => {
        const response = await fetch(`/api/patients/${patientId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du patient');
        }
        
        const data = await response.json();
        return data;
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
}

/**
 * Hook pour précharger les données des patients fréquemment consultés
 */
export function usePrefetchFrequentPatients() {
  const queryClient = useQueryClient();

  return async () => {
    try {
      // Récupérer les IDs des patients fréquemment consultés
      const response = await fetch('/api/patients/frequent');
      if (!response.ok) {
        return;
      }
      
      const data = await response.json();
      const patientIds = data.slice(0, 5).map((p: any) => p.id); // Limiter à 5 patients
      
      // Précharger les données de chaque patient
      const prefetchPromises = patientIds.map((id: number) => {
        // Ne pas précharger si les données sont déjà en cache
        if (queryClient.getQueryData(patientKeys.detail(id))) {
          return Promise.resolve();
        }
        
        return queryClient.prefetchQuery({
          queryKey: patientKeys.detail(id),
          queryFn: async () => {
            const response = await fetch(`/api/patients/${id}`);
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération du patient');
            }
            
            const data = await response.json();
            return data;
          },
          staleTime: 10 * 60 * 1000, // 10 minutes
        });
      });
      
      await Promise.all(prefetchPromises);
    } catch (error) {
      console.error('Erreur lors du préchargement des patients fréquents:', error);
    }
  };
}
