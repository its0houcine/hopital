'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Surveiller les changements de route
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleStart = () => {
      // Ajouter un petit délai pour éviter les flashs sur les navigations rapides
      timeout = setTimeout(() => setIsLoading(true), 100);
    };

    const handleComplete = () => {
      clearTimeout(timeout);
      setIsLoading(false);
    };

    // Ajouter les écouteurs d'événements pour la navigation
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    // Simuler un chargement initial pour les routes préchargées
    handleStart();
    handleComplete();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loading-indicator"
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-elhassi1 to-elhassi3"
          initial={{ width: '0%', opacity: 1 }}
          animate={{
            width: ['0%', '30%', '60%', '80%'],
            opacity: 1,
            transition: {
              duration: 1.5,
              ease: 'easeInOut',
              times: [0, 0.3, 0.6, 0.9]
            }
          }}
          exit={{
            width: '100%',
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
        />
      )}
    </AnimatePresence>
  );
}
