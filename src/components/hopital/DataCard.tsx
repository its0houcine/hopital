'use client';

import { ChevronDownIcon } from "@/icons";
import { useEffect, useState } from "react";
import { getPatients } from "@/app/actions/patient";
import { getMedecins } from "@/app/actions/medecin";
import { getAllFileAttente } from "@/app/actions/fileAttente";

const DataCard = ({ type }: { type: string }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === "patient") {
          // Compter le nombre total de patients
          const result = await getPatients(1, 1); // On récupère juste la pagination
          if (result.success) {
            setCount(result.data.pagination.total);
          }
        } else if (type === "rendez-vous") {
          // Compter le nombre de patients dans la file d'attente
          const result = await getAllFileAttente();
          if (result.success) {
            setCount(result.data.length);
          }
        } else if (type === "medecin") {
          // Compter le nombre total de médecins
          const result = await getMedecins();
          if (result.success) {
            setCount(result.data.length);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="rounded-2xl bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <h1 className="text-white">
          {type === "patient"
            ? "Patients"
            : type === "rendez-vous"
            ? "Rendez-vous"
            : "Médecins"}
        </h1>
        <ChevronDownIcon className="text-white/90" />
      </div>
      <h1 className="text-2xl font-semibold my-2 text-white">
        {loading ? "..." : count}
      </h1>
    </div>
  );
};

export default DataCard;