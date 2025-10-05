'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useFileAttente } from "@/hooks/useFileAttente";
import TablesHeader from "./TablesHeader";
import TableClient from "./TableClient";
import SearchPatientModal from "@/components/patients/SearchPatientModal";
import AddToQueueModal from "@/components/patients/AddToQueueModal";
import AddPatientModal from "@/components/patients/AddPatientModal";
import { Patient } from "@/types";

interface TableWrapperProps {
  fileAttente: any[];
  initialCounts: {
    enAttente: number;
    enCours: number;
  };
  medecins: any[];
}

export default function TableWrapper({ fileAttente: initialFileAttente, initialCounts, medecins }: TableWrapperProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddToQueueModalOpen, setIsAddToQueueModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedecinId, setSelectedMedecinId] = useState<number | null>(null);

  const fileAttente = useFileAttente(state => state.fileAttente);
  const { updateFileAttente, addToFileAttente } = useFileAttente();

  useEffect(() => {
    // Mettre à jour le store avec les données initiales
    if (initialFileAttente && initialFileAttente.length > 0) {
      updateFileAttente(initialFileAttente);
    }
  }, [initialFileAttente, updateFileAttente]);

  const filteredFileAttente = useMemo(() => {
    // Filtrer d'abord par médecin si un médecin est sélectionné
    let filtered = fileAttente;

    console.log("Filtrage par médecin:", selectedMedecinId); // Pour déboguer
    console.log("Données de file d'attente:", fileAttente); // Pour déboguer

    if (selectedMedecinId) {
      filtered = filtered.filter(item => {
        // Vérifier différentes structures possibles
        const itemMedecinId = item.medecinId || item.medecin_id || (item.medecin && item.medecin.id);
        console.log("Item:", item.id, "medecinId:", itemMedecinId, "match:", itemMedecinId === selectedMedecinId); // Pour déboguer
        return itemMedecinId === selectedMedecinId;
      });
    }

    // Ensuite, filtrer par terme de recherche
    if (!searchTerm.trim()) return filtered;

    const searchTerms = searchTerm.toLowerCase().split(' ').filter(t => t.length > 0);
    return filtered.filter(item => {
      const patient = item.patient;
      const medecin = item.medecin;

      // Recherche dans les données du patient
      const patientMatch =
        patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.numero_patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.telephone && patient.telephone.toLowerCase().includes(searchTerm.replace(/[\s\-\.\(\)]/g, ''))) ||

        // Recherche combinée nom prénom
        (searchTerms.length > 1 && (
          // Nom Prénom
          (patient.nom.toLowerCase().includes(searchTerms[0]) &&
           patient.prenom.toLowerCase().includes(searchTerms[1])) ||
          // Prénom Nom
          (patient.prenom.toLowerCase().includes(searchTerms[0]) &&
           patient.nom.toLowerCase().includes(searchTerms[1]))
        ));

      // Recherche dans les données du médecin
      const medecinMatch = medecin && (
        medecin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medecin.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // Recherche combinée nom prénom du médecin
        (searchTerms.length > 1 && (
          (medecin.nom.toLowerCase().includes(searchTerms[0]) &&
           medecin.prenom.toLowerCase().includes(searchTerms[1])) ||
          (medecin.prenom.toLowerCase().includes(searchTerms[0]) &&
           medecin.nom.toLowerCase().includes(searchTerms[1]))
        ))
      );

      return patientMatch || medecinMatch;
    });
  }, [fileAttente, searchTerm, selectedMedecinId]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectMedecin = (medecinId: number | null) => {
    console.log("handleSelectMedecin appelé avec:", medecinId);
    setSelectedMedecinId(medecinId);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsSearchModalOpen(false);
    setIsAddToQueueModalOpen(true);
  };

  const handleCreateNewPatient = () => {
    setIsSearchModalOpen(false);
    setIsAddPatientModalOpen(true);
  };

  const handlePatientCreated = (newPatient: Patient, tempId?: number) => {
    if (tempId) {
      // C'est une mise à jour silencieuse avec le vrai patient
      setSelectedPatient(newPatient);
    } else {
      // C'est l'optimistic update initial
      setIsAddPatientModalOpen(false);
      setSelectedPatient(newPatient);
      setIsAddToQueueModalOpen(true); // On ouvre immédiatement le modal
    }
  };

  return (
    <>
      <TablesHeader
        onSearch={handleSearch}
        onAdd={() => setIsSearchModalOpen(true)}
        onSelectMedecin={handleSelectMedecin}
      />
      <div className="min-h-[335px] max-h-[335px] overflow-y-auto w-full">
        <TableClient fileAttente={filteredFileAttente} />
      </div>

      <SearchPatientModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPatient={handleSelectPatient}
        onCreateNew={handleCreateNewPatient}
      />

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={handlePatientCreated}
      />

      {selectedPatient && (
        <AddToQueueModal
          isOpen={isAddToQueueModalOpen}
          onClose={() => {
            setIsAddToQueueModalOpen(false);
            setSelectedPatient(null);
          }}
          patient={selectedPatient}
          medecins={medecins}
        />
      )}
    </>
  );
}









