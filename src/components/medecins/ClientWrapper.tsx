"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddMedecinModal from "./AddMedecinModal";

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  photo?: string;
}

export default function ClientWrapper({ medecins }: { medecins: Medecin[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medecinList, setMedecinList] = useState(medecins);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = medecins.filter((medecin) =>
        medecin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medecin.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (medecin.email && medecin.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (medecin.telephone && medecin.telephone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (medecin.specialite && medecin.specialite.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setMedecinList(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, medecins]);

  const toggleMenu = (id: number) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const closeMenu = () => setMenuOpenId(null);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`/api/medecins/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        await refreshMedecins();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };

  const refreshMedecins = async () => {
    try {
      const res = await fetch("/api/medecins");
      if (res.ok) {
        const data = await res.json();
        setMedecinList(data);
      } else {
        console.error("Erreur lors du rafraîchissement des médecins.");
      }
    } catch (err) {
      console.error("Erreur de connexion au serveur :", err);
    }
  };

  const handleAddMedecin = (newMedecin: Medecin) => {
    setMedecinList((prev) => [...prev, newMedecin]);
  };

  return (
    <div className="w-full rounded-xl shadow-lg bg-white dark:bg-white/[0.03] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-[color:var(--color-elhassi1)] rounded-sm"></div>
          <h1 className="text-2xl font-semibold">Liste des Médecins</h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher un médecin..."
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
          >
            Ajouter un médecin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full table-fixed text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-white dark:bg-gray-800 sticky top-0 z-10">
              <th className="px-5 py-3 text-start">Photo</th>
              <th className="px-5 py-3 text-start">Nom</th>
              <th className="px-5 py-3 text-start">Email</th>
              <th className="px-5 py-3 text-start">Téléphone</th>
              <th className="px-5 py-3 text-start">Spécialité</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {medecinList.map((medecin) => (
              <tr key={medecin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-5 py-4">
                  {medecin.photo ? (
                    <img
                      src={medecin.photo}
                      alt="Photo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                </td>
                <td className="px-5 py-4">{medecin.nom} {medecin.prenom}</td>
                <td className="px-5 py-4">{medecin.email}</td>
                <td className="px-5 py-4">{medecin.telephone || "-"}</td>
                <td className="px-5 py-4">{medecin.specialite || "-"}</td>
                <td className="px-5 py-4 text-center">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(medecin.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="text-xl">⋯</span>
                    </button>
                    {menuOpenId === medecin.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
                        <Link href={`/medecins/${medecin.id}`}>
                          <span
                            onClick={closeMenu}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            Voir Profil
                          </span>
                        </Link>
                        <button
                          onClick={() => {
                            handleDelete(medecin.id);
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

        {medecinList.length === 0 && (
          <div className="p-4 text-center text-gray-400 text-sm">Aucun médecin trouvé.</div>
        )}
      </div>

      <AddMedecinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddMedecin}
      />
    </div>
  );
}

