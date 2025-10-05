'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Activity, Users, Clock, Calendar, BarChart3, LineChart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Types pour les périodes
type Period = 'daily' | 'monthly' | 'yearly';

// Import dynamique de ReactApexChart pour éviter les erreurs SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Définition des types pour les données des graphiques
interface ChartData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  series: any[];
  options: ApexOptions;
}

export default function StatisticsChart() {
  const [activeChart, setActiveChart] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('monthly');
  const [range, setRange] = useState<number>(12);
  const [statsData, setStatsData] = useState<any>({
    period: 'monthly',
    labels: [],
    patients: { data: [], change: '+0%', total: 0 },
    consultations: { data: [], change: '+0%', total: 0 },
    duration: { data: [], change: '+0%', average: 0 },
    visits: { data: [], change: '+0%', average: 0 }
  });

  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Charger les données statistiques depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/statistics?period=${period}&range=${range}`);

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques');
        }

        const data = await response.json();
        setStatsData(data);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Réinitialiser le graphique actif lors du changement de période
    setActiveChart(0);
  }, [period, range]);

  // Obtenir le titre de la période
  const getPeriodTitle = () => {
    switch (period) {
      case 'daily':
        return 'jour';
      case 'monthly':
        return 'mois';
      case 'yearly':
        return 'année';
    }
  };

  // Définition des données des graphiques basées sur les données réelles
  const charts: ChartData[] = [
    {
      id: 1,
      title: `Patients par ${getPeriodTitle()}`,
      description: `Total: ${statsData.patients.total} patients (${statsData.patients.change})`,
      icon: <Users size={24} className="text-elhassi1" />,
      series: [
        {
          name: 'Patients',
          data: statsData.patients.data,
        }
      ],
      options: getChartOptions('Patients', ['var(--color-elhassi1)'], statsData.labels)
    },
    {
      id: 2,
      title: `Consultations par ${getPeriodTitle()}`,
      description: `Total: ${statsData.consultations.total} consultations (${statsData.consultations.change})`,
      icon: <Activity size={24} className="text-elhassi3" />,
      series: [
        {
          name: 'Consultations',
          data: statsData.consultations.data,
        }
      ],
      options: getChartOptions('Consultations', ['var(--color-elhassi3)'], statsData.labels)
    },
    {
      id: 3,
      title: 'Durée moyenne des consultations',
      description: `Moyenne: ${statsData.duration.average} minutes (${statsData.duration.change})`,
      icon: <Clock size={24} className="text-blue-500" />,
      series: [
        {
          name: 'Minutes',
          data: statsData.duration.data,
        }
      ],
      options: getChartOptions('Minutes', ['#3B82F6'], statsData.labels)
    },
    {
      id: 4,
      title: 'Visites quotidiennes moyennes',
      description: `Moyenne: ${statsData.visits.average} visites par jour (${statsData.visits.change})`,
      icon: <Calendar size={24} className="text-blue-400" />,
      series: [
        {
          name: 'Visites',
          data: statsData.visits.data,
        }
      ],
      options: getChartOptions('Visites', ['#60A5FA'], statsData.labels)
    }
  ];

  // Fonction pour générer les options du graphique
  function getChartOptions(name: string, colors: string[], months: string[] = []): ApexOptions {
    return {
      chart: {
        type: 'area',
        height: 350,
        fontFamily: 'Outfit, sans-serif',
        toolbar: {
          show: false,
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
        size: 0,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 6,
          sizeOffset: 3
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
        categories: months.length > 0 ? months : [
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

  // Fonction pour passer au graphique suivant
  const nextChart = () => {
    setActiveChart((prev) => (prev + 1) % charts.length);
  };

  // Fonction pour passer au graphique précédent
  const prevChart = () => {
    setActiveChart((prev) => (prev - 1 + charts.length) % charts.length);
  };

  // Effet pour le défilement automatique
  useEffect(() => {
    if (autoScroll) {
      autoScrollRef.current = setInterval(() => {
        nextChart();
      }, 8000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScroll, activeChart]);

  // Arrêter le défilement automatique lors de l'interaction
  const handleInteraction = () => {
    setAutoScroll(false);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    // Redémarrer le défilement automatique après 30 secondes d'inactivité
    setTimeout(() => {
      setAutoScroll(true);
    }, 30000);
  };

  return (
    <div
      className="relative overflow-hidden"
      ref={containerRef}
      onMouseEnter={handleInteraction}
    >
      {/* En-tête avec titre et navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Statistiques
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Visualisation des données clés
          </p>
        </div>

        {!isLoading && !error && (
          <div className="flex flex-wrap items-center gap-4">
            {/* Sélecteur de période */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setPeriod('daily')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === 'daily'
                    ? 'bg-elhassi1 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Jour
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === 'monthly'
                    ? 'bg-elhassi1 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setPeriod('yearly')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === 'yearly'
                    ? 'bg-elhassi1 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Année
              </button>
            </div>

            {/* Sélecteur de plage */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  if (period === 'daily') setRange(7);
                  else if (period === 'yearly') setRange(5);
                  else setRange(12);
                }}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  (period === 'daily' && range === 7) ||
                  (period === 'monthly' && range === 12) ||
                  (period === 'yearly' && range === 5)
                    ? 'bg-elhassi3 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'daily' ? '7 jours' : period === 'monthly' ? '12 mois' : '5 ans'}
              </button>
              <button
                onClick={() => {
                  if (period === 'daily') setRange(30);
                  else if (period === 'yearly') setRange(10);
                  else setRange(6);
                }}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  (period === 'daily' && range === 30) ||
                  (period === 'monthly' && range === 6) ||
                  (period === 'yearly' && range === 10)
                    ? 'bg-elhassi3 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'daily' ? '30 jours' : period === 'monthly' ? '6 mois' : '10 ans'}
              </button>
            </div>

            {/* Navigation des graphiques */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  prevChart();
                  handleInteraction();
                }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <div className="flex gap-1">
                {charts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveChart(index);
                      handleInteraction();
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeChart === index
                        ? 'w-6 bg-elhassi1'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  nextChart();
                  handleInteraction();
                }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}
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
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-elhassi1 text-white rounded-md hover:bg-elhassi3 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Conteneur des graphiques avec animation */}
      {!isLoading && !error && (
        <div className="relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChart}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-lg bg-blue-50 mr-3">
                  {charts[activeChart].icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-elhassi1">
                    {charts[activeChart].title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {charts[activeChart].description}
                  </p>
                </div>
              </div>

              <div className="h-[320px]">
                <ReactApexChart
                  options={charts[activeChart].options}
                  series={charts[activeChart].series}
                  type="area"
                  height="100%"
                  width="100%"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
