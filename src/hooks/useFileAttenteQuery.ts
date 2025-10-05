'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFileAttenteMedecin,
  fetchCurrentPatient,
  updatePatientStatus,
  FileAttenteItem,
  FileAttenteStatut
} from '@/services/fileAttenteService';

// Clés de requête pour React Query
export const fileAttenteKeys = {
  all: ['fileAttente'] as const,
  lists: () => [...fileAttenteKeys.all, 'list'] as const,
  list: (medecinId: number) => [...fileAttenteKeys.lists(), medecinId] as const,
  currentPatient: (medecinId: number) => [...fileAttenteKeys.all, 'currentPatient', medecinId] as const,
};

/**
 * Hook pour récupérer la file d'attente d'un médecin
 * avec une mise à jour automatique toutes les 10 secondes
 */
export function useFileAttenteMedecin(medecinId: number) {
  const queryClient = useQueryClient();

  // Vérifier si nous sommes en train de démarrer ou de terminer une consultation
  const isProcessingKey = `processing-consultation-${medecinId}`;
  const isProcessing = sessionStorage.getItem(isProcessingKey) === 'true';

  return useQuery({
    queryKey: fileAttenteKeys.list(medecinId),
    queryFn: async () => {
      // Si nous sommes en train de traiter une consultation, utiliser le cache si disponible
      if (isProcessing) {
        const cachedData = queryClient.getQueryData(fileAttenteKeys.list(medecinId));
        if (cachedData) {
          return cachedData;
        }
      }

      // Sinon, faire une nouvelle requête
      return fetchFileAttenteMedecin(medecinId);
    },
    refetchInterval: isProcessing ? false : 10000, // Désactiver les requêtes pendant le traitement, sinon toutes les 10 secondes
    refetchOnWindowFocus: false,
    staleTime: 8000, // Augmenter le staleTime pour réduire les requêtes
    retry: isProcessing ? 0 : 2, // Limiter les retries pendant le traitement
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    select: (data) => {
      // Trier par ordre
      return [...data].sort((a, b) => a.ordre - b.ordre);
    },
    // Utiliser un placeholderData pour éviter les états de chargement inutiles
    placeholderData: (previousData) => previousData
  });
}

/**
 * Hook pour récupérer le patient actuel (premier de la file d'attente)
 */
export function useCurrentPatient(medecinId: number) {
  return useQuery({
    queryKey: fileAttenteKeys.currentPatient(medecinId),
    queryFn: () => fetchCurrentPatient(medecinId),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    staleTime: 4000,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/**
 * Hook pour mettre à jour le statut d'un patient dans la file d'attente
 * avec mise à jour optimiste du cache
 */
export function useUpdatePatientStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, status }: { patientId: number, status: FileAttenteStatut }) =>
      updatePatientStatus(patientId, status),

    // Mise à jour optimiste du cache
    onMutate: async ({ patientId, status }) => {
      // Annuler les requêtes en cours pour éviter d'écraser notre mise à jour optimiste
      await queryClient.cancelQueries({ queryKey: fileAttenteKeys.all });

      // Sauvegarder l'état précédent
      const previousFileAttente = queryClient.getQueryData(fileAttenteKeys.lists());

      // Si le statut est TERMINE, on supprime l'élément du cache
      if (status === 'TERMINE') {
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.lists() },
          (old: any) => {
            if (!old) return old;

            // Si c'est un tableau (liste complète)
            if (Array.isArray(old)) {
              return old.filter((item: FileAttenteItem) => item.patient.id !== patientId);
            }

            return old;
          }
        );

        // Mettre à jour également le patient actuel si nécessaire
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.all.concat('currentPatient') },
          (old: any) => {
            if (!old || !old.patient) return old;

            if (old.patient.id === patientId) {
              return null;
            }

            return old;
          }
        );
      } else {
        // Mettre à jour le cache de manière optimiste
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.lists() },
          (old: any) => {
            if (!old) return old;

            // Si c'est un tableau (liste complète)
            if (Array.isArray(old)) {
              return old.map((item: FileAttenteItem) =>
                item.patient.id === patientId ? { ...item, statut: status } : item
              );
            }

            return old;
          }
        );

        // Mettre à jour également le patient actuel si nécessaire
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.all.concat('currentPatient') },
          (old: any) => {
            if (!old || !old.patient) return old;

            if (old.patient.id === patientId) {
              return { ...old, statut: status };
            }

            return old;
          }
        );
      }

      return { previousFileAttente };
    },

    // En cas d'erreur, restaurer l'état précédent
    onError: (err, variables, context) => {
      if (context?.previousFileAttente) {
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.lists() },
          context.previousFileAttente
        );
      }
    },

    // Après succès ou erreur, invalider les requêtes pour forcer un rafraîchissement
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
    },
  });
}

/**
 * Hook pour supprimer un patient de la file d'attente
 * avec mise à jour optimiste du cache
 */
export function useRemoveFromFileAttente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patientId: number) =>
      fetch(`/api/file-attente/patient/${patientId}`, { method: 'DELETE' }).then(res => res.json()),

    // Mise à jour optimiste du cache
    onMutate: async (patientId) => {
      await queryClient.cancelQueries({ queryKey: fileAttenteKeys.all });

      const previousFileAttente = queryClient.getQueryData(fileAttenteKeys.lists());

      queryClient.setQueriesData(
        { queryKey: fileAttenteKeys.lists() },
        (old: any) => {
          if (!old) return old;

          if (Array.isArray(old)) {
            return old.filter((item: FileAttenteItem) => item.patient.id !== patientId);
          }

          return old;
        }
      );

      // Si le patient actuel est celui qu'on supprime, le mettre à null
      queryClient.setQueriesData(
        { queryKey: fileAttenteKeys.all.concat('currentPatient') },
        (old: any) => {
          if (!old || !old.patient) return old;

          if (old.patient.id === patientId) {
            return null;
          }

          return old;
        }
      );

      return { previousFileAttente };
    },

    onError: (err, patientId, context) => {
      if (context?.previousFileAttente) {
        queryClient.setQueriesData(
          { queryKey: fileAttenteKeys.lists() },
          context.previousFileAttente
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
    },
  });
}
