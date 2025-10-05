'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Routes admin à précharger
const ADMIN_ROUTES = [
  '/',
  '/patients',
  '/medecins'
];

// Routes médecin à précharger
const MEDECIN_ROUTES = [
  '/medecin/dashboard'
];

interface ComponentPreloaderProps {
  role: string;
}

/**
 * Composant invisible qui précharge les composants dynamiques
 * en fonction du rôle de l'utilisateur
 */
export default function ComponentPreloader({ role }: ComponentPreloaderProps) {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fonction pour précharger les routes
    const preloadRoutes = () => {
      try {
        console.log(`Préchargement des routes pour le rôle: ${role}`);

        // Déterminer les routes à précharger en fonction du rôle
        const routes = role === 'medecin' ? MEDECIN_ROUTES : ADMIN_ROUTES;

        // Précharger les routes en utilisant le router de Next.js
        routes.forEach(route => {
          try {
            // Utiliser prefetch du router Next.js
            router.prefetch(route);
            console.log(`Route préchargée: ${route}`);
          } catch (err) {
            console.warn(`Erreur lors du préchargement de la route ${route}:`, err);
          }
        });

        setIsPreloaded(true);
        console.log(`Préchargement des routes terminé pour le rôle: ${role}`);
      } catch (error) {
        console.error('Erreur lors du préchargement des routes:', error);
      }
    };

    if (role && !isPreloaded) {
      // Utiliser setTimeout pour éviter de bloquer le rendu initial
      setTimeout(() => {
        preloadRoutes();
      }, 2000); // Augmenter le délai pour s'assurer que le router est prêt
    }
  }, [role, isPreloaded, router]);

  // Ce composant ne rend rien, il est uniquement utilisé pour le préchargement
  return null;
}
