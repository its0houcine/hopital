'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Users, Activity } from 'lucide-react';

interface OptimizedDashboardStatsProps {
  id: number;
}

interface Stats {
  enAttente: number;
  enCours: number;
  consultationsDuJour: number;
  tempsMoyen: string;
}

export default function OptimizedDashboardStats({ id }: OptimizedDashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    enAttente: 0,
    enCours: 0,
    consultationsDuJour: 0,
    tempsMoyen: 'N/A'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(Date.now());

  // État pour suivre si les données sont fraîches
  const [isFresh, setIsFresh] = useState(true);

  // Effet pour récupérer les statistiques
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const timestamp = Date.now();
        const response = await fetch(`/api/medecins/${id}/stats?t=${timestamp}`, {
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
        setStats({
          enAttente: data.patientsEnAttente || 0,
          enCours: data.patientsEnCours || 0,
          consultationsDuJour: data.consultationsAujourdhui || 0,
          tempsMoyen: data.tempsMoyen || 'N/A'
        });
        setIsError(false);
        setError(null);
        setDataUpdatedAt(Date.now());
        setIsFresh(true);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setIsError(true);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Rafraîchir les statistiques toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [id]);

  // Effet pour gérer l'indicateur de fraîcheur des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFresh(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dataUpdatedAt]);

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

  // Afficher un message d'erreur si nécessaire
  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">
          Erreur lors du chargement des statistiques: {error instanceof Error ? error.message : 'Erreur inconnue'}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          // Afficher des cartes de chargement
          <>
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={`loading-${i}`}
                className="bg-white p-6 rounded-lg shadow-sm relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>

                {/* Effet de shimmer */}
                <motion.div
                  className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
                  animate={{
                    opacity: [0, 0.15, 0],
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </>
        ) : (
          // Afficher les statistiques réelles
          <>
            <StatCard
              title="En attente"
              value={stats.enAttente}
              icon={<Clock size={20} />}
              color="bg-gradient-to-r from-amber-500 to-amber-600"
              isFresh={isFresh}
              variants={itemVariants}
            />
            <StatCard
              title="En cours"
              value={stats.enCours}
              icon={<Activity size={20} />}
              color="bg-gradient-to-r from-green-500 to-green-600"
              isFresh={isFresh}
              variants={itemVariants}
            />
            <StatCard
              title="Consultations du jour"
              value={stats.consultationsDuJour}
              icon={<Calendar size={20} />}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              isFresh={isFresh}
              variants={itemVariants}
            />
            <StatCard
              title="Temps moyen"
              value={stats.tempsMoyen}
              icon={<Clock size={20} />}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
              isFresh={isFresh}
              variants={itemVariants}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  isFresh: boolean;
  variants: any;
}

function StatCard({ title, value, icon, color, isFresh, variants }: StatCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-sm relative overflow-hidden"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className={`p-2 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>

      {/* Indicateur de mise à jour */}
      <AnimatePresence>
        {isFresh && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-2 right-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet de shimmer lors de la mise à jour */}
      <AnimatePresence>
        {isFresh && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 0.1, x: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
