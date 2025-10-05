'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Composant de chargement commun
const LoadingComponent = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-elhassi1)] rounded-full animate-spin mx-auto"></div>
      <p className="text-center mt-2">Chargement...</p>
    </div>
  </div>
);

// Importation dynamique des composants modaux avec configuration simplifiée
export const LazySearchPatientModal = dynamic(
  () => import('@/components/patients/SearchPatientModal'),
  { loading: () => <LoadingComponent /> }
);

export const LazyAddPatientModal = dynamic(
  () => import('@/components/patients/AddPatientModal'),
  { loading: () => <LoadingComponent /> }
);

export const LazyAddToQueueModal = dynamic(
  () => import('@/components/patients/AddToQueueModal'),
  { loading: () => <LoadingComponent /> }
);
