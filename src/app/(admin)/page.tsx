
'use client';

import { useEffect, useState } from "react";
import DataCard from "@/components/hopital/DataCard";
import Tables from "@/components/hopital/Tables";
import { Calendar } from "@/components/ui/calendar";
import AffichageD from "@/components/hopital/affichageD";
import StatisticsChart from "@/components/hopital/StatisticsChart";
import { useAuth } from "@/context/AuthContext";

const AdminPage = () => {
  const { user, isLoading } = useAuth();

  // État pour contrôler le rafraîchissement global
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Effet pour le rafraîchissement global des données
  useEffect(() => {
    // Rafraîchir toutes les 60 secondes au lieu de 30
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-6 flex-col lg:flex-row w-full">
        {/* GAUCHE */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap">
            <h3 className="text-lg text-gray-800 dark:text-white">
              Bonjour, <span className="font-bold text-xl text-elhassi1">
                {isLoading ? "..." : (user ? `${user.prenom} ${user.nom}` : "Utilisateur")}!
              </span>
            </h3>
          </div>

          {/* Cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <DataCard type="patient" />
            <DataCard type="rendez-vous" />
            <DataCard type="medecin" />
          </div>

          {/* Table */}
          <Tables refreshTrigger={refreshTrigger} />
        </div>

        {/* DROITE */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 mt-12 p-2">
          {/* Agenda */}
          <div className="w-full rounded-lg shadow-lg overflow-hidden p-4 bg-[url('/images/top-view-blue-textile-carnival.png')] bg-cover bg-center bg-no-repeat">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <h1 className="text-2xl font-semibold text-white">Agenda</h1>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="w-[300px]">
                <Calendar />
              </div>
            </div>
          </div>

          {/* En attente + consultation */}
          <AffichageD type="attente" refreshTrigger={refreshTrigger} />
          <AffichageD type="consultation" refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Statistiques - Prend toute la largeur */}
      <div className="w-full mt-6 rounded-lg shadow-lg overflow-hidden bg-white p-4">
        <StatisticsChart />
      </div>
    </div>
  );
};

export default AdminPage;
