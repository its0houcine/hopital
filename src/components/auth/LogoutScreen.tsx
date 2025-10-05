'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoutScreenProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export default function LogoutScreen({
  isVisible,
  onAnimationComplete
}: LogoutScreenProps) {
  const [progress, setProgress] = useState(0);

  const [message, setMessage] = useState("Déconnexion en cours...");
  const [phase, setPhase] = useState(1);

  // Effet pour masquer immédiatement l'interface lors de la déconnexion
  useEffect(() => {
    if (isVisible) {
      // Masquer le scroll et figer l'interface dès que la déconnexion commence
      document.body.style.overflow = 'hidden';

      // Ajouter une classe pour masquer tous les éléments d'interface sauf l'écran de déconnexion
      document.body.classList.add('logout-in-progress');
    } else {
      // Restaurer le scroll et l'interface quand la déconnexion est terminée
      document.body.style.overflow = '';
      document.body.classList.remove('logout-in-progress');

      // Réinitialiser l'état
      setProgress(0);
      setPhase(1);
      setMessage("Déconnexion en cours...");
    }

    // Nettoyer l'effet lors du démontage du composant
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('logout-in-progress');
    };
  }, [isVisible]);

  // Phase 1: Initialisation et nettoyage de la session (0-50%)
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    // Simuler le nettoyage de la session côté client
    const cleanupInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 50) {
          return prev + 2;
        } else {
          clearInterval(cleanupInterval);
          setPhase(2);
          setMessage("Fermeture de votre session...");
          return 50;
        }
      });
    }, 40);

    return () => clearInterval(cleanupInterval);
  }, [isVisible]);

  // Phase 2: Fermeture de la session (50-100%)
  useEffect(() => {
    if (!isVisible || phase !== 2) return;

    // Effectuer la déconnexion côté serveur et nettoyer les données
    const performLogout = async () => {
      try {
        // Nettoyer les caches et les données locales
        const cleanupTasks = [];

        // 1. Nettoyer les caches de requêtes (si React Query est utilisé)
        if (window.queryClient) {
          cleanupTasks.push(window.queryClient.clear());
        }

        // 2. Nettoyer le localStorage (sauf les préférences de thème)
        const themePreference = localStorage.getItem('theme-preference');
        cleanupTasks.push(
          new Promise(resolve => {
            // Sauvegarder les préférences de thème
            const keysToKeep = ['theme-preference'];

            // Obtenir toutes les clés du localStorage
            const keys = Object.keys(localStorage);

            // Supprimer toutes les clés sauf celles à conserver
            keys.forEach(key => {
              if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key);
              }
            });

            resolve(true);
          })
        );

        // 3. Nettoyer le sessionStorage
        cleanupTasks.push(
          new Promise(resolve => {
            sessionStorage.clear();
            resolve(true);
          })
        );

        // 4. Réinitialiser les états globaux (si nécessaire)
        // Cette partie est gérée par le contexte d'authentification

        // Exécuter toutes les tâches de nettoyage en parallèle
        await Promise.all(cleanupTasks);

        // Appel API pour la déconnexion (déjà géré par le contexte d'authentification)
        // Cette partie est simulée ici pour l'animation
        await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});

      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };

    // Lancer la déconnexion
    performLogout();

    // Progression visuelle de la phase 2
    const phase2Interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 2.5;
        } else {
          clearInterval(phase2Interval);

          console.log('Animation de déconnexion à 100%, préparation de la redirection...');

          // Attendre que l'animation soit complètement terminée
          // avant d'appeler le callback de fin d'animation
          setTimeout(() => {
            console.log('Exécution du callback de fin d\'animation');

            // S'assurer que tous les éléments de l'interface sont masqués
            // avant de rediriger vers la page de login
            document.body.style.overflow = 'hidden';

            // Appeler le callback qui va rediriger vers la page de login
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }, 800);

          return 100;
        }
      });
    }, 40);

    return () => clearInterval(phase2Interval);
  }, [isVisible, phase, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col bg-gradient-to-br from-[#0a4b91] via-[#1a5fa3] to-[#3a7bd5]"
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

        {/* Triangle */}
        <motion.div
          className="absolute w-80 h-80 opacity-30 blur-lg"
          style={{
            background: 'linear-gradient(45deg, #0096c7, #4361ee)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            bottom: '20%',
            left: '30%'
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
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
          <motion.h2
            className="text-2xl font-bold text-white text-center mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            key={message} // Ajouter une clé pour animer les transitions entre messages
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {message}
          </motion.h2>

          <div className="relative">
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
            </motion.div>

            <motion.div
              className="mt-2 flex justify-between text-white/70 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span>Progression</span>
              <span>{`${progress}%`}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          key={`message-${phase}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-white/50 text-sm text-center max-w-md"
        >
          {phase === 1 ? "Nettoyage des données en cours..." : "À bientôt !"}
        </motion.p>
      </div>
    </motion.div>
  );
}
