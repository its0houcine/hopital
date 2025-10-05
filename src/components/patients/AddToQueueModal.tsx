"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useFileAttente } from "@/hooks/useFileAttente";

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
}

interface AddToQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: number;
    nom: string;
    prenom: string;
  };
  medecins: Medecin[];
}

export default function AddToQueueModal({ isOpen, onClose, patient, medecins }: AddToQueueModalProps) {
  const [selectedMedecin, setSelectedMedecin] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const { fileAttente, addToFileAttente } = useFileAttente();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedecin) {
      alert("Veuillez sélectionner un médecin");
      return;
    }

    setIsLoading(true);
    const selectedMedecinData = medecins.find(m => m.id === selectedMedecin);

    if (!selectedMedecinData) {
      alert("Le médecin sélectionné n'est pas valide");
      setIsLoading(false);
      return;
    }

    // Créer un ID temporaire négatif pour l'entrée optimiste
    const optimisticEntry = {
      id: Math.floor(Math.random() * -1000) - 1,
      patient: patient,
      medecin: selectedMedecinData,
      statut: 'EN_ATTENTE' as const,
      ordre: (fileAttente[fileAttente.length - 1]?.ordre || 0) + 1
    };

    try {
      // Mise à jour optimiste
      addToFileAttente(optimisticEntry);

      // Vérifier que les valeurs sont valides
      const patientId = Number(patient.id);
      const medecinId = Number(selectedMedecin);

      if (isNaN(patientId) || patientId <= 0) {
        throw new Error("ID du patient invalide");
      }

      if (isNaN(medecinId) || medecinId <= 0) {
        throw new Error("ID du médecin invalide");
      }

      console.log("Ajout du patient à la file d'attente:", {
        patientId,
        medecinId,
        patientIdOriginal: patient.id,
        medecinIdOriginal: selectedMedecin
      });

      // Ajouter un timestamp pour éviter la mise en cache
      const timestamp = new Date().getTime();

      const response = await fetch(`/api/file-attente?_t=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        },
        body: JSON.stringify({
          patientId,
          medecinId
        }),
      });

      console.log("Statut de la réponse:", response.status);
      console.log("Type de contenu:", response.headers.get('content-type'));

      // Récupérer le texte de la réponse pour le débogage
      const responseText = await response.text();
      console.log("Réponse brute:", responseText.substring(0, 100) + (responseText.length > 100 ? '...' : ''));

      // Vérifier si la réponse est OK
      if (!response.ok) {
        console.error("Réponse d'erreur:", responseText);

        // Essayer de parser le JSON si possible
        let errorMessage = `Erreur HTTP: ${response.status} ${response.statusText}`;

        try {
          if (responseText && responseText.trim().startsWith('{')) {
            const errorData = JSON.parse(responseText);
            if (errorData.error) {
              errorMessage = errorData.error;
            }
          }
        } catch (parseError) {
          console.error("Erreur lors du parsing de l'erreur:", parseError);
        }

        throw new Error(errorMessage);
      }

      // Parser le JSON
      let newFileAttenteItem;
      try {
        // Si la réponse est vide, c'est une erreur
        if (!responseText.trim()) {
          throw new Error("Réponse vide du serveur");
        }

        newFileAttenteItem = JSON.parse(responseText);

        // Vérifier que la réponse contient les données attendues
        if (!newFileAttenteItem || !newFileAttenteItem.id) {
          throw new Error("Format de réponse invalide");
        }
      } catch (parseError) {
        console.error("Erreur lors du parsing JSON:", parseError);
        console.error("Réponse non valide:", responseText.substring(0, 200));
        throw new Error("Format de réponse invalide");
      }

      console.log("Nouvel élément de file d'attente:", newFileAttenteItem);

      // Mise à jour avec les vraies données
      addToFileAttente({
        id: newFileAttenteItem.id,
        patient: patient,
        medecin: selectedMedecinData,
        statut: 'EN_ATTENTE' as const,
        ordre: newFileAttenteItem.ordre || optimisticEntry.ordre
      }, optimisticEntry.id);

      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout à la file d'attente:", error);
      // Rollback de l'optimistic update
      addToFileAttente(null, optimisticEntry.id);

      // Afficher un message d'erreur plus convivial
      const errorMessage = error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de l'ajout à la file d'attente.";

      // Utiliser une alerte plus conviviale
      alert(`Impossible d'ajouter le patient à la file d'attente: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-xl font-semibold text-gray-800 flex items-center">
          <span className="w-2 h-6 bg-gradient-to-b from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] rounded-sm mr-2"></span>
          Ajouter à la file d'attente
        </h4>

        <div className="mb-6">
          <div className="p-4 bg-blue-50 rounded-lg mb-4 border border-blue-100">
            <p className="text-blue-800 font-medium">Patient</p>
            <p className="text-blue-700 text-lg">{patient.nom} {patient.prenom}</p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner un médecin
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)]"
            value={selectedMedecin}
            onChange={(e) => setSelectedMedecin(Number(e.target.value) || "")}
            required
          >
            <option value="">Sélectionner un médecin</option>
            {medecins.map((medecin) => (
              <option key={medecin.id} value={medecin.id}>
                Dr. {medecin.nom} {medecin.prenom}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ajout en cours...
              </span>
            ) : "Ajouter à la file d'attente"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

















