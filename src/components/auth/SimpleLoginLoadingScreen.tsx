'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { preloadCommonData, preloadEssentialData } from '@/services/preloadService';
import { preloadRoutesByRole, getCompilationStatus } from '@/services/dynamicRoutePreloadService';
import { useCompilationStatus } from '@/hooks/useCompilationStatus';

interface LoginLoadingScreenProps {
  isVisible: boolean;
  userRole?: string | null;
  userName?: string | null;
  isStartup?: boolean;
  onLoadingComplete?: () => void;
}

// Phases de chargement
enum LoadingPhase {
  INIT = 0,                // Initialisation
  CONTEXT = 1,             // Récupération du contexte utilisateur (0-30%)
  ESSENTIAL_DATA = 2,      // Chargement des données essentielles (30-50%)
  COMPILATION = 3,         // Précompilation des pages (50-90%)
  FINALIZATION = 4,        // Finalisation (90-100%)
  COMPLETE = 5             // Chargement terminé (100%)
}

export default function SimpleLoginLoadingScreen({
  isVisible,
  userRole = null,
  userName = null,
  isStartup = false,
  onLoadingComplete
}: LoginLoadingScreenProps) {
  // États principaux
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>(LoadingPhase.INIT);
  const [message, setMessage] = useState("Initialisation...");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { user } = useAuth();

  // Références pour suivre l'état du chargement
  const loadingCompleteRef = useRef(false);
  const compilationStartTimeRef = useRef(0);
  const phaseProgressRef = useRef<Record<LoadingPhase, { min: number; max: number }>>({
    [LoadingPhase.INIT]: { min: 0, max: 0 },
    [LoadingPhase.CONTEXT]: { min: 0, max: 20 },
    [LoadingPhase.ESSENTIAL_DATA]: { min: 20, max: 40 },
    [LoadingPhase.COMPILATION]: { min: 40, max: 95 },
    [LoadingPhase.FINALIZATION]: { min: 95, max: 100 },
    [LoadingPhase.COMPLETE]: { min: 100, max: 100 }
  });

  // Utiliser notre hook pour suivre le statut de compilation
  const {
    status: compilationStatus,
    errors: compilationErrors
  } = useCompilationStatus({
    enabled: isVisible && loadingPhase === LoadingPhase.COMPILATION,
    pollingInterval: 250 // Polling plus fréquent pour une meilleure réactivité
  });

  // Fonction pour calculer la progression dans une phase spécifique
  const calculatePhaseProgress = useCallback((phase: LoadingPhase, phaseProgress: number) => {
    const { min, max } = phaseProgressRef.current[phase];
    return min + (phaseProgress / 100) * (max - min);
  }, []);

  // Fonction pour passer à la phase suivante
  const advanceToNextPhase = useCallback((nextPhase: LoadingPhase, initialMessage: string) => {
    setLoadingPhase(nextPhase);
    setMessage(initialMessage);

    // Définir la progression initiale pour cette phase
    const initialProgress = phaseProgressRef.current[nextPhase]?.min || 0;
    setProgress(initialProgress);

    return initialProgress;
  }, []);

  // Déterminer le message de bienvenue final
  const getWelcomeMessage = useCallback(() => {
    const role = userRole || user?.role;
    const name = userName || (user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : user?.email) || '';

    if (role === 'MEDECIN') {
      return `Accès à votre espace médecin, Dr. ${name}. Bonne journée !`;
    } else if (role === 'ADMIN') {
      return `Accès à votre espace administrateur, ${name}. Bonne journée !`;
    } else if (role === 'SUPER_ADMIN') {
      return `Accès à votre espace super administrateur, ${name}. Bonne journée !`;
    } else if (name) {
      return `Accès à votre espace personnel, ${name}. Bonne journée !`;
    } else {
      return "Bienvenue sur ELhassi. Bonne journée !";
    }
  }, [userRole, user, userName]);

  // Gérer l'affichage du message de bienvenue à la fin du chargement
  useEffect(() => {
    if (loadingPhase === LoadingPhase.COMPLETE && !showWelcomeMessage) {
      // Attendre un court délai pour s'assurer que la barre est bien à 100%
      const welcomeTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
        setMessage(getWelcomeMessage());

        // Émettre un événement personnalisé pour indiquer que le chargement est terminé
        if (!loadingCompleteRef.current) {
          loadingCompleteRef.current = true;
          console.log('✅ Chargement terminé, émission de l\'événement loadingComplete');

          // Émettre un événement personnalisé
          const event = new CustomEvent('loadingComplete');
          window.dispatchEvent(event);

          // Appeler le callback si fourni (après un court délai pour montrer le message de bienvenue)
          if (onLoadingComplete) {
            // Vérifier une dernière fois le statut de compilation avant de rediriger
            setTimeout(async () => {
              try {
                // Vérifier si la compilation est bien terminée
                const finalStatus = await getCompilationStatus();

                // Si la compilation est toujours en cours, attendre un peu plus
                if (finalStatus.isCompiling &&
                    finalStatus.routes.total > 0 &&
                    (finalStatus.routes.completed + finalStatus.routes.failed) < finalStatus.routes.total) {

                  console.log('⏳ Compilation toujours en cours, attente supplémentaire avant redirection...');

                  // Attendre encore un peu (max 2 secondes) pour que la compilation se termine
                  const maxWaitTime = 2000;
                  const startTime = Date.now();

                  while (finalStatus.isCompiling &&
                         (Date.now() - startTime) < maxWaitTime &&
                         (finalStatus.routes.completed + finalStatus.routes.failed) < finalStatus.routes.total) {
                    // Attendre un court délai
                    await new Promise(resolve => setTimeout(resolve, 200));

                    // Vérifier à nouveau le statut
                    const updatedStatus = await getCompilationStatus();
                    if (!updatedStatus.isCompiling ||
                        (updatedStatus.routes.completed + updatedStatus.routes.failed) >= updatedStatus.routes.total) {
                      break;
                    }
                  }
                }

                // Rediriger l'utilisateur
                console.log('✅ Redirection vers l\'espace utilisateur...');
                onLoadingComplete();
              } catch (error) {
                console.error('❌ Erreur lors de la vérification finale de compilation:', error);
                // En cas d'erreur, rediriger quand même
                onLoadingComplete();
              }
            }, 3000); // Attendre 3 secondes pour que l'utilisateur puisse voir le message de bienvenue
          }
        }
      }, 500); // Délai légèrement plus long pour s'assurer que tout est bien chargé

      return () => clearTimeout(welcomeTimer);
    }
  }, [loadingPhase, showWelcomeMessage, getWelcomeMessage]);

  // Effet principal pour gérer le flux de chargement
  useEffect(() => {
    if (!isVisible) {
      // Réinitialiser l'état si l'écran n'est pas visible
      setProgress(0);
      setLoadingPhase(LoadingPhase.INIT);
      setShowWelcomeMessage(false);
      loadingCompleteRef.current = false;
      return;
    }

    // Démarrer le processus de chargement
    const startLoading = async () => {
      try {
        // Phase 1: Récupération du contexte utilisateur (0-20%)
        advanceToNextPhase(LoadingPhase.CONTEXT, "Récupération du contexte utilisateur...");

        // Simuler la récupération du contexte avec une progression fluide
        const contextInterval = setInterval(() => {
          setProgress(prev => {
            const maxContextProgress = phaseProgressRef.current[LoadingPhase.CONTEXT].max;
            if (prev < maxContextProgress - 2) {
              return prev + 0.5;
            } else {
              clearInterval(contextInterval);
              return maxContextProgress - 2;
            }
          });
        }, 30);

        // Attendre un court délai pour simuler la récupération du contexte
        await new Promise(resolve => setTimeout(resolve, 600));
        clearInterval(contextInterval);

        // Phase 2: Chargement des données essentielles (20-40%)
        advanceToNextPhase(LoadingPhase.ESSENTIAL_DATA, "Chargement des ressources essentielles...");

        // Préchargement réel des données communes
        const role = userRole || user?.role;
        console.log('Préchargement avec rôle:', role);

        // Précharger les données communes (images, styles, etc.)
        await preloadCommonData();
        setProgress(calculatePhaseProgress(LoadingPhase.ESSENTIAL_DATA, 50));

        // Précharger les données essentielles en fonction du rôle
        if (role) {
          await preloadEssentialData(role);
        }
        setProgress(calculatePhaseProgress(LoadingPhase.ESSENTIAL_DATA, 100));

        // Phase 3: Précompilation des pages (40-95%)
        const compilationMessage = isStartup ? "Précompilation des pages..." : "Chargement des pages...";
        advanceToNextPhase(LoadingPhase.COMPILATION, compilationMessage);
        compilationStartTimeRef.current = Date.now();

        // Précharger les routes en fonction du rôle
        if (role) {
          try {
            // Réinitialiser le statut de compilation
            await fetch('/api/system/compilation-status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                action: 'reset'
              })
            }).catch(() => {});

            // Progression initiale pour montrer que le processus a commencé
            setProgress(calculatePhaseProgress(LoadingPhase.COMPILATION, 5));

            // Démarrer le préchargement des routes et attendre qu'il soit terminé
            console.log('🔄 Démarrage du préchargement des routes...');

            // Message initial de compilation
            const roleDisplay = role.toUpperCase() === 'MEDECIN'
              ? 'médecin'
              : role.toUpperCase() === 'SUPER_ADMIN'
                ? 'super administrateur'
                : 'administrateur';

            setMessage(`Préparation de la compilation des pages ${roleDisplay}...`);

            // Précharger toutes les routes en fonction du rôle
            const result = await preloadRoutesByRole(role);
            console.log('✅ Préchargement terminé:', result);

            // Vérifier si toutes les routes ont été préchargées
            if (result.total > 0) {
              const successRate = (result.successful / result.total) * 100;
              console.log(`Taux de succès du préchargement: ${successRate.toFixed(2)}%`);

              if (successRate < 90) {
                console.warn(`⚠️ Certaines routes n'ont pas été préchargées correctement (${result.successful}/${result.total})`);
              }
            }

            // Vérifier le statut final de compilation
            const finalStatus = 'compilationStatus' in result ? result.compilationStatus : await getCompilationStatus();

            // S'assurer que la barre de progression reflète l'état réel de la compilation
            if (finalStatus && finalStatus.routes && finalStatus.routes.total > 0) {
              const compiledPercentage = Math.min(100, Math.round(
                ((finalStatus.routes.completed + finalStatus.routes.failed) / finalStatus.routes.total) * 100
              ));

              // Mettre à jour la progression en fonction du statut réel
              const adjustedProgress = calculatePhaseProgress(LoadingPhase.COMPILATION, compiledPercentage);
              setProgress(adjustedProgress);

              // Afficher un message de succès avec le nombre de pages compilées
              setMessage(`Compilation terminée: ${finalStatus.routes.completed} pages ${finalStatus.userRole ? finalStatus.userRole.toLowerCase() : ''} compilées`);
            } else {
              // Si aucune information n'est disponible, utiliser une valeur par défaut
              setProgress(calculatePhaseProgress(LoadingPhase.COMPILATION, 95));
            }

          } catch (error) {
            console.error('❌ Erreur lors du préchargement des routes:', error);
            // En cas d'erreur, continuer avec une progression par défaut
            setProgress(calculatePhaseProgress(LoadingPhase.COMPILATION, 90));
          }
        } else {
          // Si aucun rôle n'est défini, simuler une progression
          for (let i = 40; i <= 90; i += 10) {
            setProgress(calculatePhaseProgress(LoadingPhase.COMPILATION, i));
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }

        // Phase 4: Finalisation (95-100%)
        advanceToNextPhase(LoadingPhase.FINALIZATION, "Finalisation de votre espace de travail...");

        // Progression rapide jusqu'à 100%
        setProgress(calculatePhaseProgress(LoadingPhase.FINALIZATION, 50));
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(calculatePhaseProgress(LoadingPhase.FINALIZATION, 100));

        // Phase 5: Chargement terminé (100%)
        setProgress(100);
        setLoadingPhase(LoadingPhase.COMPLETE);
        console.log('✅ Toutes les phases de chargement sont terminées');

      } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);

        // En cas d'erreur, passer directement à la finalisation
        advanceToNextPhase(LoadingPhase.FINALIZATION, "Finalisation (avec quelques erreurs)...");

        // Progression forcée jusqu'à 100% après un court délai
        setTimeout(() => {
          setProgress(100);
          setLoadingPhase(LoadingPhase.COMPLETE);
        }, 800);
      }
    };

    // Démarrer le processus de chargement si nous sommes en phase d'initialisation
    if (loadingPhase === LoadingPhase.INIT) {
      startLoading();
    }

    // Pas besoin de nettoyer quoi que ce soit ici car les intervalles sont gérés à l'intérieur des fonctions
  }, [isVisible, loadingPhase, userRole, user?.role, isStartup, advanceToNextPhase, calculatePhaseProgress]);

  // Effet pour mettre à jour la progression en fonction du statut de compilation
  useEffect(() => {
    if (loadingPhase !== LoadingPhase.COMPILATION || !compilationStatus) return;

    // Mettre à jour la progression en fonction du statut de compilation
    if (compilationStatus.routes && compilationStatus.routes.total > 0) {
      // Calculer la progression réelle basée sur les routes compilées
      const compilationProgress = Math.min(
        100,
        Math.round((compilationStatus.routes.completed + compilationStatus.routes.failed) /
                   compilationStatus.routes.total * 100)
      );

      // Mettre à jour la progression globale
      const newProgress = calculatePhaseProgress(LoadingPhase.COMPILATION, compilationProgress);
      setProgress(newProgress);

      // Mettre à jour le message en fonction de la route en cours
      if (compilationStatus.currentRoute && compilationStatus.currentRoute.trim() !== '') {
        const routeName = compilationStatus.currentRoute.split('/').pop() || compilationStatus.currentRoute;
        const actionText = isStartup ? "Précompilation" : "Chargement";

        // Afficher le type de page en cours de compilation en fonction du rôle
        let pageType = "";
        if (compilationStatus.userRole) {
          if (compilationStatus.userRole.toUpperCase() === 'MEDECIN') {
            pageType = "médecin";
          } else if (compilationStatus.userRole.toUpperCase() === 'SUPER_ADMIN') {
            pageType = "super admin";
          } else if (compilationStatus.userRole.toUpperCase() === 'ADMIN') {
            pageType = "admin";
          }
        }

        setMessage(`${actionText} de la page ${pageType ? pageType + ' ' : ''}${routeName}`);
      }
    }
  }, [compilationStatus, loadingPhase, isStartup, calculatePhaseProgress]);

  // Ne rien afficher si l'écran n'est pas visible
  if (!isVisible) return null;

  // Obtenir les informations utilisateur de manière sécurisée
  const getUserInitial = (): string => {
    if (userName) return userName.charAt(0);
    if (user?.prenom) return user.prenom.charAt(0);
    if (user?.nom) return user.nom.charAt(0);
    return 'U';
  };

  const getUserDisplayName = (): string => {
    if (userName) return userName;
    if (user?.prenom && user?.nom) return `${user.prenom} ${user.nom}`;
    if (user?.email) return user.email;
    return 'Utilisateur';
  };

  const getUserRoleDisplay = (): string => {
    if (userRole === 'MEDECIN') return 'Médecin';
    if (userRole === 'ADMIN') return 'Administrateur';
    if (userRole === 'SUPER_ADMIN') return 'Super Administrateur';
    return 'Utilisateur';
  };

  // Obtenir le message de statut en fonction de la phase de chargement
  const getStatusMessage = (): string => {
    if (showWelcomeMessage) {
      return "Redirection vers votre espace personnel...";
    }

    switch (loadingPhase) {
      case LoadingPhase.CONTEXT:
        return "Récupération de vos informations personnelles...";
      case LoadingPhase.ESSENTIAL_DATA:
        return "Chargement des ressources essentielles...";
      case LoadingPhase.COMPILATION:
        if (compilationStatus?.isCompiling) {
          // Afficher le type d'utilisateur dont les pages sont en cours de compilation
          let userTypeText = "";
          if (compilationStatus.userRole) {
            if (compilationStatus.userRole.toUpperCase() === 'MEDECIN') {
              userTypeText = "médecin";
            } else if (compilationStatus.userRole.toUpperCase() === 'SUPER_ADMIN') {
              userTypeText = "super administrateur";
            } else if (compilationStatus.userRole.toUpperCase() === 'ADMIN') {
              userTypeText = "administrateur";
            }
          }

          const routeInfo = compilationStatus.currentRoute
            ? `${compilationStatus.currentRoute.split('/').pop() || compilationStatus.currentRoute}`
            : "préparation...";

          return `Compilation des pages ${userTypeText ? userTypeText + ' ' : ''}en cours: ${routeInfo}`;
        } else if (compilationStatus?.routes?.total && compilationStatus.routes.total > 0) {
          return `Compilation terminée: ${compilationStatus.routes.completed || 0}/${compilationStatus.routes.total} pages`;
        }
        return "Compilation des pages...";
      case LoadingPhase.FINALIZATION:
        return "Finalisation de votre espace de travail...";
      default:
        return "Préparation de votre espace de travail...";
    }
  };



  // Ne rien afficher si l'écran n'est pas visible
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-[#0a4b91] via-[#1a5fa3] to-[#3a7bd5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Formes géométriques flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercle 1 */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-[#0077b6] to-[#48cae4] opacity-30 blur-lg"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: '10%', left: '10%' }}
        />

        {/* Cercle 2 */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#023e8a] to-[#0077b6] opacity-30 blur-lg"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />

        {/* Effet de grille PlayStation */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20"></div>
      </div>

      {/* Header avec logo */}
      <motion.div
        className="w-full bg-black/20 backdrop-blur-md p-6 flex items-center justify-between border-b border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center">
          <Image
            src="/images/logo/logo-dark.svg"
            alt="ELhassi Logo"
            width={60}
            height={60}
            className="mr-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <h1 className="text-white text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">ELhassi</h1>
        </div>

        <AnimatePresence>
          {loadingPhase >= LoadingPhase.ESSENTIAL_DATA && (
            <motion.div
              className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0077b6] to-[#0096c7] flex items-center justify-center text-white font-bold mr-3 shadow-lg">
                {getUserInitial()}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {getUserDisplayName()}
                </span>
                <span className="text-white/70 text-xs">
                  {getUserRoleDisplay()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Image
            src="/images/logo/logo-dark.svg"
            alt="ELhassi Logo"
            width={180}
            height={180}
            className="drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showWelcomeMessage ? 'welcome' : 'loading'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {showWelcomeMessage ? (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </motion.svg>
                  </motion.div>
                  <motion.p
                    className="text-white text-xl font-medium text-center mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {message}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.p
                  className="text-white text-xl font-medium text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                >
                  {message}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {!showWelcomeMessage && (
              <motion.div
                className="relative"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Barre de progression avec effet de shimmer */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0077b6] to-[#48cae4] shadow-[0_0_10px_rgba(72,202,228,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Effet de shimmer */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                      repeatDelay: 0.5
                    }}
                    style={{
                      clipPath: `inset(0 0 0 ${100 - Math.min(100, progress)}%)`
                    }}
                  />
                </motion.div>

                <motion.div
                  className="mt-2 flex justify-between text-white/70 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <span>Progression</span>
                  <span>{`${Math.round(progress)}%`}</span>
                </motion.div>

                {/* Afficher les détails de compilation si disponibles */}
                {loadingPhase === LoadingPhase.COMPILATION && compilationStatus && compilationStatus.routes.total > 0 && (
                  <motion.div
                    className="mt-2 text-white/60 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {compilationStatus.userRole && (
                      <div className="flex justify-between mb-1">
                        <span>Type d'interface:</span>
                        <span className="font-medium text-white/80">
                          {compilationStatus.userRole.toUpperCase() === 'MEDECIN'
                            ? 'Médecin'
                            : compilationStatus.userRole.toUpperCase() === 'SUPER_ADMIN'
                              ? 'Super Admin'
                              : 'Admin'}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Pages compilées:</span>
                      <span>{`${compilationStatus.routes.completed}/${compilationStatus.routes.total}`}</span>
                    </div>
                    {compilationStatus.elapsedTime && (
                      <div className="flex justify-between mt-1">
                        <span>Temps écoulé:</span>
                        <span>{`${Math.round(compilationStatus.elapsedTime / 1000)}s`}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Afficher les erreurs de compilation s'il y en a */}
                {compilationErrors.length > 0 && (
                  <motion.div
                    className="mt-3 text-red-300 text-xs bg-red-900/30 p-2 rounded-md backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="font-medium mb-1">Avertissements ({compilationErrors.length}):</div>
                    <div className="max-h-20 overflow-y-auto">
                      {compilationErrors.slice(0, 3).map((error, index) => (
                        <div key={index} className="text-xs mb-1 opacity-80">{error}</div>
                      ))}
                      {compilationErrors.length > 3 && (
                        <div className="text-xs italic opacity-70">
                          {`+ ${compilationErrors.length - 3} autres avertissements...`}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showWelcomeMessage ? 'welcome-footer' : `loading-phase-${loadingPhase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/50 text-sm text-center max-w-md"
          >
            {getStatusMessage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
