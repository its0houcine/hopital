'use client';

/**
 * Service amélioré pour précharger les routes de l'application
 * avec un suivi précis de la progression de compilation
 */

// Interface pour définir une route avec sa priorité
interface RouteConfig {
  path: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

// Liste des routes admin à précharger avec priorités
const ADMIN_ROUTES: RouteConfig[] = [
  // Dashboards et pages principales - priorité haute
  { path: '/', priority: 'high', description: 'Dashboard principal' },
  { path: '/dashboard', priority: 'high', description: 'Dashboard alternatif' },
  { path: '/patients', priority: 'high', description: 'Liste des patients' },
  { path: '/medecins', priority: 'high', description: 'Liste des médecins' },

  // Pages secondaires - priorité moyenne
  { path: '/stat', priority: 'medium', description: 'Statistiques' },
  { path: '/file-attente', priority: 'medium', description: 'File d\'attente' },

  // Pages moins fréquentes - priorité basse
  { path: '/parametres', priority: 'low', description: 'Paramètres' },
  { path: '/profile', priority: 'low', description: 'Profil utilisateur' },
];

// Liste des routes super admin à précharger avec priorités
const SUPER_ADMIN_ROUTES: RouteConfig[] = [
  // Toutes les routes admin
  ...ADMIN_ROUTES,

  // Pages spécifiques super admin - priorité haute
  { path: '/administration', priority: 'high', description: 'Administration (super admin uniquement)' },
  { path: '/admins', priority: 'high', description: 'Gestion des administrateurs' },

  // Pages secondaires super admin - priorité moyenne
  { path: '/system', priority: 'medium', description: 'Paramètres système' },
  { path: '/logs', priority: 'medium', description: 'Journaux système' },
];

// Liste des routes médecin à précharger avec priorités
const MEDECIN_ROUTES: RouteConfig[] = [
  // Dashboards et pages principales - priorité haute
  { path: '/medecin/dashboard', priority: 'high', description: 'Dashboard médecin' },
  { path: '/medecin/file-attente', priority: 'high', description: 'File d\'attente médecin' },
  { path: '/medecin/consultations', priority: 'high', description: 'Consultations en cours' },

  // Pages secondaires - priorité moyenne
  { path: '/medecin/patients', priority: 'medium', description: 'Liste des patients du médecin' },
  { path: '/medecin/historique', priority: 'medium', description: 'Historique des consultations' },

  // Pages moins fréquentes - priorité basse
  { path: '/medecin/profile', priority: 'low', description: 'Profil du médecin' },
  { path: '/medecin/parametres', priority: 'low', description: 'Paramètres du médecin' },
];

// Type pour la fonction de callback de progression
export type ProgressCallback = (progress: number, route: string, status: 'loading' | 'success' | 'error') => void;

// Type pour le statut de compilation
export interface CompilationStatus {
  isCompiling: boolean;
  progress?: number;
  userRole?: string;
  routes: {
    total: number;
    completed: number;
    failed: number;
    pending?: number;
  };
  currentRoute?: string;
  elapsedTime?: number;
  startTime?: number;
  errors?: string[];
}

// Stockage des routes déjà préchargées pour éviter les doublons
const preloadedRoutes = new Set<string>();

/**
 * Vérifie si une route a déjà été préchargée
 */
function isRoutePreloaded(route: string): boolean {
  return preloadedRoutes.has(route);
}

/**
 * Précharge une route en créant une requête fetch
 * qui force Next.js à compiler la page
 */
async function preloadRoute(routeConfig: RouteConfig) {
  const { path: route, priority, description } = routeConfig;

  // Vérifier si la route a déjà été préchargée
  if (isRoutePreloaded(route)) {
    console.log(`⏭️ Route déjà préchargée, ignorée: ${route} (${description})`);
    return { success: true, alreadyLoaded: true };
  }

  try {
    // Ajouter un timestamp pour éviter la mise en cache du navigateur
    const timestamp = Date.now();
    const urlWithTimestamp = `${route}${route.includes('?') ? '&' : '?'}_preload=${timestamp}`;

    // Notifier le serveur du début de la compilation pour cette route
    await fetch('/api/system/compilation-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        route,
        status: 'loading',
        priority
      })
    }).catch(() => {});

    // Utiliser fetch avec cache pour précharger la route
    const response = await fetch(urlWithTimestamp, {
      method: 'HEAD',
      cache: 'no-store', // Éviter la mise en cache pour s'assurer que la route est compilée
      headers: {
        'x-preload': 'true',
        'x-priority': priority,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

    // Marquer la route comme préchargée
    preloadedRoutes.add(route);

    // Notifier le serveur de la fin de la compilation pour cette route
    await fetch('/api/system/compilation-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        route,
        success: response.status >= 200 && response.status < 400,
        priority
      })
    }).catch(() => {});

    // Vérifier si la route a été préchargée avec succès
    if (response.status >= 200 && response.status < 400) {
      console.log(`✅ Route préchargée: ${route} (${description}) - Priorité: ${priority}`);
      return { success: true, alreadyLoaded: false };
    } else {
      console.warn(`⚠️ Préchargement de la route ${route} (${description}) a retourné un statut ${response.status}`);
      return { success: false, alreadyLoaded: false };
    }
  } catch (error) {
    // Notifier le serveur de l'échec de la compilation pour cette route
    await fetch('/api/system/compilation-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        route,
        success: false,
        priority
      })
    }).catch(() => {});

    console.warn(`❌ Erreur lors du préchargement de la route ${route} (${description}):`, error);
    return { success: false, alreadyLoaded: false };
  }
}

