'use client';

import { useState, useEffect } from 'react';
import { getMedecins } from '@/app/actions/medecin';

interface TablesHeaderProps {
  onSearch: (term: string) => void;
  onAdd: () => void;
  onSelectMedecin?: (medecinId: number | null) => void;
}

export default function TablesHeader({ onSearch, onAdd, onSelectMedecin }: TablesHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [medecins, setMedecins] = useState<any[]>([]);
  const [selectedMedecinId, setSelectedMedecinId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const result = await getMedecins();
        if (result.success) {
          setMedecins(result.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedecins();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleMedecinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const medecinId = value !== "" ? parseInt(value) : null;

    console.log("Médecin sélectionné:", value, medecinId); // Pour déboguer

    setSelectedMedecinId(medecinId);
    if (onSelectMedecin) {
      onSelectMedecin(medecinId);
    }
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-[color:var(--color-elhassi1)] rounded-sm"></div>
          <h1 className="text-2xl font-semibold">File d'attente</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Sélecteur de médecin avec style amélioré */}
          <div className="relative h-8 z-10">
            <select
              id="medecin-select"
              className="h-full w-40 px-3 text-xs text-[var(--color-elhassi1)] font-medium border border-[var(--color-elhassi1)] bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)] cursor-pointer appearance-none"
              value={selectedMedecinId || ""}
              onChange={handleMedecinChange}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234299e1' viewBox='0 0 24 24' stroke='%234299e1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Tous médecins</option>
              {medecins.map((medecin) => (
                <option key={medecin.id} value={medecin.id}>
                  Dr. {medecin.nom} {medecin.prenom}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Rechercher un patient..."
            className="h-8 w-48 px-3 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-elhassi1)]"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button
            onClick={onAdd}
            className="h-8 px-3 text-xs text-white bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] hover:bg-[color:var(--color-elhassi1-dark)] rounded-md transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
