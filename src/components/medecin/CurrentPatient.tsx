'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, Phone, FileText, Stethoscope } from 'lucide-react';
import { useCurrentPatient, useUpdatePatientStatus } from '@/hooks/useFileAttenteQuery';
import { useStartConsultation } from '@/hooks/useConsultationQuery';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  numero_patient: string;
  telephone?: string;
  photo?: string;
  condition_medicale?: string; // Antécédents
  diagnostic?: string;
}

interface FileAttenteItem {
  id: number;
  patient: Patient;
  ordre: number;
  statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE';
}

interface CurrentPatientProps {
  id: number;
}

export default function CurrentPatient({ id }: CurrentPatientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utiliser React Query pour récupérer le patient actuel
  const {
    data: currentPatient,
    isLoading,
    error
  } = useCurrentPatient(id);

  // Mutation pour mettre à jour le statut du patient
  const updatePatientStatusMutation = useUpdatePatientStatus();

  // Mutation pour démarrer une consultation
  const startConsultationMutation = useStartConsultation();

  const handleStartConsultation = async () => {
    if (!currentPatient || !id) {
      console.error('Données manquantes:', { currentPatient, id });
      toast.error("Données manquantes pour démarrer la consultation");
      return;
    }

    try {
      // Marquer que nous sommes en train de traiter une consultation
      sessionStorage.setItem(`processing-consultation-${id}`, 'true');

      // Mettre à jour l'état local immédiatement pour une meilleure réactivité
      setIsSubmitting(true);

      // Précharger l'état pour une transition plus fluide
      // Cela permet d'afficher immédiatement l'état de chargement
      const patientData = {
        id: currentPatient.id,
        patient: currentPatient.patient,
        statut: 'EN_COURS' as const
      };

      // Afficher un toast de chargement
      const loadingToast = toast.loading("Démarrage de la consultation...");

      try {
        // Démarrer la consultation (l'API s'occupe de mettre à jour le statut)
        await startConsultationMutation.mutateAsync({
          fileAttenteId: currentPatient.id,
          medecinId: id
        });

        // Mettre à jour le toast de chargement
        toast.update(loadingToast, {
          render: "Consultation démarrée avec succès",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        // Forcer un rafraîchissement des données après un court délai
        setTimeout(() => {
          startConsultationMutation.reset();
          // Indiquer que nous avons terminé le traitement
          sessionStorage.removeItem(`processing-consultation-${id}`);
        }, 300);
      } catch (error) {
        // Mettre à jour le toast de chargement en cas d'erreur
        toast.update(loadingToast, {
          render: error instanceof Error ? error.message : "Une erreur est survenue lors du démarrage de la consultation",
          type: "error",
          isLoading: false,
          autoClose: 5000
        });

        console.error('Erreur détaillée:', error);

        // Indiquer que nous avons terminé le traitement même en cas d'erreur
        sessionStorage.removeItem(`processing-consultation-${id}`);

        throw error; // Propager l'erreur pour le bloc catch externe
      }
    } catch (error) {
      // Cette partie ne sera exécutée que si une erreur est propagée depuis le bloc try interne
      console.error('Erreur non gérée:', error);

      // Indiquer que nous avons terminé le traitement même en cas d'erreur
      sessionStorage.removeItem(`processing-consultation-${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[300px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      <div className="h-full p-4 flex flex-col">
        {/* En-tête avec bouton */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-[var(--color-elhassi1)] rounded-sm"></div>
            <h2 className="text-lg font-semibold text-[var(--color-elhassi1)]">Prochain Patient</h2>
          </div>

          {currentPatient && (
            <motion.button
              onClick={handleStartConsultation}
              className="px-3 py-1.5 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-full flex items-center gap-1.5 text-sm font-medium relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              disabled={isSubmitting}
            >
              <ChevronRight size={16} />
              Commencer
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLoading || isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-16 h-16 border-4 border-gray-200 border-t-[var(--color-elhassi1)] rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <p className="text-gray-500 font-medium">
                {isSubmitting ? "Démarrage de la consultation..." : "Chargement des patients..."}
              </p>
              {isSubmitting && (
                <p className="text-gray-400 text-sm mt-2 max-w-xs text-center">
                  Veuillez patienter pendant que nous préparons la consultation...
                </p>
              )}
            </motion.div>
          ) : !currentPatient ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Aucun patient en attente</p>
              <p className="text-gray-400 text-sm mt-1">La file d'attente est vide</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentPatient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Informations du patient */}
              <div className="flex gap-6 mb-4">
                {/* Photo du patient */}
                <motion.div
                  className="relative flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {currentPatient.patient.photo ? (
                    <div className="relative w-24 h-24">
                      <Image
                        src={currentPatient.patient.photo}
                        alt={`${currentPatient.patient.prenom} ${currentPatient.patient.nom}`}
                        fill
                        className="rounded-full object-cover border-3 border-[var(--color-elhassi1)]"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#E8F5F7] flex items-center justify-center border-3 border-[var(--color-elhassi1)]">
                      <span className="text-2xl text-[var(--color-elhassi1)] font-semibold">
                        {currentPatient.patient.prenom[0]}
                        {currentPatient.patient.nom[0]}
                      </span>
                    </div>
                  )}
                  <motion.span
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.2, type: 'spring' }}
                  />
                </motion.div>

                {/* Informations d'identité */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentPatient.patient.prenom} {currentPatient.patient.nom}
                  </h3>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[var(--color-elhassi1)]" />
                    <span className="text-base font-medium text-gray-600">N° {currentPatient.patient.numero_patient}</span>
                  </div>
                  {currentPatient.patient.telephone && (
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-[var(--color-elhassi1)]" />
                      <span className="text-sm text-gray-500">{currentPatient.patient.telephone}</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Antécédents et diagnostic */}
              <motion.div
                className="grid grid-cols-2 gap-3 flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="bg-gray-50 p-2.5 rounded-lg overflow-auto">
                  <div className="flex items-center gap-1 mb-1">
                    <FileText size={12} className="text-[var(--color-elhassi1)]" />
                    <h4 className="text-xs text-[var(--color-elhassi1)] font-semibold">
                      Antécédents médicaux
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-4">
                    {currentPatient.patient.antecedent || "Aucun antécédent renseigné"}
                  </p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg overflow-auto">
                  <div className="flex items-center gap-1 mb-1">
                    <Stethoscope size={12} className="text-[var(--color-elhassi1)]" />
                    <h4 className="text-xs text-[var(--color-elhassi1)] font-semibold">
                      Dernier diagnostic
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-4">
                    {currentPatient.patient.diagnostic || "Aucun diagnostic renseigné"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}







