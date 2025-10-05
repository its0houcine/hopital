'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useFileAttente } from "@/hooks/useFileAttente";
import { deleteFileAttente } from "@/app/actions/fileAttente";
import { useEffect } from 'react';

interface TableClientProps {
  fileAttente: any[];
}

export default function TableClient({ fileAttente }: TableClientProps) {
  const { fileAttente: storeFileAttente, updateFileAttente, removeFromFileAttente } = useFileAttente();

  // Nous n'avons plus besoin de l'EventSource car nous utilisons les actions serveur
  // et les données sont passées directement via les props

  const handleDelete = async (id: number, patientId: number) => {
    const confirmed = confirm("Voulez-vous retirer ce patient de la file d'attente ?");
    if (!confirmed) return;

    try {
      // Mise à jour optimiste avec removeFromFileAttente
      removeFromFileAttente(patientId);

      const result = await deleteFileAttente(id);

      if (!result.success) {
        // En cas d'échec, on restaure l'état précédent
        updateFileAttente(fileAttente);
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      // En cas d'erreur, on restaure l'état précédent
      updateFileAttente(fileAttente);
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  // Utiliser les données du store pour l'affichage
  const displayFileAttente = fileAttente || storeFileAttente;

  // Déboguer les données
  console.log("Données affichées dans TableClient:", displayFileAttente);

  return (
    <>
      {displayFileAttente.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[250px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="text-gray-500 font-medium">File d'attente vide</p>
          <p className="text-gray-400 text-sm mt-1">Aucun patient en attente</p>
        </div>
      ) : (
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="w-1/5 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 sticky top-0 bg-white z-10">
                Position
              </TableCell>
              <TableCell isHeader className="w-1/5 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 sticky top-0 bg-white z-10">
                Patient
              </TableCell>
              <TableCell isHeader className="w-1/5 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 sticky top-0 bg-white z-10">
                Médecin
              </TableCell>
              <TableCell isHeader className="w-1/5 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 sticky top-0 bg-white z-10">
                Statut
              </TableCell>
              <TableCell isHeader className="w-1/5 px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 sticky top-0 bg-white z-10">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayFileAttente.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell className="px-5 py-4 sm:px-6 text-start">
              {index + 1}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    width={40}
                    height={40}
                    src={row.patient.photo || "/images/default-avatar.png"}
                    alt={`${row.patient.nom} ${row.patient.prenom}`}
                  />
                </div>
                <div>
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {row.patient.nom} {row.patient.prenom}
                  </span>
                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {row.patient.telephone || "N/A"}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {row.medecin ? `Dr. ${row.medecin.nom} ${row.medecin.prenom}` : "Aucun"}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              <Badge
                size="sm"
                color={
                  row.statut === "EN_ATTENTE"
                    ? "warning"
                    : row.statut === "EN_COURS"
                    ? "success"
                    : "error"
                }
              >
                {row.statut === "EN_ATTENTE"
                  ? "En attente"
                  : row.statut === "EN_COURS"
                  ? "En cours"
                  : "Terminé"}
              </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <button
                onClick={() => handleDelete(row.id, row.patient.id)}
                className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Annuler
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      )}
    </>
  );
}











