"use client";

import React, { useState, useEffect } from "react";
import AddPatientModal from "./AddPatientModal";
import AddToQueueModal from "./AddToQueueModal";
import Link from "next/link";

interface Patient {
  id: number;
  numero_patient: string;
  nom: string;
  prenom: string;
  telephone: string | null;
  genre: string;
  date_naissance: string;
  adreesse?: string;
  photo: string | null;
  medecin_id: number | null;
}

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
}

interface ClientWrapperProps {
  patients: Patient[];
  medecins: Medecin[];
}

export default function ClientWrapper({ patients, medecins }: ClientWrapperProps) {
  const [patientList, setPatientList] = useState<Patient[]>(patients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = patients.filter((patient) =>
        patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.numero_patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.telephone && patient.telephone.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setPatientList(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, patients]);

  const toggleMenu = (id: number) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const closeMenu = () => setMenuOpenId(null);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce patient ?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        // Recharge proprement la liste depuis la base
        await refreshPatients();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };
  
  // Fonction pour récupérer les patients depuis l'API /api/patients/index
  const refreshPatients = async () => {
    try {
      const res = await fetch("/api/patients");
      if (res.ok) {
        const data = await res.json();
        setPatientList(data);
      } else {
        console.error("Erreur lors du rafraîchissement des patients.");
      }
    } catch (err) {
      console.error("Erreur de connexion au serveur :", err);
    }
  };
  
  
  const handleAddPatient = (newPatient: Patient, tempId?: number) => {
    setPatientList((prev) => {
      if (tempId) {
        // Mise à jour d'un patient temporaire avec les vraies données
        return prev.map(p => p.id === tempId ? newPatient : p);
      }
      // Ajout d'un nouveau patient
      return [newPatient, ...prev];
    });
  };

  return (
    <div className="w-full rounded-xl shadow-lg bg-white dark:bg-white/[0.03] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-[color:var(--color-elhassi1)] rounded-sm"></div>
          <h1 className="text-2xl font-semibold">Liste des Patients</h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher un patient..."
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
          >
            Ajouter un patient
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full table-fixed text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-white dark:bg-gray-800 sticky top-0 z-10">
              <th className="px-5 py-3 text-start">Photo</th>
              <th className="px-5 py-3 text-start">Numéro</th>
              <th className="px-5 py-3 text-start">Nom</th>
              <th className="px-5 py-3 text-start">Téléphone</th>
              <th className="px-5 py-3 text-start">Médecin</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {patientList.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-5 py-4">
                  {patient.photo ? (
                    <img
                      src={patient.photo}
                      alt="Photo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                </td>
                <td className="px-5 py-4">{patient.numero_patient}</td>
                <td className="px-5 py-4">{patient.nom} {patient.prenom}</td>
                <td className="px-5 py-4">{patient.telephone || "-"}</td>
                <td className="px-5 py-4">
                  <select
                    className="w-full max-w-[170px] border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900"
                    defaultValue={patient.medecin_id || ""}
                    onChange={(e) => {
                      const selectedId = parseInt(e.target.value);
                      console.log(`Patient ${patient.id} assigné au médecin ${selectedId}`);
                    }}
                  >
                    <option value="">Aucun</option>
                    {medecins.map((med) => (
                      <option key={med.id} value={med.id}>
                        Dr. {med.nom} {med.prenom}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(patient.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="text-xl">⋯</span>
                    </button>
                    {menuOpenId === patient.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
                        <Link href={`/patients/${patient.id}`}>
                          <span
                            onClick={closeMenu}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            Voir Profil
                          </span>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedPatient(patient);
                            setIsQueueModalOpen(true);
                            closeMenu();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          File d'attente
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(patient.id);
                            closeMenu();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {patientList.length === 0 && (
          <div className="p-4 text-center text-gray-400 text-sm">Aucun patient trouvé.</div>
        )}
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPatient}
      />
      {selectedPatient && (
        <AddToQueueModal
          isOpen={isQueueModalOpen}
          onClose={() => {
            setIsQueueModalOpen(false);
            setSelectedPatient(null);
          }}
          patient={selectedPatient}
          medecins={medecins}
        />
      )}
    </div>
  );
}
