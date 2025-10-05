'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Users, Clock, Calendar,
  BarChart3, LineChart, Filter, RefreshCw,
  ChevronDown, Download, Printer
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useAuth } from '@/context/AuthContext';

// Import dynamique de ReactApexChart pour éviter les erreurs SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Types pour les périodes
type Period = 'daily' | 'monthly' | 'yearly';
type ChartType = 'area' | 'bar' | 'line';

// Composant de carte statistique
const StatCard = ({
  title,
  value,
  change,
  icon,
  color
}: {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}) => {
  const isPositive = change.startsWith('+');

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {change}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
};

// Composant principal de la page de statistiques
export default function StatisticsPage() {
  const { user, isSuperAdmin } = useAuth();
  const [period, setPeriod] = useState<Period>('monthly');
  const [range, setRange] = useState<number>(12);
  const [chartType, setChartType] = useState<ChartType>('area');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<any>({
    period: 'monthly',
    labels: [],
    patients: { data: [], change: '+0%', total: 0 },
    consultations: { data: [], change: '+0%', total: 0 },
    duration: { data: [], change: '+0%', average: 0 },
    visits: { data: [], change: '+0%', average: 0 }
  });
  const [durationData, setDurationData] = useState<any>({
    period: 'monthly',
    labels: [],
    duration: { data: [], change: '+0%', average: 0 }
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Charger les données statistiques depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Charger les statistiques générales
        let statsResult;
        try {
          const statsResponse = await fetch(`/api/statistics?period=${period}&range=${range}`);
          if (!statsResponse.ok) {
            const errorData = await statsResponse.json();
            throw new Error(errorData.error || 'Erreur lors de la récupération des statistiques');
          }
          statsResult = await statsResponse.json();
          setStatsData(statsResult);
        } catch (statsError) {
          console.error('Erreur statistiques:', statsError);
          // Utiliser des données par défaut pour les statistiques
          setStatsData({
            period,
            labels: [],
            patients: { data: [], change: '+0%', total: 0 },
            consultations: { data: [], change: '+0%', total: 0 },
            duration: { data: [], change: '+0%', average: 0 },
            visits: { data: [], change: '+0%', average: 0 }
          });
          // Ne pas lancer d'erreur ici pour permettre de continuer avec les données de durée
        }

        // Charger les données de durée des consultations
        let durationResult;
        try {
          const durationResponse = await fetch(`/api/statistics/consultation-duration?period=${period}&range=${range}`);
          if (!durationResponse.ok) {
            const errorData = await durationResponse.json();
            throw new Error(errorData.error || 'Erreur lors de la récupération des durées de consultation');
          }
          durationResult = await durationResponse.json();
          setDurationData(durationResult);
        } catch (durationError) {
          console.error('Erreur durées:', durationError);
          // Utiliser des données par défaut pour les durées
          setDurationData({
            period,
            labels: statsResult?.labels || [],
            duration: { data: [], change: '+0%', average: 0 }
          });
          // Ne pas lancer d'erreur ici pour permettre d'afficher au moins les statistiques générales
        }

      } catch (err) {
        console.error('Erreur générale:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [period, range]);

  // Fonction pour obtenir les options du graphique
  function getChartOptions(title: string, colors: string[], labels: string[] = []): ApexOptions {
    return {
      chart: {
        type: chartType,
        height: 350,
        fontFamily: 'Outfit, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      colors: colors,
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      markers: {
        size: 4,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          }
        },
        marker: {
          show: true,
        },
      },
      xaxis: {
        type: 'category',
        categories: labels.length > 0 ? labels : [
          'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
          'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px',
          },
          formatter: function (val) {
            return val.toFixed(0);
          }
        },
      },
      theme: {
        mode: 'light',
      }
    };
  }

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    setIsLoading(true);
    // Réinitialiser les états pour déclencher un nouveau chargement
    setStatsData({
      period: 'monthly',
      labels: [],
      patients: { data: [], change: '+0%', total: 0 },
      consultations: { data: [], change: '+0%', total: 0 },
      duration: { data: [], change: '+0%', average: 0 },
      visits: { data: [], change: '+0%', average: 0 }
    });
    setDurationData({
      period: 'monthly',
      labels: [],
      duration: { data: [], change: '+0%', average: 0 }
    });
  };

  // Fonction pour exporter les données
  const exportData = () => {
    const dataStr = JSON.stringify({
      statistics: statsData,
      consultationDuration: durationData
    }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `statistiques_${period}_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="w-full">
      {/* En-tête avec titre et filtres */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Statistiques avancées
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analyse détaillée des données de l'application
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Bouton de rafraîchissement */}
          <button
            onClick={refreshData}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw size={20} className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {/* Bouton d'export */}
          <button
            onClick={exportData}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            <Download size={20} className="text-gray-600" />
          </button>

          {/* Bouton de filtre */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-elhassi1 text-white rounded-lg hover:bg-elhassi3 transition-colors"
            >
              <Filter size={16} />
              <span>Filtres</span>
              <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Panneau de filtres */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10"
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Période</h3>
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setPeriod('daily')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          period === 'daily'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Jour
                      </button>
                      <button
                        onClick={() => setPeriod('monthly')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          period === 'monthly'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Mois
                      </button>
                      <button
                        onClick={() => setPeriod('yearly')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          period === 'yearly'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Année
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Plage</h3>
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => {
                          if (period === 'daily') setRange(7);
                          else if (period === 'yearly') setRange(5);
                          else setRange(12);
                        }}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          (period === 'daily' && range === 7) ||
                          (period === 'monthly' && range === 12) ||
                          (period === 'yearly' && range === 5)
                            ? 'bg-elhassi3 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {period === 'daily' ? '7j' : period === 'monthly' ? '12m' : '5a'}
                      </button>
                      <button
                        onClick={() => {
                          if (period === 'daily') setRange(30);
                          else if (period === 'yearly') setRange(10);
                          else setRange(6);
                        }}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          (period === 'daily' && range === 30) ||
                          (period === 'monthly' && range === 6) ||
                          (period === 'yearly' && range === 10)
                            ? 'bg-elhassi3 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {period === 'daily' ? '30j' : period === 'monthly' ? '6m' : '10a'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Type de graphique</h3>
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setChartType('area')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          chartType === 'area'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Aire
                      </button>
                      <button
                        onClick={() => setChartType('line')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          chartType === 'line'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Ligne
                      </button>
                      <button
                        onClick={() => setChartType('bar')}
                        className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors ${
                          chartType === 'bar'
                            ? 'bg-elhassi1 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Barre
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* État de chargement */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="w-12 h-12 border-4 border-elhassi1 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="p-3 rounded-full bg-red-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{error}</h3>
          <p className="text-gray-600 mb-4">Impossible de charger les données statistiques</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-elhassi1 text-white rounded-md hover:bg-elhassi3 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Contenu principal */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Patients"
              value={statsData.patients.total}
              change={statsData.patients.change}
              icon={<Users size={24} className="text-white" />}
              color="bg-elhassi1"
            />
            <StatCard
              title="Total Consultations"
              value={statsData.consultations.total}
              change={statsData.consultations.change}
              icon={<Activity size={24} className="text-white" />}
              color="bg-elhassi3"
            />
            <StatCard
              title="Durée Moyenne (min)"
              value={durationData.duration.average}
              change={durationData.duration.change}
              icon={<Clock size={24} className="text-white" />}
              color="bg-blue-500"
            />
            <StatCard
              title="Visites Quotidiennes"
              value={statsData.visits.average}
              change={statsData.visits.change}
              icon={<Calendar size={24} className="text-white" />}
              color="bg-blue-400"
            />
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graphique des patients */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <ReactApexChart
                options={getChartOptions('Évolution des patients', ['var(--color-elhassi1)'], statsData.labels)}
                series={[{ name: 'Patients', data: statsData.patients.data }]}
                type={chartType}
                height={350}
              />
            </div>

            {/* Graphique des consultations */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <ReactApexChart
                options={getChartOptions('Évolution des consultations', ['var(--color-elhassi3)'], statsData.labels)}
                series={[{ name: 'Consultations', data: statsData.consultations.data }]}
                type={chartType}
                height={350}
              />
            </div>

            {/* Graphique de la durée des consultations */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <ReactApexChart
                options={getChartOptions('Durée moyenne des consultations', ['#3B82F6'], durationData.labels)}
                series={[{ name: 'Minutes', data: durationData.duration.data }]}
                type={chartType}
                height={350}
              />
            </div>

            {/* Graphique des visites quotidiennes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <ReactApexChart
                options={getChartOptions('Visites quotidiennes moyennes', ['#60A5FA'], statsData.labels)}
                series={[{ name: 'Visites', data: statsData.visits.data }]}
                type={chartType}
                height={350}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
