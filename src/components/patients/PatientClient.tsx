"use client";

import { Patient } from '@/types';
import { useRouter } from 'next/navigation';

interface PatientClientProps {
  patient: Patient;
  context?: 'medecin';  // Optional, only used for medecin context
}

export function PatientClient({ patient, context }: PatientClientProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (context === 'medecin') {
      router.back('/medecin/dashboard');
    } else {
      router.push('/patients');
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col" style={{ backgroundColor: "oklch(0.964 0.018 257.5)" }}>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-white text-blue-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition"
        >
          ← Retour
        </button>
        {/* ... reste du composant ... */}
      </div>
      {/* ... reste du composant ... */}
    </div>
  );
}





