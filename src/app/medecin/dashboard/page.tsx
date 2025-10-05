'use client';

import { useEffect, useState, Suspense } from 'react';
import CurrentPatient from '@/components/medecin/CurrentPatient';
import MedecinQueue from '@/components/medecin/MedecinQueue';
import EnhancedDashboardStats from '@/components/medecin/EnhancedDashboardStats';
import CurrentConsultation from '@/components/medecin/CurrentConsultation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// Composant de chargement pour le nom du médecin
const LoadingHeader = () => (
  <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
);

// Composant de chargement pour les stats
const LoadingStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
    ))}
  </div>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [medecinInfo, setMedecinInfo] = useState<any>(null);
  const [medecinId, setMedecinId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMedecinInfo = async () => {
      setIsLoading(true);
      try {
        // Si l'utilisateur est connecté et a un medecinId, l'utiliser
        if (user?.medecinId) {
          setMedecinId(user.medecinId);
          const res = await fetch(`/api/medecins/${user.medecinId}`);
          const data = await res.json();
          setMedecinInfo(data);
        } else {
          // Fallback sur un ID temporaire pour le développement
          const tempId = 1;
          setMedecinId(tempId);
          const res = await fetch(`/api/medecins/${tempId}`);
          const data = await res.json();
          setMedecinInfo(data);
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedecinInfo();
  }, [user]);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (!medecinId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 border-t-[var(--color-elhassi1)] rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* En-tête avec animation */}
      <motion.div variants={itemVariants}>
        {isLoading ? (
          <LoadingHeader />
        ) : (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] bg-clip-text text-transparent">
            Bonjour Dr. {medecinInfo?.prenom} {medecinInfo?.nom}
          </h1>
        )}
      </motion.div>

      {/* Stats avec Suspense */}
      <motion.div variants={itemVariants}>
        <Suspense fallback={<LoadingStats />}>
          <EnhancedDashboardStats id={medecinId} />
        </Suspense>
      </motion.div>

      {/* Grille principale avec hauteur fixe */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <Suspense
          fallback={
            <div className="h-[300px] bg-gray-200 rounded-lg animate-pulse" />
          }
        >
          <div className="h-[300px]">
            <CurrentPatient id={medecinId} />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="h-[300px] bg-gray-200 rounded-lg animate-pulse" />
          }
        >
          <div className="h-[300px]">
            <MedecinQueue id={medecinId} />
          </div>
        </Suspense>
      </motion.div>

      {/* Consultation en cours - pleine largeur */}
      <motion.div variants={itemVariants}>
        <Suspense
          fallback={
            <div className="w-full h-[200px] bg-gray-200 rounded-lg animate-pulse" />
          }
        >
          <CurrentConsultation id={medecinId} />
        </Suspense>
      </motion.div>
    </motion.div>
  );
}
