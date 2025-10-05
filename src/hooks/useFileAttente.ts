import { create } from 'zustand';
import { Patient } from '@/types';
import { Medecin } from '@/types/medecin';
import { devtools, persist } from 'zustand/middleware';

// Types pour la file d'attente
export type FileAttenteStatut = 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE';

// Type complet pour les éléments de la file d'attente venant de l'API
export interface FileAttenteItemComplete {
  id: number;
  patientId: number;
  medecinId: number;
  statut: FileAttenteStatut;
  ordre: number;
  ajoute_le?: string;
  patient: Patient;
  medecin: {
    id: number;
    userId?: number;
    specialite?: string;
    nom: string;
    prenom: string;
  };
}

// Type simplifié pour l'utilisation dans le store
export interface FileAttenteItem {
  id: number;
  patient: Patient;
  medecin: Medecin;
  statut: FileAttenteStatut;
  ordre: number;
  ajoute_le?: string;
}

// Interface du store
interface FileAttenteStore {
  // État
  fileAttente: FileAttenteItem[];
  currentPatient: FileAttenteItem | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  counts: {
    EN_ATTENTE: number;
    EN_COURS: number;
  };

  // Actions
  updateFileAttente: (newFileAttente: FileAttenteItem[] | any[]) => void;
  setCurrentPatient: (patient: FileAttenteItem | null) => void;
  removeFromFileAttente: (patientId: number) => void;
  updatePatientStatus: (patientId: number, status: FileAttenteStatut) => Promise<void>;
  addToFileAttente: (item: FileAttenteItem | null, tempId?: number) => void;
  setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
  setError: (error: string | null) => void;
  resetError: () => void;
}

export const useFileAttente = create<FileAttenteStore>()(
  devtools(
    persist(
      (set, get) => ({
        fileAttente: [],
        currentPatient: null,
        isLoading: false,
        error: null,
        lastUpdated: Date.now(),
        counts: {
          EN_ATTENTE: 0,
          EN_COURS: 0
        },
        updateFileAttente: (newFileAttente) => set((state) => {
          // Vérifier si les données sont identiques pour éviter les re-renders inutiles
          if (JSON.stringify(state.fileAttente) === JSON.stringify(newFileAttente)) {
            return state;
          }

          // Calculer les compteurs une seule fois
          const enAttente = newFileAttente.filter(item => item.statut === 'EN_ATTENTE').length;
          const enCours = newFileAttente.filter(item => item.statut === 'EN_COURS').length;

          return {
            fileAttente: newFileAttente,
            lastUpdated: Date.now(),
            counts: {
              EN_ATTENTE: enAttente,
              EN_COURS: enCours
            }
          };
        }),
        setCurrentPatient: (patient) => set({
          currentPatient: patient,
          lastUpdated: Date.now()
        }),
        resetError: () => set({ error: null }),
        removeFromFileAttente: (patientId) =>
          set((state) => {
            const newFileAttente = state.fileAttente.filter(item => item.patient.id !== patientId);

            // Calculer les compteurs une seule fois
            const enAttente = newFileAttente.filter(item => item.statut === 'EN_ATTENTE').length;
            const enCours = newFileAttente.filter(item => item.statut === 'EN_COURS').length;

            return {
              fileAttente: newFileAttente,
              lastUpdated: Date.now(),
              counts: {
                EN_ATTENTE: enAttente,
                EN_COURS: enCours
              }
            };
          }),
        updatePatientStatus: async (patientId, status) => {
          try {
            // Optimistic update
            set((state) => {
              const newFileAttente = state.fileAttente.map(item =>
                item.patient.id === patientId ? { ...item, statut: status } : item
              );

              // Calculer les compteurs une seule fois
              const enAttente = newFileAttente.filter(item => item.statut === 'EN_ATTENTE').length;
              const enCours = newFileAttente.filter(item => item.statut === 'EN_COURS').length;

              return {
                fileAttente: newFileAttente,
                lastUpdated: Date.now(),
                counts: {
                  EN_ATTENTE: enAttente,
                  EN_COURS: enCours
                }
              };
            });

            // Appel API pour mettre à jour le statut
            const response = await fetch(`/api/file-attente/status`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ patientId, status }),
            });

            if (!response.ok) {
              throw new Error('Erreur lors de la mise à jour du statut');
            }

          } catch (error) {
            // Rollback en cas d'erreur
            set((state) => ({
              error: error instanceof Error ? error.message : 'Une erreur est survenue',
              lastUpdated: Date.now()
            }));
          }
        },
        addToFileAttente: (item, tempId) => set((state) => {
          if (!item) {
            // Remove temporary entry
            const newFileAttente = state.fileAttente.filter(entry => entry.id !== tempId);

            // Calculer les compteurs une seule fois
            const enAttente = newFileAttente.filter(item => item.statut === 'EN_ATTENTE').length;
            const enCours = newFileAttente.filter(item => item.statut === 'EN_COURS').length;

            return {
              fileAttente: newFileAttente,
              lastUpdated: Date.now(),
              counts: {
                EN_ATTENTE: enAttente,
                EN_COURS: enCours
              }
            };
          }

          let newFileAttente;
          if (tempId) {
            // Replace temporary entry with real one
            newFileAttente = state.fileAttente.map(entry =>
              entry.id === tempId ? item : entry
            );
          } else {
            // Add new entry
            newFileAttente = [...state.fileAttente, item];
          }

          // Calculer les compteurs une seule fois
          const enAttente = newFileAttente.filter(item => item.statut === 'EN_ATTENTE').length;
          const enCours = newFileAttente.filter(item => item.statut === 'EN_COURS').length;

          return {
            fileAttente: newFileAttente,
            lastUpdated: Date.now(),
            counts: {
              EN_ATTENTE: enAttente,
              EN_COURS: enCours
            }
          };
        })
      }),
      {
        name: 'file-attente-storage',
        partialize: (state) => ({
          fileAttente: state.fileAttente,
          counts: state.counts,
          lastUpdated: state.lastUpdated
        }),
      }
    )
  )
);









