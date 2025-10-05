'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Configuration pour une expérience ultra fluide
        refetchOnWindowFocus: false, // Ne pas refetch quand la fenêtre reprend le focus
        retry: 3, // Réessayer 3 fois en cas d'échec
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponentiel
        staleTime: 5 * 60 * 1000, // Considérer les données comme périmées après 5 minutes (augmenté)
        cacheTime: 30 * 60 * 1000, // Garder les données en cache pendant 30 minutes (augmenté)
        refetchInterval: false, // Désactiver le refetch automatique par défaut
        refetchIntervalInBackground: false, // Ne pas rafraîchir en arrière-plan
        // Utiliser des placeholders pour éviter les états de chargement inutiles
        placeholderData: (previousData, context) => {
          // Vérifier si le contexte et la queryKey existent
          if (context && context.queryKey) {
            // Retourner les données précédentes du cache si disponibles
            return queryClient.getQueryData(context.queryKey) || previousData;
          }
          // Sinon, retourner les données précédentes
          return previousData;
        },
      },
    },
  }));

  // Rendre le queryClient disponible globalement pour les animations de déconnexion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.queryClient = {
        clear: async () => {
          queryClient.clear();
          return Promise.resolve();
        }
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.queryClient;
      }
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
