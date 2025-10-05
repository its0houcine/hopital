'use client';

import { useState } from 'react';
import PatientsList from '@/components/patients/PatientsList';
import AddPatientModal from '@/components/patients/AddPatientModal';
import PatientQuickView from '@/components/patients/PatientQuickView';

interface PatientsClientProps {
  initialData: {
    patients: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    medecins: any[];
  };
}

export default function PatientsClient({ initialData }: PatientsClientProps) {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Cette fonction sera passée au composant PatientsList
  const handlePatientClick = (patientId: number) => {
    setSelectedPatientId(patientId);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <PatientsList
        initialPatients={initialData.patients}
        initialPagination={initialData.pagination}
        medecins={initialData.medecins}
        onAddPatient={() => setIsAddPatientModalOpen(true)}
        onPatientClick={handlePatientClick}
      />
      
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={() => {
          // Rafraîchir la liste des patients après l'ajout
          window.location.reload();
        }}
      />
      
      {selectedPatientId && (
        <PatientQuickView
          patientId={selectedPatientId}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </div>
  );
}
