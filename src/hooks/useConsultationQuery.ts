'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCurrentConsultation,
  startConsultation,
  endConsultation
} from '@/services/fileAttenteService';
import { fileAttenteKeys } from './useFileAttenteQuery';

// Clés de requête pour React Query
export const consultationKeys = {
  all: ['consultation'] as const,
  current: (medecinId: number) => [...consultationKeys.all, 'current', medecinId] as const,
};

/**
 * Hook pour récupérer la consultation en cours
 */
export function useCurrentConsultation(medecinId: number) {
  const queryClient = useQueryClient();

  // Créer une clé pour stocker l'état de la consultation terminée
  const consultationTermineeKey = `consultation-terminee-${medecinId}`;

  // Vérifier si la consultation a été terminée récemment
  const isConsultationTerminee = sessionStorage.getItem(consultationTermineeKey) === 'true';

  // Si la consultation a été terminée, désactiver les requêtes automatiques pendant 30 secondes
  if (isConsultationTerminee) {
    setTimeout(() => {
      sessionStorage.removeItem(consultationTermineeKey);
    }, 30000); // 30 secondes
  }

  // Utiliser un état local pour stocker le résultat de la dernière vérification
  const lastCheckKey = `last-check-${medecinId}`;
  const lastCheckResult = sessionStorage.getItem(lastCheckKey) === 'true';
  const lastCheckTime = parseInt(sessionStorage.getItem(`last-check-time-${medecinId}`) || '0');

  // Vérifier si nous avons fait une vérification récemment (moins de 10 secondes)
  const recentCheck = Date.now() - lastCheckTime < 10000;

  // Fonction optimisée pour vérifier si une consultation est réellement en cours
  const isConsultationEnCours = async () => {
    // Si nous avons fait une vérification récente et que le résultat était positif, utiliser ce résultat
    if (recentCheck && lastCheckResult) {
      return true;
    }

    try {
      // Vérifier directement si le patient est encore dans la file d'attente avec statut EN_COURS
      const response = await fetch(`/api/file-attente/medecin/${medecinId}?t=${Date.now()}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });

      if (!response.ok) return false;

      const data = await response.json();
      const result = data.some((item: any) => item.statut === 'EN_COURS');

      // Stocker le résultat de la vérification
      sessionStorage.setItem(lastCheckKey, result ? 'true' : 'false');
      sessionStorage.setItem(`last-check-time-${medecinId}`, Date.now().toString());

      return result;
    } catch (error) {
      console.error('Erreur lors de la vérification de la file d\'attente:', error);
      return false;
    }
  };

  return useQuery({
    queryKey: consultationKeys.current(medecinId),
    queryFn: async () => {
      // Si la consultation a été terminée récemment, retourner null directement
      if (isConsultationTerminee) {
        return null;
      }

      // Vérifier d'abord si une consultation est réellement en cours
      const enCours = await isConsultationEnCours();
      if (!enCours) {
        // Si aucun patient n'est en cours, vider le cache et retourner null
        queryClient.setQueryData(consultationKeys.current(medecinId), null);
        return null;
      }

      // Récupérer la consultation en cours
      const cachedData = queryClient.getQueryData(consultationKeys.current(medecinId));
      if (cachedData) {
        // Si nous avons des données en cache et qu'une consultation est en cours, utiliser le cache
        return cachedData;
      }

      // Sinon, faire une nouvelle requête
      return fetchCurrentConsultation(medecinId);
    },
    refetchInterval: isConsultationTerminee ? false : 10000, // Réduire la fréquence de rafraîchissement à 10 secondes
    refetchOnWindowFocus: false,
    staleTime: isConsultationTerminee ? Infinity : 8000, // Augmenter le staleTime pour réduire les requêtes
    retry: isConsultationTerminee ? 0 : 1, // Limiter les retries
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    // Adapter les données pour qu'elles correspondent à l'ancien format
    select: (data) => {
      if (!data) return null;

      return {
        ...data,
        // Ajouter les champs manquants pour la compatibilité
        debut: data.date,
        fin: null,
        statut: 'EN_COURS'
      };
    },
    // Fonction pour déterminer si une requête doit être exécutée
    enabled: !isConsultationTerminee, // Désactiver les requêtes si la consultation a été terminée
    // Utiliser un placeholderData pour éviter les états de chargement inutiles
    placeholderData: (previousData) => previousData
  });
}

/**
 * Hook pour démarrer une consultation
 */
export function useStartConsultation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileAttenteId, medecinId }: { fileAttenteId: number, medecinId: number }) =>
      startConsultation(fileAttenteId, medecinId),

    onMutate: async ({ fileAttenteId, medecinId }) => {
      // Annuler les requêtes en cours pour éviter les conflits
      await queryClient.cancelQueries({ queryKey: fileAttenteKeys.all });
      await queryClient.cancelQueries({ queryKey: consultationKeys.all });

      // Sauvegarder l'état précédent
      const previousFileAttente = queryClient.getQueryData(fileAttenteKeys.lists());
      const previousConsultation = queryClient.getQueryData(consultationKeys.current(medecinId));

      // Récupérer les données du patient pour la mise à jour optimiste
      const fileAttente = queryClient.getQueryData(fileAttenteKeys.list(medecinId)) as any[] || [];
      const patientItem = fileAttente.find(item => item.id === fileAttenteId);

      if (patientItem) {
        // Mise à jour optimiste de la file d'attente
        queryClient.setQueryData(
          fileAttenteKeys.list(medecinId),
          fileAttente.map(item =>
            item.id === fileAttenteId
              ? { ...item, statut: 'EN_COURS' }
              : item
          )
        );

        // Mise à jour optimiste de la consultation en cours
        // Créer un objet de consultation temporaire
        const tempConsultation = {
          id: -1, // ID temporaire
          patient: patientItem.patient,
          medecin: { id: medecinId },
          date: new Date().toISOString(),
          statut: 'EN_COURS',
          debut: new Date().toISOString(),
          fin: null,
          _optimistic: true // Marquer comme optimiste pour pouvoir l'identifier plus tard
        };

        // Mettre à jour le cache avec la consultation temporaire
        queryClient.setQueryData(
          consultationKeys.current(medecinId),
          tempConsultation
        );
      }

      return { previousFileAttente, previousConsultation, patientItem };
    },

    onSuccess: (data, variables) => {
      // Mettre à jour la consultation en cours avec les données réelles
      queryClient.setQueryData(
        consultationKeys.current(variables.medecinId),
        {
          ...data,
          // Ajouter les champs manquants pour la compatibilité
          debut: data.date,
          fin: null,
          statut: 'EN_COURS'
        }
      );

      // Invalider les requêtes de file d'attente pour forcer un rafraîchissement
      // Utiliser un délai pour éviter les rafraîchissements trop fréquents
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
      }, 300);
    },

    onError: (error, variables, context) => {
      console.error('Erreur lors du démarrage de la consultation:', error);

      // Restaurer l'état précédent
      if (context?.previousFileAttente) {
        queryClient.setQueryData(
          fileAttenteKeys.lists(),
          context.previousFileAttente
        );
      }

      if (context?.previousConsultation) {
        queryClient.setQueryData(
          consultationKeys.current(variables.medecinId),
          context.previousConsultation
        );
      }
    },

    onSettled: (_, __, variables) => {
      // Invalider les requêtes après un délai pour éviter les rafraîchissements trop fréquents
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: consultationKeys.current(variables.medecinId) });
        queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
      }, 500);
    },

    retry: 1, // Réessayer une fois en cas d'échec
  });
}

/**
 * Hook pour terminer une consultation
 */
export function useEndConsultation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      consultationId,
      patientId,
      medecinId,
      data
    }: {
      consultationId: number,
      patientId: number,
      medecinId: number,
      data: {
        diagnostic: string;
        traitement: string;
        notes: string;
        type: 'INITIAL' | 'STANDARD' | 'SPECIALISEE';
      }
    }) => endConsultation(consultationId, patientId, medecinId, data),

    onMutate: async ({ medecinId }) => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({ queryKey: consultationKeys.current(medecinId) });

      // Sauvegarder l'état précédent
      const previousConsultation = queryClient.getQueryData(consultationKeys.current(medecinId));

      // Mettre à jour le cache de manière optimiste
      queryClient.setQueryData(
        consultationKeys.current(medecinId),
        null
      );

      return { previousConsultation };
    },

    onError: (_, variables, context) => {
      // En cas d'erreur, restaurer l'état précédent
      if (context?.previousConsultation) {
        queryClient.setQueryData(
          consultationKeys.current(variables.medecinId),
          context.previousConsultation
        );
      }
    },

    onSettled: (_, __, variables) => {
      // Marquer la consultation comme terminée dans sessionStorage
      // Cela empêchera les requêtes automatiques pendant 30 secondes
      sessionStorage.setItem(`consultation-terminee-${variables.medecinId}`, 'true');

      // Vider explicitement le cache de la consultation en cours
      queryClient.setQueryData(consultationKeys.current(variables.medecinId), null);
      queryClient.removeQueries({ queryKey: consultationKeys.current(variables.medecinId) });

      // Annuler les requêtes en cours pour éviter les rechargements automatiques
      queryClient.cancelQueries({ queryKey: consultationKeys.current(variables.medecinId) });

      // Invalider les requêtes pour forcer un rafraîchissement
      queryClient.invalidateQueries({ queryKey: consultationKeys.current(variables.medecinId) });
      queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });

      // Forcer un rafraîchissement après un court délai
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: consultationKeys.all });
        queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
      }, 300);

      // Forcer un rafraîchissement après un délai plus long
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: consultationKeys.all });
        queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });
      }, 1500);
    },
  });
}
