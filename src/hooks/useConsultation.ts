import { create } from 'zustand';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  numero_patient: string;
  photo?: string;
}

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
}

interface Consultation {
  id: number;
  patientId: number;
  medecinId: number;
  patient: Patient;
  medecin: Medecin;
  date: Date;
  diagnostic?: string;
  traitement?: string;
  notes?: string;
  type?: 'INITIAL' | 'STANDARD' | 'SPECIALISEE';
}

interface ConsultationStore {
  consultation: Consultation | null;
  setConsultation: (consultation: Consultation | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useConsultation = create<ConsultationStore>((set) => ({
  consultation: null,
  isLoading: false,
  setConsultation: (consultation) => set({ consultation }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));






