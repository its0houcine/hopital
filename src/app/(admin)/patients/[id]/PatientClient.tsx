"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import EditPatientModal from "@/components/patients/EditPatientModal";
import { useState, useMemo, useEffect } from "react";
import ConsultationDetailsModal from "@/components/consultations/ConsultationDetailsModal";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  numero_patient: string;
  telephone: string;
  date_naissance: string;
  genre?: string;
  adresse?: string;
  condition_medicale?: string;
  ct_sim?: string;
  debut_traitement?: string;
  fin_traitement?: string;
  consultation?: string;
  consultation_specialisee?: string;
  consultation_controle?: string;
  medecin_nom?: string;
  message?: string;
  date_message?: string;
  photo?: string;  // Changé de photo_url à photo pour correspondre à la base de données
  technique_irradiation?: string;
  dose_totale?: number;
  dose_fraction?: number;
  consultations?: {
    id: number;
    date: Date;
    type: 'INITIAL' | 'STANDARD' | 'SPECIALISEE';
    diagnostic: string | null;
    traitement: string | null;
    notes: string | null;
    medecin: {
      id: number;
      nom: string;
      prenom: string;
      photo: string | null;
    };
  }[];
}

const formatDateForInput = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function PatientClient({ patient }: { patient: Patient }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();

  // Détermine si on est dans le contexte médecin ou admin
  const isMedecinContext = pathname.startsWith('/medecin');

  const handleBack = () => {
    if (isMedecinContext) {
      router.push('/medecin/dashboard');
    } else {
      router.push('/patients');
    }
  };

  const [currentPatient, setCurrentPatient] = useState({
    ...patient,
    // Les dates sont déjà au bon format, pas besoin de les reformater
    date_naissance: patient.date_naissance || '',
    consultation: patient.consultation || '',
    consultation_specialisee: patient.consultation_specialisee || '',
    ct_sim: patient.ct_sim || '',
    debut_traitement: patient.debut_traitement || '',
    fin_traitement: patient.fin_traitement || '',
  });

  // Ajout du state pour la consultation sélectionnée
  const [selectedConsultation, setSelectedConsultation] = useState<typeof patient.consultations[0] | null>(null);

  const [selectedConsultationId, setSelectedConsultationId] = useState<number>(() => {
    // Sélectionner la consultation la plus récente par défaut
    const sortedConsultations = [...(patient.consultations || [])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedConsultations[0]?.id;
  });

  // Mettre à jour selectedConsultation quand selectedConsultationId change
  useEffect(() => {
    const consultation = patient.consultations?.find(c => c.id === selectedConsultationId);
    setSelectedConsultation(consultation || null);
  }, [selectedConsultationId, patient.consultations]);

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setCurrentPatient({
      ...updatedPatient,
      date_naissance: updatedPatient.date_naissance || '',
      consultation: updatedPatient.consultation || '',
      consultation_specialisee: updatedPatient.consultation_specialisee || '',
      ct_sim: updatedPatient.ct_sim || '',
      debut_traitement: updatedPatient.debut_traitement || '',
      fin_traitement: updatedPatient.fin_traitement || '',
    });
    router.refresh();
  };

  return (
    <div className="min-h-screen p-6 flex flex-col" style={{ backgroundColor: "oklch(0.964 0.018 257.5)" }}>
      {/* Boutons en haut */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-white text-blue-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition"
        >
          ← Retour
        </button>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          ✏️ Modifier
        </button>
      </div>

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Gauche */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            {patient.photo ? (
              <Image
                src={patient.photo}
                alt="Photo du patient"
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
            )}
            <div>
              <h2 className="text-xl font-bold uppercase">
                {patient.genre === "Femme" ? "Mme" : "Mr."} {patient.nom} {patient.prenom}
              </h2>
              <p className="text-gray-500 text-sm">Numéro : {patient.numero_patient}</p>
            </div>
          </div>

          {/* Téléphone & Adresse */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                {patient.telephone || "Téléphone non renseigné"}
              </button>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                {patient.adresse || "Adresse non renseignée"}
              </button>
            </div>


          {/* Infos générales */}
          <div className="bg-white p-6 mt-8 rounded-xl shadow">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date de naissance</p>
                <p className="font-semibold">{formatDate(patient.date_naissance)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sexe</p>
                <p className="font-semibold">{patient.genre || "Non renseigné"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition médicale</p>
                <p className="font-semibold">{patient.condition_medicale || "Non renseignée"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date CT SIM</p>
                <p className="font-semibold">{formatDate(patient.ct_sim)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Début traitement</p>
                <p className="font-semibold">{formatDate(patient.debut_traitement)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fin traitement</p>
                <p className="font-semibold">{formatDate(patient.fin_traitement)}</p>
              </div>
            </div>
          </div>

          {/* Dates de consultations */}
          <div className="bg-gradient-to-r from-[#329DFF] to-blue-600 text-white p-6 rounded-3xl shadow-lg max-w-4xl mx-auto mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-sm" />
              Consultations
            </h3>

            <div className="relative border-l-2 border-white pl-10 space-y-4">
              {patient.consultations?.map((consultation, index) => {
                const today = new Date();
                const consultationDate = new Date(consultation.date);
                const isToday = consultationDate.toLocaleDateString("fr-FR") === today.toLocaleDateString("fr-FR");

                let typeLabel;
                switch (consultation.type) {
                  case 'INITIAL':
                    typeLabel = "Consultation initiale";
                    break;
                  case 'SPECIALISEE':
                    typeLabel = "Consultation spécialisée";
                    break;
                  case 'STANDARD':
                    typeLabel = "Consultation standard";
                    break;
                  default:
                    typeLabel = "Consultation";
                }

                return (
                  <div key={consultation.id} className="flex justify-between items-start">
                    <div className="absolute left-0 translate-x-[-50%]">
                      <div
                        className={`w-4 h-4 rounded-full ${isToday ? "bg-orange-500 scale-125" : "bg-white"}`}
                      />
                    </div>
                    <div>
                      <p className={`text-sm ${isToday ? "text-orange-400 font-bold text-base" : "font-semibold"}`}>
                        {typeLabel}
                      </p>
                      <p className={`text-sm ${isToday ? "text-orange-400 font-semibold" : ""}`}>
                        {formatDate(consultation.date.toString())}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        setIsConsultationModalOpen(true);
                      }}
                      className={`text-sm flex items-center gap-1 ${
                        isToday ? "text-orange-400" : "text-white"
                      } hover:underline`}
                    >
                      plus de détails →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Droite */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Infos radiothérapie */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-md">
  <h3 className="font-semibold text-lg mb-4">Informations radiothérapie</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="bg-white text-blue-700 rounded-xl p-4 shadow text-center">
      <p className="font-bold">
        {patient.dose_fraction ? `${patient.dose_fraction} Gy` : "-"}
      </p>
      <p className="text-xs">par séance</p>
    </div>
    <div className="bg-white text-blue-700 rounded-xl p-4 shadow text-center">
      <p className="font-bold">
        {patient.dose_totale ? `${patient.dose_totale} Gy` : "-"}
      </p>
      <p className="text-xs">dose totale</p>
    </div>
    <div className="bg-white text-blue-700 rounded-xl p-4 shadow text-center">
      <p className="font-bold">
        {patient.technique_irradiation || "-"}
      </p>
      <p className="text-xs">Technique</p>
    </div>
  </div>
</div>

          {/* Notes médecin */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex-1">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-semibold text-lg">📝 Notes du médecin</h3>
              {patient.consultations && patient.consultations.length > 0 && (
                <div className="relative">
                  <select
                    className="block appearance-none w-40 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white px-3 py-1.5 pr-8 rounded-full cursor-pointer focus:outline-none shimmer-effect"
                    value={selectedConsultationId}
                    onChange={(e) => setSelectedConsultationId(Number(e.target.value))}
                  >
                    {patient.consultations.map((consultation) => (
                      <option
                        key={consultation.id}
                        value={consultation.id}
                        className="bg-[var(--color-elhassi1)]"
                      >
                        {new Date(consultation.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {patient.consultations && patient.consultations.length > 0 && selectedConsultation ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-bold">Dr. {selectedConsultation.medecin.prenom} {selectedConsultation.medecin.nom}</p>
                    <p className="text-sm text-gray-500">Radiothérapeute</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 min-h-[100px]">
                  {selectedConsultation.notes || "Aucune note ajoutée."}
                </div>
              </>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-gray-500">
                <div className="animate-bounce mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xl font-semibold">Aucune consultation enregistrée</p>
                <p className="text-sm mt-2">Les notes apparaîtront ici après la première consultation</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add the EditPatientModal */}
      <EditPatientModal
        isOpen={isOpen}
        onClose={closeModal}
        patient={{...currentPatient, genre: currentPatient.genre || 'Homme'}}
        onUpdate={(updatedPatient) => handleUpdatePatient(updatedPatient as Patient)}
      />
      {selectedConsultation && (
        <ConsultationDetailsModal
          isOpen={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
          consultation={selectedConsultation}
        />
      )}
    </div>
  );
}

// Fonction utilitaire
function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR");
}
