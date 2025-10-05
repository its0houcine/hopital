"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import GlobalLoadingIndicator from "@/components/ui/GlobalLoadingIndicator";
import ComponentPreloader from "@/components/preload/ComponentPreloader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user } = useAuth();
  const pathname = usePathname();

  // Le préchargement est maintenant géré par le ComponentPreloader

  const isProfilePage = pathname.startsWith("/patients/") || pathname.startsWith("/medecins/");

  if (isProfilePage) {
    return (
      <div className="min-h-screen">
        <GlobalLoadingIndicator />
        {children}
      </div>
    );
  }

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="admin-layout"
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <GlobalLoadingIndicator key="global-loading" />
        <AppHeader key="app-header" />
        <div className="flex flex-1 relative">
          <AppSidebar key="app-sidebar" />
          <Backdrop key="backdrop" />
          <motion.main
            key="main-content"
            className={`flex-1 w-full ${mainContentMargin}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            style={{
              transition: 'margin-left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)'
            }}
          >
            <PageTransition key="page-transition" className="w-full h-full px-6 py-6">
              {children}
            </PageTransition>
            {user && <ComponentPreloader key="component-preloader" role={user.role} />}
          </motion.main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
