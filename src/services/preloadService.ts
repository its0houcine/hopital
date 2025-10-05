'use client';

/**
 * Service pour précharger les données fréquemment utilisées
 * afin d'améliorer les temps de chargement initiaux
 */

// Précharger les données des patients fréquemment consultés
export async function preloadFrequentPatients() {
  try {
    // Précharger uniquement la liste des patients récents sans précharger les profils individuels
    // Cela réduit considérablement le nombre de requêtes
    await fetch('/api/patients/recent?limit=5', {
      method: 'GET',
      cache: 'force-cache'
    }).catch(err => {
      console.warn('Erreur lors de la récupération des patients récents:', err);
    });

    console.log('Préchargement de la liste des patients récents terminé');
  } catch (error) {
    console.error('Erreur lors du préchargement des patients:', error);
  }
}

// Précharger les données des médecins
export async function preloadMedecins() {
  try {
    // Précharger uniquement la liste des médecins sans précharger les profils individuels
    // Cela réduit considérablement le nombre de requêtes
    await fetch('/api/medecins?limit=5', {
      method: 'GET',
      cache: 'force-cache'
    }).catch(err => {
      console.warn('Erreur lors de la récupération des médecins:', err);
    });

    console.log('Préchargement de la liste des médecins terminé');
  } catch (error) {
    console.error('Erreur lors du préchargement des médecins:', error);
  }
}

// Précharger les données du dashboard
export async function preloadDashboardData(role: string) {
  try {
    // Normaliser le rôle pour éviter les problèmes de casse
    const normalizedRole = role.toUpperCase();
    console.log(`Préchargement des données du dashboard pour le rôle: ${normalizedRole}`);

    // Précharger les données essentielles en fonction du rôle
    if (normalizedRole === 'MEDECIN') {
      // Pour les médecins, précharger la file d'attente et les données du dashboard
      const currentUser = await fetch('/api/auth/me').then(res => res.json()).catch(() => null);
      if (currentUser && currentUser.authenticated && currentUser.user && currentUser.user.medecinId) {
        const medecinId = currentUser.user.medecinId;
        const timestamp = Date.now();

        // Précharger en parallèle pour optimiser le temps de chargement
        const preloadPromises = [
          // File d'attente du médecin
          fetch(`/api/file-attente/medecin/${medecinId}?t=${timestamp}`, {
            method: 'GET',
            cache: 'no-store'
          }).catch(() => {}),

          // Statistiques du médecin pour le dashboard
          fetch(`/api/medecin/${medecinId}/stats?t=${timestamp}`, {
            method: 'GET',
            cache: 'no-store'
          }).catch(() => {}),

          // Consultations récentes pour le dashboard
          fetch(`/api/medecin/${medecinId}/consultations/recent?t=${timestamp}`, {
            method: 'GET',
            cache: 'no-store'
          }).catch(() => {})
        ];

        await Promise.allSettled(preloadPromises);
        console.log('Préchargement des données du dashboard médecin terminé');
      }
    }
    else if (normalizedRole === 'ADMIN' || normalizedRole === 'SUPER_ADMIN') {
      // Pour les admins, précharger les données du dashboard admin
      const timestamp = Date.now();

      // Précharger en parallèle pour optimiser le temps de chargement
      const preloadPromises = [
        // Données principales du dashboard
        fetch(`/api/admin/dashboard-data?t=${timestamp}`, {
          method: 'GET',
          cache: 'no-store'
        }).catch(() => {}),

        // Statistiques globales
        fetch(`/api/admin/stats?t=${timestamp}`, {
          method: 'GET',
          cache: 'no-store'
        }).catch(() => {}),

        // File d'attente globale
        fetch(`/api/file-attente?t=${timestamp}`, {
          method: 'GET',
          cache: 'no-store'
        }).catch(() => {})
      ];

      await Promise.allSettled(preloadPromises);
      console.log('Préchargement des données du dashboard admin terminé');
    }

    console.log(`Préchargement du dashboard terminé pour le rôle ${normalizedRole}`);
  } catch (error) {
    console.error('Erreur lors du préchargement du dashboard:', error);
  }
}

// Précharger les données communes (sans authentification)
export async function preloadCommonData() {
  console.log('Préchargement des données communes');

  try {
    // Précharger les ressources statiques
    const preloadPromises = [
      // Précharger le logo et les images communes
      fetch('/images/logo/logo-dark.svg', { method: 'GET', cache: 'force-cache' }).catch(() => {}),
      fetch('/images/grid.svg', { method: 'GET', cache: 'force-cache' }).catch(() => {}),

      // Précharger les styles et scripts
      fetch('/styles.css', { method: 'GET', cache: 'force-cache' }).catch(() => {}),

      // Précharger les données de base
      fetch('/api/health', { method: 'GET', cache: 'no-store' }).catch(() => {})
    ];

    await Promise.allSettled(preloadPromises);
    console.log('Préchargement des données communes terminé');
    return true;
  } catch (error) {
    console.error('Erreur lors du préchargement des données communes:', error);
    return false;
  }
}

