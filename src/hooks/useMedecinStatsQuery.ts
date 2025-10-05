'use client';

import { useState, useEffect } from 'react';

// Interface pour les statistiques du médecin
export interface MedecinStats {
  enAttente: number;
  enCours: number;
  consultationsDuJour: number;
  totalPatients: number;
  consultationsTotal: number;
  tempsMoyen: string;
  cached?: boolean;
  timestamp?: string;
}

/**
 * Hook pour récupérer les statistiques d'un médecin
 * avec une mise à jour automatique toutes les 30 secondes
 */
export function useMedecinStats(medecinId: number) {
  const [data, setData] = useState<MedecinStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(Date.now());

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const timestamp = Date.now();
        const response = await fetch(`/api/medecins/${medecinId}/stats?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setData({
          enAttente: data.patientsEnAttente || 0,
          enCours: data.patientsEnCours || 0,
          consultationsDuJour: data.consultationsAujourdhui || 0,
          totalPatients: data.totalPatients || 0,
          consultationsTotal: data.consultationsTotal || 0,
          tempsMoyen: data.tempsMoyen || 'N/A'
        });
        setIsError(false);
        setError(null);
        setDataUpdatedAt(Date.now());
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques:', err);
        setIsError(true);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Rafraîchir les statistiques toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [medecinId]);

  return {
    data,
    isLoading,
    isError,
    error,
    dataUpdatedAt
  };
}
