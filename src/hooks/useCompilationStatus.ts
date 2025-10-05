'use client';

import { useState, useEffect, useRef } from 'react';
import { getCompilationStatus, CompilationStatus } from '@/services/dynamicRoutePreloadService';

interface UseCompilationStatusOptions {
  pollingInterval?: number;
  enabled?: boolean;
}

/**
 * Hook pour suivre le statut de compilation en temps réel
 */
export function useCompilationStatus(options: UseCompilationStatusOptions = {}) {
  const {
    pollingInterval = 300,
    enabled = true
  } = options;

  const [status, setStatus] = useState<CompilationStatus | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour récupérer le statut de compilation
  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const compilationStatus = await getCompilationStatus();

      setStatus(compilationStatus);

      if (compilationStatus.errors && compilationStatus.errors.length > 0) {
        setErrors(compilationStatus.errors);
      }

      return compilationStatus;
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de compilation:', error);
      setIsError(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Démarrer/arrêter le polling en fonction de l'option enabled
  useEffect(() => {
    if (!enabled) {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      return;
    }

    // Récupérer le statut initial
    fetchStatus();

    // Démarrer le polling
    pollingIntervalRef.current = setInterval(async () => {
      const status = await fetchStatus();

      // Si la compilation est terminée et qu'il n'y a plus d'activité, arrêter le polling
      if (status && !status.isCompiling && status.routes.total > 0 &&
          (status.routes.completed + status.routes.failed) >= status.routes.total) {
        // Attendre une dernière mise à jour avant d'arrêter
        setTimeout(() => {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }, pollingInterval * 2);
      }
    }, pollingInterval);

    // Nettoyer l'intervalle
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [enabled, pollingInterval]);

  return {
    status,
    errors,
    isLoading,
    isError,
    refresh: fetchStatus
  };
}