/**
 * Trie les routes par priorité pour charger d'abord les plus importantes
 */
function sortRoutesByPriority(routes: RouteConfig[]): RouteConfig[] {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return [...routes].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Précharge toutes les routes admin avec suivi de progression et priorités
 */
export async function preloadAdminRoutes(onProgress?: ProgressCallback) {
  console.log('🔄 Préchargement des routes admin...');

  // Trier les routes par priorité
  const sortedRoutes = sortRoutesByPriority(ADMIN_ROUTES);

  // Notifier le serveur du début de la compilation
  await fetch('/api/system/compilation-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'start',
      totalRoutes: sortedRoutes.length,
      userRole: 'ADMIN'
    })
  }).catch(() => {});

  let completedRoutes = 0;
  let alreadyLoadedRoutes = 0;
  const totalRoutes = sortedRoutes.length;

  // Précharger les routes par priorité
  for (let i = 0; i < sortedRoutes.length; i++) {
    const routeConfig = sortedRoutes[i];
    try {
      // Notifier le callback que la route est en cours de chargement
      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'loading');
      }

      const result = await preloadRoute(routeConfig);

      // Mettre à jour la progression
      completedRoutes++;
      if (result.alreadyLoaded) {
        alreadyLoadedRoutes++;
      }

      const progress = Math.round((completedRoutes / totalRoutes) * 100);

      if (onProgress) {
        onProgress(progress, routeConfig.path, result.success ? 'success' : 'error');
      }

      console.log(`Route ${i+1}/${totalRoutes} préchargée: ${routeConfig.path} (${progress}%)`);

      // Petit délai pour éviter de surcharger le serveur, plus court pour les routes déjà chargées
      await new Promise(resolve => setTimeout(resolve, result.alreadyLoaded ? 10 : 50));

    } catch (error) {
      completedRoutes++;

      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'error');
      }
    }
  }

  console.log(`✅ Préchargement des routes admin terminé (${alreadyLoadedRoutes} déjà chargées)`);
  return { successful: completedRoutes, total: totalRoutes, alreadyLoaded: alreadyLoadedRoutes };
}

