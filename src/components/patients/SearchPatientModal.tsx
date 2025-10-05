"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { Patient } from "@/types";
import Button from "@/components/ui/button/Button";

interface SearchPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: Patient) => void;
  onCreateNew: () => void;
}

export default function SearchPatientModal({
  isOpen,
  onClose,
  onSelectPatient,
  onCreateNew,
}: SearchPatientModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const searchPatients = async () => {
      if (searchTerm.length < 2) {
        setPatients([]);
        return;
      }

      // Annuler la requête précédente si elle existe
      if (abortController.current) {
        abortController.current.abort();
      }

      // Créer un nouveau controller pour cette requête
      abortController.current = new AbortController();

      setIsLoading(true);
      try {
        console.log("Recherche de patients avec le terme:", searchTerm);

        const response = await fetch(
          `/api/patients/search?term=${encodeURIComponent(searchTerm)}`,
          {
            signal: abortController.current.signal,
            headers: {
              'Accept': 'application/json'
            },
            method: 'GET'
          }
        );

        console.log("Statut de la réponse:", response.status);
        console.log("Type de contenu:", response.headers.get('content-type'));

        if (!response.ok) {
          if (response.status === 500) {
            console.error("Erreur serveur 500");
            setPatients([]);
            return;
          }
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error("Type de contenu non valide:", contentType);
          setPatients([]);
          return;
        }

        const text = await response.text();
        console.log("Réponse brute:", text.substring(0, 100) + (text.length > 100 ? '...' : ''));

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("Erreur lors du parsing JSON:", parseError);
          console.error("Réponse non valide:", text.substring(0, 200));
          setPatients([]);
          return;
        }

        if (Array.isArray(data)) {
          console.log(`${data.length} patients trouvés`);
          setPatients(data);
        } else if (data.error) {
          console.error("Erreur API:", data.error);
          setPatients([]);
        } else {
          console.error("Format de réponse inattendu:", data);
          setPatients([]);
        }
      } catch (error) {
        // Ignorer les erreurs d'abort
        if (error.name !== 'AbortError') {
          console.error("Erreur lors de la recherche:", error);
          setPatients([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Réduire le délai de debounce à 200ms
    const timeoutId = setTimeout(searchPatients, 200);
    return () => {
      clearTimeout(timeoutId);
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [searchTerm]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-6">
      <div className="mb-8">
        <h4 className="mb-2 text-lg font-medium text-gray-800 dark:text-white/90">
          Rechercher un patient
        </h4>
        <input
          type="text"
          placeholder="Nom, prénom ou numéro de téléphone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-6 max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-4">Recherche en cours...</div>
        ) : patients.length > 0 ? (
          <div className="space-y-2">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => onSelectPatient(patient)}
              >
                <div className="font-medium">
                  {patient.nom} {patient.prenom}
                </div>
                {patient.telephone && (
                  <div className="text-sm text-gray-500">{patient.telephone}</div>
                )}
              </div>
            ))}
          </div>
        ) : searchTerm.length >= 2 ? (
          <div className="text-center py-4">Aucun patient trouvé</div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Commencez à taper pour rechercher un patient
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Annuler
        </Button>
        <Button
          onClick={onCreateNew}
        >
          Nouveau patient
        </Button>
      </div>
    </Modal>
  );
}
