'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Users, Activity, RefreshCw } from 'lucide-react';

interface EnhancedDashboardStatsProps {
  id: number;
}

interface Stats {
  enAttente: number;
  enCours: number;
  consultationsDuJour: number;
  tempsMoyen: string;
}

export default function EnhancedDashboardStats({ id }: EnhancedDashboardStatsProps) {
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
  const [isFresh, setIsFresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

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
        setIsRefreshing(false);
      }
    };

    fetchStats();

    // Rafraîchir les statistiques toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [id, isRefreshing]);

  // Effet pour gérer l'indicateur de fraîcheur des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFresh(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dataUpdatedAt]);

  // Fonction pour rafraîchir manuellement les statistiques
  const handleRefresh = () => {
    setIsRefreshing(true);
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {isLoading && !isRefreshing ? (
          // Afficher des cartes de chargement avec effet de shimmer
          <>
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={`loading-${i}`}
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-x-full animate-shimmer" />
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded mt-2"></div>
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

      {/* Bouton de rafraîchissement */}
      <motion.button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-elhassi1 to-elhassi3 text-white shadow-lg z-10"
        onClick={handleRefresh}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isRefreshing ? { rotate: 360 } : {}}
        transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
      >
        <RefreshCw size={20} />
      </motion.button>
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
      className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden"
      variants={variants}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Effet de pulse quand les données sont fraîches */}
      {isFresh && (
        <motion.div
          className="absolute inset-0 bg-blue-100 opacity-30"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
      
      {/* Cercle décoratif */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
      
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${color} text-white shadow-md`}>
          {icon}
        </div>
      </div>
      
      <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {value}
      </p>
    </motion.div>
  );
}
