'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, User, FileText, Pill, ClipboardCheck, ChevronRight, Stethoscope } from 'lucide-react';
import { useCurrentConsultation, useEndConsultation, consultationKeys } from '@/hooks/useConsultationQuery';
import { useFileAttente } from '@/hooks/useFileAttente';
import { fileAttenteKeys } from '@/hooks/useFileAttenteQuery';
import { useQueryClient } from '@tanstack/react-query';

export default function CurrentConsultation({ id }: { id: number }) {
  const router = useRouter();
  const { removeFromFileAttente } = useFileAttente();

  // Utiliser React Query pour récupérer la consultation en cours
  const {
    data: consultation,
    isLoading: isConsultationLoading,
    refetch: refetchConsultation
  } = useCurrentConsultation(id);

  // Mutation pour terminer une consultation
  const endConsultationMutation = useEndConsultation();

  // Accéder au queryClient pour manipuler le cache
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    diagnostic: '',
    traitement: '',
    notes: '',
    type: 'STANDARD' as 'INITIAL' | 'STANDARD' | 'SPECIALISEE'
  });

  // Pas besoin de useEffect pour charger la consultation
  // React Query s'en charge automatiquement

  const handleTerminerConsultation = async () => {
    if (!consultation?.patient?.id) return;

    try {
      // Marquer que nous sommes en train de traiter une consultation
      sessionStorage.setItem(`processing-consultation-${id}`, 'true');

      setIsLoading(true);
      const patientId = consultation.patient.id;
      const consultationId = consultation.id;

      // Précharger l'état vide pour une transition plus fluide
      queryClient.setQueryData(consultationKeys.current(id), null);

      // Animation de transition avant l'appel API (réduite pour plus de réactivité)
      await new Promise(resolve => setTimeout(resolve, 100));

      // Réinitialiser le formulaire immédiatement pour libérer des ressources
      setFormData({
        diagnostic: '',
        traitement: '',
        notes: '',
        type: 'STANDARD' as 'INITIAL' | 'STANDARD' | 'SPECIALISEE'
      });

      // Utiliser la mutation React Query pour terminer la consultation
      await endConsultationMutation.mutateAsync({
        consultationId,
        patientId,
        medecinId: id,
        data: {
          diagnostic: formData.diagnostic,
          traitement: formData.traitement,
          notes: formData.notes,
          type: formData.type
        }
      });

      // Mise à jour optimiste après confirmation du serveur
      // Utiliser un délai pour permettre une transition fluide
      setTimeout(() => {
        // Marquer la consultation comme terminée dans sessionStorage
        // Cela empêchera les requêtes automatiques pendant 30 secondes
        sessionStorage.setItem(`consultation-terminee-${id}`, 'true');

        // Supprimer la consultation du cache de manière définitive
        queryClient.removeQueries({ queryKey: consultationKeys.current(id) });
        queryClient.setQueryData(consultationKeys.current(id), null);

        // Désactiver temporairement les requêtes automatiques
        queryClient.cancelQueries({ queryKey: consultationKeys.current(id) });

        // Forcer un rafraîchissement des données
        queryClient.invalidateQueries({ queryKey: consultationKeys.all });
        queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });

        // Mettre à jour l'état local
        setIsLoading(false);

        // Afficher un message de succès
        toast.success("Consultation terminée avec succès");

        // Forcer un rafraîchissement après un délai supplémentaire
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: consultationKeys.all });
          queryClient.invalidateQueries({ queryKey: fileAttenteKeys.all });

          // Indiquer que nous avons terminé le traitement
          sessionStorage.removeItem(`processing-consultation-${id}`);
        }, 1000);
      }, 300); // Réduire le délai pour une meilleure réactivité

    } catch (error) {
      setIsLoading(false);
      console.error("Erreur détaillée:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la finalisation de la consultation");

      // Indiquer que nous avons terminé le traitement même en cas d'erreur
      sessionStorage.removeItem(`processing-consultation-${id}`);
    }
  };

  const handleViewProfile = () => {
    if (consultation?.patient?.id) {
      router.push(`/medecin/patients/${consultation.patient.id}`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading || isConsultationLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-6 rounded-lg shadow-md relative overflow-hidden"
        >
          {/* Effet de shimmer (scintillement) */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut"
            }}
          />

          {/* Effet de shimmer secondaire */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.15, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
              delay: 0.8
            }}
          />

          <div className="h-40 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Cercle extérieur pulsant */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Spinner principal */}
              <motion.div
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full relative z-10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Texte de chargement avec effet de clignotement */}
            <motion.p
              className="text-white mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.7, 1] }}
              transition={{
                delay: 0.3,
                duration: 2,
                repeat: Infinity,
                times: [0, 0.2, 0.4, 0.6, 1]
              }}
            >
              Chargement...
            </motion.p>
          </div>
        </motion.div>
      ) : !consultation ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-6 rounded-lg shadow-md relative overflow-hidden"
        >
          {/* Effet de shimmer (scintillement) */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.2, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}
          />

          {/* Effet de shimmer secondaire */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.1, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
              delay: 1.2
            }}
          />

          <div className="h-40 flex flex-col items-center justify-center text-white relative z-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1,
                y: [0, -10, 0, -5, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{
                scale: { duration: 0.3 },
                y: {
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }
              }}
              className="mb-4 bg-white/20 p-4 rounded-full shadow-lg relative"
            >
              {/* Effet de halo lumineux */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/30 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              <Clipboard className="w-12 h-12 relative z-10" />
            </motion.div>
            <p className="text-xl font-semibold">Aucun patient en cours de consultation</p>
            <p className="text-white/70 mt-2">Commencez une consultation depuis la file d'attente</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={consultation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-6 rounded-lg shadow-md relative overflow-hidden"
        >
          {/* Effet de shimmer (scintillement) */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.15, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          />

          {/* Effet de shimmer secondaire */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 skew-x-[-20deg]"
            animate={{
              opacity: [0, 0.08, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6 relative z-10"
          >
            <div className="flex items-center gap-2">
              <Stethoscope size={20} className="text-white" />
              <h2 className="text-xl font-semibold text-white">Patient actuel</h2>
            </div>
            <motion.button
              onClick={handleViewProfile}
              className="px-4 py-2 bg-white text-[var(--color-elhassi1)] rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={16} />
              <span>Voir profil</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-inner relative z-10"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-elhassi1)]"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={consultation.patient.photo || "/images/default-avatar.png"}
                    alt={`${consultation.patient.prenom} ${consultation.patient.nom}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {consultation.patient.prenom} {consultation.patient.nom}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <User size={14} />
                    <span>N° {consultation.patient.numero_patient}</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'INITIAL' | 'STANDARD' | 'SPECIALISEE' })}
                  className="block appearance-none w-48 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white px-3 py-1.5 pr-8 rounded-full cursor-pointer focus:outline-none shadow-md"
                >
                  <option value="INITIAL" className="bg-[var(--color-elhassi1)]">Consultation initiale</option>
                  <option value="STANDARD" className="bg-[var(--color-elhassi1)]">Consultation standard</option>
                  <option value="SPECIALISEE" className="bg-[var(--color-elhassi1)]">Consultation spécialisée</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Section Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <FileText size={16} className="text-[var(--color-elhassi1)]" />
                  <h4>Notes de consultation</h4>
                </div>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)] transition-all"
                  placeholder="Ajouter des notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              {/* Section Informations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <ClipboardCheck size={16} className="text-[var(--color-elhassi1)]" />
                  <h4>Informations complémentaires</h4>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Stethoscope size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Diagnostic"
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)] transition-all"
                      value={formData.diagnostic}
                      onChange={(e) => setFormData({ ...formData, diagnostic: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Pill size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Traitement prescrit"
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-elhassi1)] transition-all"
                      value={formData.traitement}
                      onChange={(e) => setFormData({ ...formData, traitement: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex justify-end"
            >
              <motion.button
                onClick={handleTerminerConsultation}
                className="px-6 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-md shadow-md flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ClipboardCheck size={18} />
                <span>Terminer la consultation</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


