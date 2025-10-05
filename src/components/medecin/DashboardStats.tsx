'use client';

import { useEffect, useState } from 'react';

interface DashboardStatsProps {
  id: number;
}

interface Stats {
  enAttente: number;
  enCours: number;
  consultationsDuJour: number;
  tempsMoyen: string;
}

export default function DashboardStats({ id }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    enAttente: 0,
    enCours: 0,
    consultationsDuJour: 0,
    tempsMoyen: '--:--'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const timestamp = Date.now();
        const response = await fetch(`/api/medecins/${id}/stats?t=${timestamp}`);

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
        setError(null);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setError('Erreur lors de la récupération des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {error && (
        <div className="col-span-full bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        // Afficher des cartes de chargement
        <>
          {[1, 2, 3, 4].map((i) => (
            <div key={`loading-${i}`} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </>
      ) : (
        // Afficher les statistiques réelles
        <>
          <StatCard
            title="En attente"
            value={stats.enAttente}
          />
          <StatCard
            title="En cours"
            value={stats.enCours}
          />
          <StatCard
            title="Consultations du jour"
            value={stats.consultationsDuJour}
          />
          <StatCard
            title="Temps moyen"
            value={stats.tempsMoyen}
          />
        </>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}


