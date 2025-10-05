'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Users, Clock, Calendar, 
  TrendingUp, TrendingDown, BarChart3, PieChart
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Import dynamique de ReactApexChart pour éviter les erreurs SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Types pour les périodes
type Period = 'daily' | 'monthly' | 'yearly';

interface DetailedStatisticsProps {
  period?: Period;
  range?: number;
  medecinId?: number;
}

export default function DetailedStatistics({ 
  period = 'monthly', 
  range = 12,
  medecinId
}: DetailedStatisticsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<any>(null);
  const [durationData, setDurationData] = useState<any>(null);

  // Charger les données statistiques depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Construire l'URL avec les paramètres
        let statsUrl = `/api/statistics?period=${period}&range=${range}`;
        let durationUrl = `/api/statistics/consultation-duration?period=${period}&range=${range}`;
        
        // Ajouter le medecinId si fourni
        if (medecinId) {
          statsUrl += `&medecinId=${medecinId}`;
          durationUrl += `&medecinId=${medecinId}`;
        }
        
        // Charger les statistiques générales
        const statsResponse = await fetch(statsUrl);
        if (!statsResponse.ok) {
          throw new Error('Erreur lors de la récupération des statistiques');
        }
        const statsResult = await statsResponse.json();
        
        // Charger les données de durée des consultations
        const durationResponse = await fetch(durationUrl);
        if (!durationResponse.ok) {
          throw new Error('Erreur lors de la récupération des durées de consultation');
        }
        const durationResult = await durationResponse.json();
        
        // Mettre à jour les états
        setStatsData(statsResult);
        setDurationData(durationResult);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les statistiques détaillées');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [period, range, medecinId]);

  // Fonction pour obtenir les options du graphique
  function getChartOptions(title: string, colors: string[], labels: string[] = []): ApexOptions {
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
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '14px',
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
        className="bg-white rounded-xl shadow-sm p-4 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
            isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        </div>
        <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="w-10 h-10 border-4 border-elhassi1 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-600">Chargement des statistiques détaillées...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center">
        <div className="p-3 rounded-full bg-red-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">{error}</h3>
        <p className="text-sm text-gray-600 mb-4">Impossible de charger les données statistiques détaillées</p>
      </div>
    );
  }

  if (!statsData || !durationData) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          title="Patients"
          value={statsData.patients.total}
          change={statsData.patients.change}
          icon={<Users size={18} className="text-white" />}
          color="bg-elhassi1"
        />
        <StatCard
          title="Consultations"
          value={statsData.consultations.total}
          change={statsData.consultations.change}
          icon={<Activity size={18} className="text-white" />}
          color="bg-elhassi3"
        />
        <StatCard
          title="Durée (min)"
          value={durationData.duration.average}
          change={durationData.duration.change}
          icon={<Clock size={18} className="text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Visites/Jour"
          value={statsData.visits.average}
          change={statsData.visits.change}
          icon={<Calendar size={18} className="text-white" />}
          color="bg-blue-400"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Graphique des patients */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ReactApexChart
            options={getChartOptions('Patients', ['var(--color-elhassi1)'], statsData.labels)}
            series={[{ name: 'Patients', data: statsData.patients.data }]}
            type="area"
            height={200}
          />
        </div>

        {/* Graphique des consultations */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ReactApexChart
            options={getChartOptions('Consultations', ['var(--color-elhassi3)'], statsData.labels)}
            series={[{ name: 'Consultations', data: statsData.consultations.data }]}
            type="area"
            height={200}
          />
        </div>
      </div>

      {/* Graphique de la durée des consultations */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <ReactApexChart
          options={getChartOptions('Durée moyenne des consultations (minutes)', ['#3B82F6'], durationData.labels)}
          series={[{ name: 'Minutes', data: durationData.duration.data }]}
          type="area"
          height={200}
        />
      </div>
    </div>
  );
}
