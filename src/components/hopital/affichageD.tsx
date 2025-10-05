'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useAdminFileAttenteCounts } from "@/hooks/useAdminFileAttenteQuery";

interface AffichageDProps {
  type: "attente" | "consultation";
  refreshTrigger?: number; // Gardé pour compatibilité
}

export default function AffichageD({ type }: AffichageDProps) {
  // Utiliser React Query pour récupérer les compteurs
  const {
    data: counts = { EN_ATTENTE: 0, EN_COURS: 0 },
    isLoading
  } = useAdminFileAttenteCounts();

  // Définir le statut et le texte en fonction du type
  const statut = type === "attente" ? "EN_ATTENTE" : "EN_COURS";
  const count = counts[statut];
  const text = type === "attente" ? "Patient en attente" : "Patient en cours de consultation";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] rounded-2xl shadow-md relative overflow-hidden">
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

        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-inner relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[var(--color-elhassi1)] text-2xl font-bold"
              >
                ...
              </motion.div>
            ) : (
              <motion.h1
                key="count"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-[var(--color-elhassi1)] text-2xl font-bold"
              >
                {count}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <div className="relative z-10">
          <p className="text-white text-lg font-medium">{text}</p>
        </div>
      </div>
    </div>
  );
}
