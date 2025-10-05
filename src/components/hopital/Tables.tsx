'use client';

import { useEffect, useState } from "react";
import TableWrapper from "./TableWrapper";
import { getAllFileAttente } from "@/app/actions/fileAttente";
import { getMedecins } from "@/app/actions/medecin";

interface TablesProps {
  refreshTrigger?: number;
}

export default function Tables({ refreshTrigger = 0 }: TablesProps) {
  const [fileAttente, setFileAttente] = useState<any[]>([]);
  const [medecins, setMedecins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Récupération de la file d'attente
        const fileAttenteResult = await getAllFileAttente();
        if (fileAttenteResult.success && fileAttenteResult.data) {
          setFileAttente(fileAttenteResult.data || []);
        }

        // Récupération des médecins
        const medecinsResult = await getMedecins();
        if (medecinsResult.success && medecinsResult.data) {
          setMedecins(medecinsResult.data || []);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Pas besoin d'intervalle ici, on utilise refreshTrigger
    return () => {};
  }, [refreshTrigger]); // Dépendance sur refreshTrigger pour rafraîchir les données

  // Calcul des compteurs
  const enAttente = fileAttente.filter(f => f.statut === 'EN_ATTENTE').length;
  const enCours = fileAttente.filter(f => f.statut === 'EN_COURS').length;

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-white p-4">
      {loading ? (
        <div className="flex justify-center items-center h-[330px]">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-elhassi1)] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Chargement de la file d'attente...</p>
          </div>
        </div>
      ) : (
        <TableWrapper
          fileAttente={fileAttente}
          initialCounts={{
            enAttente,
            enCours
          }}
          medecins={medecins}
        />
      )}
    </div>
  );
}