/**
 * Précharge toutes les routes super admin avec suivi de progression et priorités
 */
export async function preloadSuperAdminRoutes(onProgress?: ProgressCallback) {
  console.log('🔄 Préchargement des routes super admin...');

  // Trier les routes par priorité
  const sortedRoutes = sortRoutesByPriority(SUPER_ADMIN_ROUTES);

  // Notifier le serveur du début de la compilation
  await fetch('/api/system/compilation-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'start',
      totalRoutes: sortedRoutes.length,
      userRole: 'SUPER_ADMIN'
    })
  }).catch(() => {});

  let completedRoutes = 0;
  let alreadyLoadedRoutes = 0;
  const totalRoutes = sortedRoutes.length;

  // Précharger les routes par priorité
  for (let i = 0; i < sortedRoutes.length; i++) {
    const routeConfig = sortedRoutes[i];
    try {
      // Notifier le callback que la route est en cours de chargement
      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'loading');
      }

      const result = await preloadRoute(routeConfig);

      // Mettre à jour la progression
      completedRoutes++;
      if (result.alreadyLoaded) {
        alreadyLoadedRoutes++;
      }

      const progress = Math.round((completedRoutes / totalRoutes) * 100);

      if (onProgress) {
        onProgress(progress, routeConfig.path, result.success ? 'success' : 'error');
      }

      console.log(`Route ${i+1}/${totalRoutes} préchargée: ${routeConfig.path} (${progress}%)`);

      // Petit délai pour éviter de surcharger le serveur, plus court pour les routes déjà chargées
      await new Promise(resolve => setTimeout(resolve, result.alreadyLoaded ? 10 : 50));

    } catch (error) {
      completedRoutes++;

      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'error');
      }
    }
  }

  console.log(`✅ Préchargement des routes super admin terminé (${alreadyLoadedRoutes} déjà chargées)`);
  return { successful: completedRoutes, total: totalRoutes, alreadyLoaded: alreadyLoadedRoutes };
}

/**
 * Précharge toutes les routes médecin avec suivi de progression et priorités
 */
export async function preloadMedecinRoutes(onProgress?: ProgressCallback) {
  console.log('🔄 Préchargement des routes médecin...');

  // Trier les routes par priorité
  const sortedRoutes = sortRoutesByPriority(MEDECIN_ROUTES);

  // Notifier le serveur du début de la compilation
  await fetch('/api/system/compilation-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'start',
      totalRoutes: sortedRoutes.length,
      userRole: 'MEDECIN'
    })
  }).catch(() => {});

  let completedRoutes = 0;
  let alreadyLoadedRoutes = 0;
  const totalRoutes = sortedRoutes.length;

  // Précharger les routes par priorité
  for (let i = 0; i < sortedRoutes.length; i++) {
    const routeConfig = sortedRoutes[i];
    try {
      // Notifier le callback que la route est en cours de chargement
      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'loading');
      }

      const result = await preloadRoute(routeConfig);

      // Mettre à jour la progression
      completedRoutes++;
      if (result.alreadyLoaded) {
        alreadyLoadedRoutes++;
      }

      const progress = Math.round((completedRoutes / totalRoutes) * 100);

      if (onProgress) {
        onProgress(progress, routeConfig.path, result.success ? 'success' : 'error');
      }

      console.log(`Route ${i+1}/${totalRoutes} préchargée: ${routeConfig.path} (${progress}%)`);

      // Petit délai pour éviter de surcharger le serveur, plus court pour les routes déjà chargées
      await new Promise(resolve => setTimeout(resolve, result.alreadyLoaded ? 10 : 50));

    } catch (error) {
      completedRoutes++;

      if (onProgress) {
        onProgress(Math.round((completedRoutes / totalRoutes) * 100), routeConfig.path, 'error');
      }
    }
  }

  console.log(`✅ Préchargement des routes médecin terminé (${alreadyLoadedRoutes} déjà chargées)`);
  return { successful: completedRoutes, total: totalRoutes, alreadyLoaded: alreadyLoadedRoutes };
}

