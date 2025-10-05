'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import MedecinsList from '@/components/medecins/MedecinsList';
import AddMedecinModal from '@/components/medecins/AddMedecinModal';
import MedecinQuickView from '@/components/medecins/MedecinQuickView';
import ContentTransition from '@/components/ui/ContentTransition';

interface MedecinsClientProps {
  initialData: {
    medecins: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export default function MedecinsClient({ initialData }: MedecinsClientProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMedecinId, setSelectedMedecinId] = useState<number | null>(null);
  const [medecins, setMedecins] = useState(initialData.medecins);
  const [pagination, setPagination] = useState(initialData.pagination);

  // Ouvrir le modal d'ajout
  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  // Fermer le modal d'ajout
  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  // Gérer l'ajout d'un médecin
  const handleAddMedecin = useCallback((newMedecin: any) => {
    setMedecins(prev => [newMedecin, ...prev]);
    setPagination(prev => ({
      ...prev,
      total: prev.total + 1,
      totalPages: Math.ceil((prev.total + 1) / prev.limit)
    }));
  }, []);

  // Ouvrir la vue rapide d'un médecin
  const handleMedecinClick = useCallback((medecinId: number) => {
    setSelectedMedecinId(medecinId);
  }, []);

  // Fermer la vue rapide d'un médecin
  const handleCloseQuickView = useCallback(() => {
    setSelectedMedecinId(null);
  }, []);

  return (
    <ContentTransition className="container mx-auto p-6 space-y-6">
      <MedecinsList
        initialMedecins={medecins}
        initialPagination={pagination}
        onAddMedecin={handleOpenAddModal}
        onMedecinClick={handleMedecinClick}
      />

      {/* Modal d'ajout de médecin */}
      <AddMedecinModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddMedecin}
      />

      {/* Vue rapide d'un médecin */}
      {selectedMedecinId && (
        <MedecinQuickView
          medecinId={selectedMedecinId}
          isOpen={selectedMedecinId !== null}
          onClose={handleCloseQuickView}
        />
      )}
    </ContentTransition>
  );
}