// Importer le service de préchargement des routes
import { preloadRoutesByRole } from './dynamicRoutePreloadService';

/**
 * Précharge uniquement les données essentielles en fonction du rôle
 * Cette fonction est optimisée pour être rapide et ne charger que le strict nécessaire
 */
export async function preloadEssentialData(role: string): Promise<boolean> {
  if (!role) {
    console.log('Aucun rôle fourni, préchargement des données essentielles ignoré');
    return false;
  }

  // Normaliser le rôle pour éviter les problèmes de casse
  const normalizedRole = role.toUpperCase();
  console.log(`Préchargement des données essentielles pour le rôle: ${normalizedRole}`);

  try {
    // Précharger les données essentielles en fonction du rôle
    if (normalizedRole === 'MEDECIN') {
      // Pour les médecins, précharger uniquement la file d'attente qui est critique
      const currentUser = await fetch('/api/auth/me').then(res => res.json()).catch(() => null);
      if (currentUser && currentUser.authenticated && currentUser.user && currentUser.user.medecinId) {
        const medecinId = currentUser.user.medecinId;

        // Ajouter un timestamp pour éviter les problèmes de cache
        const timestamp = Date.now();
        await fetch(`/api/file-attente/medecin/${medecinId}?t=${timestamp}`, {
          method: 'GET',
          cache: 'no-store'
        }).catch(() => {});

        console.log('Préchargement de la file d\'attente du médecin terminé');
      }
    }
    else if (normalizedRole === 'ADMIN' || normalizedRole === 'SUPER_ADMIN') {
      // Pour les admins, précharger uniquement les données critiques du dashboard
      console.log('Préchargement des données essentielles admin');

      // Précharger les données minimales du dashboard
      await fetch('/api/admin/dashboard-data?minimal=true', {
        method: 'GET',
        cache: 'no-store'
      }).catch(() => {});
    }

    console.log('Préchargement des données essentielles terminé');
    return true;
  } catch (error) {
    console.error('Erreur lors du préchargement des données essentielles:', error);
    return false;
  }
}

// Fonction principale pour précharger toutes les données nécessaires
export async function preloadAllData(role?: string) {
  if (!role) {
    console.log('Aucun rôle fourni, préchargement des données communes uniquement');
    return await preloadCommonData();
  }

  // Normaliser le rôle pour éviter les problèmes de casse
  const normalizedRole = role.toUpperCase();
  console.log(`Démarrage du préchargement complet pour le rôle: ${normalizedRole}`);

  try {
    // Précharger les données communes d'abord (rapide)
    await preloadCommonData();

    // Précharger les données essentielles en fonction du rôle
    await preloadEssentialData(role);

    // Précharger les données du dashboard en priorité (important pour l'expérience utilisateur)
    console.log('Préchargement prioritaire des données du dashboard...');
    const dashboardPromise = preloadDashboardData(normalizedRole);

    // Précharger les routes en fonction du rôle (en parallèle)
    console.log('Préchargement des routes en parallèle...');
    const routePreloadPromise = preloadRoutesByRole(role);

    // Précharger des données supplémentaires spécifiques au rôle
    if (normalizedRole === 'MEDECIN') {
      // Données supplémentaires pour les médecins (patients récents, etc.)
      await preloadFrequentPatients();
    }
    else if (normalizedRole === 'ADMIN' || normalizedRole === 'SUPER_ADMIN') {
      // Données supplémentaires pour les admins
      const adminDataPromises = [
        fetch('/api/admin/medecins', {
          method: 'GET',
          cache: 'force-cache'
        }).catch(() => {}),

        // Précharger la liste des patients pour l'admin
        fetch('/api/patients?limit=10', {
          method: 'GET',
          cache: 'force-cache'
        }).catch(() => {})
      ];

      await Promise.allSettled(adminDataPromises);
    }

    // Attendre que le préchargement du dashboard soit terminé
    await dashboardPromise;

    // Attendre que le préchargement des routes soit terminé
    await routePreloadPromise;

    console.log('Préchargement complet terminé');
    return true;
  } catch (error) {
    console.error('Erreur lors du préchargement des données:', error);
    return false;
  }
}
