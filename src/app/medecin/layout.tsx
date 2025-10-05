"use client";

import AppHeader from "@/layout/medecin/AppHeader";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ComponentPreloader from "@/components/preload/ComponentPreloader";

export default function MedecinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Le préchargement est maintenant géré par le ComponentPreloader

  // Vérifier si nous sommes sur une page de profil patient
  const isPatientProfilePage = pathname.startsWith('/medecin/patients/');

  // Si c'est une page de profil patient, retourner sans layout
  if (isPatientProfilePage) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key="medecin-main"
          className="flex-1 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full px-6 py-6 max-w-7xl mx-auto">
            {children}
            {user && <ComponentPreloader key="component-preloader" role={user.role} />}
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

