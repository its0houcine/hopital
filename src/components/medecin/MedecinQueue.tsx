'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, Clock, AlertCircle } from 'lucide-react';
import { useFileAttenteMedecin } from '@/hooks/useFileAttenteQuery';
import { useCurrentConsultation } from '@/hooks/useConsultationQuery';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  numero_patient: string;
  photo?: string;
}

interface FileAttenteItem {
  id: number;
  patient: Patient;
  ordre: number;
  statut: 'EN_ATTENTE' | 'EN_COURS';
}

interface MedecinQueueProps {
  id: number;
}

export default function MedecinQueue({ id }: { id: number }) {
  // Utiliser React Query pour récupérer la file d'attente
  const {
    data: fileAttente = [],
    isLoading,
    error
  } = useFileAttenteMedecin(id);

  // Utiliser React Query pour récupérer la consultation en cours
  const { data: consultation } = useCurrentConsultation(id);

  const filteredQueue = useMemo(() => {
    return fileAttente
      .filter(item =>
        item.statut === 'EN_ATTENTE' &&
        (!consultation || item.patient.id !== consultation?.patient?.id)
      )
      .sort((a, b) => a.ordre - b.ordre);
  }, [fileAttente, consultation]);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <motion.div
        className="p-4 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <Users size={20} />
          <h2 className="text-xl font-semibold">File d'attente</h2>
        </div>
        <motion.div
          className="bg-white/20 px-2.5 py-1 rounded-full text-sm font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {filteredQueue.length}
        </motion.div>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-elhassi1)] rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Chargement de la file d'attente...</p>
            </motion.div>
          ) : filteredQueue.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">File d'attente vide</p>
              <p className="text-gray-400 text-sm mt-1">Aucun patient en attente</p>
            </motion.div>
          ) : (
            <motion.div
              key="queue"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-100"
            >
              {filteredQueue.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '8px' }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.patient.photo ? (
                        <Image
                          src={item.patient.photo}
                          alt={`${item.patient.prenom} ${item.patient.nom}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-[#E8F5F7]">
                          <span className="text-lg font-medium text-[var(--color-elhassi1)]">
                            {item.patient.prenom[0]}
                            {item.patient.nom[0]}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.patient.prenom} {item.patient.nom}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <User size={12} />
                        <span>N° {item.patient.numero_patient}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-full text-sm font-medium shadow-sm">
                      {index + 1}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