/**
 * Précharge les routes en fonction du rôle de l'utilisateur avec suivi de progression
 * Optimisé pour charger d'abord les routes prioritaires et attendre la fin de toutes les précompilations
 */
export async function preloadRoutesByRole(role: string, onProgress?: ProgressCallback) {
  if (!role) {
    console.log('⚠️ Aucun rôle fourni, aucune route préchargée');
    return { successful: 0, total: 0, alreadyLoaded: 0 };
  }

  // Vérifier si le navigateur est en ligne
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.warn('⚠️ Navigateur hors ligne, préchargement des routes annulé');
    return { successful: 0, total: 0, alreadyLoaded: 0, offline: true };
  }

  const normalizedRole = role.toUpperCase();
  console.log(`🔄 Démarrage du préchargement des routes pour le rôle: ${normalizedRole}`);

  try {
    // Réinitialiser le statut de compilation au démarrage
    await fetch('/api/system/compilation-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'reset'
      })
    }).catch(() => {});

    // Précharger les routes en fonction du rôle
    let result;
    if (normalizedRole === 'MEDECIN') {
      console.log('🔄 Préchargement des routes pour médecin...');
      result = await preloadMedecinRoutes(onProgress);
    } else if (normalizedRole === 'SUPER_ADMIN') {
      console.log('🔄 Préchargement des routes pour super admin...');
      result = await preloadSuperAdminRoutes(onProgress);
    } else if (normalizedRole === 'ADMIN') {
      console.log('🔄 Préchargement des routes pour admin...');
      result = await preloadAdminRoutes(onProgress);
    } else {
      console.warn(`⚠️ Rôle non reconnu: ${normalizedRole}, aucune route préchargée`);
      return { successful: 0, total: 0, alreadyLoaded: 0 };
    }

    // Attendre que toutes les compilations soient terminées
    const maxWaitTime = 15000; // 15 secondes maximum d'attente
    const startTime = Date.now();
    let isCompilationComplete = false;

    while (!isCompilationComplete && (Date.now() - startTime) < maxWaitTime) {
      // Vérifier le statut de compilation
      const status = await getCompilationStatus();

      // Si la compilation est terminée ou s'il n'y a pas de routes à compiler, sortir de la boucle
      if (!status.isCompiling ||
          (status.routes.total > 0 &&
           (status.routes.completed + status.routes.failed) >= status.routes.total)) {
        isCompilationComplete = true;
        break;
      }

      // Attendre un court délai avant de vérifier à nouveau
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Vérifier une dernière fois le statut de compilation
    const finalStatus = await getCompilationStatus();
    console.log('Statut final de compilation après attente:', finalStatus);

    // Ajouter des informations sur le statut de compilation au résultat
    return {
      successful: result?.successful || 0,
      total: result?.total || 0,
      alreadyLoaded: result?.alreadyLoaded || 0,
      compilationComplete: isCompilationComplete,
      compilationStatus: finalStatus,
      elapsedTime: Date.now() - startTime
    };
  } catch (error) {
    console.error('❌ Erreur lors du préchargement des routes:', error);
    return { successful: 0, total: 0, alreadyLoaded: 0 };
  }
}

/**
 * Récupère le statut actuel de la compilation depuis le serveur
 */
export async function getCompilationStatus(): Promise<CompilationStatus> {
  try {
    const response = await fetch('/api/system/compilation-status', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return await response.json() as CompilationStatus;
  } catch (error) {
    console.error('Erreur lors de la récupération du statut de compilation:', error);
    // Retourner un statut par défaut en cas d'erreur
    return {
      isCompiling: false,
      progress: 0,
      currentRoute: '',
      routes: { total: 0, completed: 0, failed: 0 },
      errors: []
    };
  }
}
