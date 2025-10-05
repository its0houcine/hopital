'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

interface PatientQuickViewProps {
  patientId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PatientQuickView({ patientId, isOpen, onClose }: PatientQuickViewProps) {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && patientId) {
      const fetchPatient = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/patients/${patientId}`);
          const data = await response.json();
          setPatient(data);
        } catch (error) {
          console.error('Erreur lors du chargement du patient:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPatient();
    }
  }, [isOpen, patientId]);

  const handleViewProfile = () => {
    // Fermer la prévisualisation avant de naviguer
    onClose();

    // Ajouter un petit délai pour permettre à l'animation de fermeture de se terminer
    setTimeout(() => {
      router.push(`/patients/${patientId}`);
    }, 300);
  };

  // Formater la date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transition: {
        opacity: { duration: 0.3 },
        backdropFilter: { duration: 0.3 }
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.2 },
        backdropFilter: { duration: 0.2 }
      }
    }
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        opacity: { duration: 0.2 }
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 35,
        stiffness: 400,
        opacity: { duration: 0.15 }
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
    tap: { scale: 0.98 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Aperçu du patient
                </h2>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
                  <p className="text-gray-500">Chargement des informations...</p>
                </div>
              ) : patient ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {patient.photo ? (
                        <Image
                          src={patient.photo}
                          alt={`${patient.prenom} ${patient.nom}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {patient.prenom} {patient.nom}
                      </h3>
                      <p className="text-gray-500">
                        {patient.numero_patient}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <Phone size={16} />
                        <span className="text-sm font-medium">Téléphone</span>
                      </div>
                      <p className="text-gray-900">{patient.telephone || 'Non renseigné'}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Date de naissance</span>
                      </div>
                      <p className="text-gray-900">{formatDate(patient.date_naissance)}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <MapPin size={16} />
                        <span className="text-sm font-medium">Adresse</span>
                      </div>
                      <p className="text-gray-900">{patient.adresse || 'Non renseignée'}</p>
                    </div>
                  </div>

                  {patient.medecin && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-blue-700 font-medium mb-2">Médecin traitant</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Dr. {patient.medecin.prenom} {patient.medecin.nom}
                          </p>
                          <p className="text-sm text-gray-600">
                            {patient.medecin.specialite}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {patient.consultations && patient.consultations.length > 0 && (
                    <div>
                      <h4 className="text-gray-700 font-medium mb-3">Dernières consultations</h4>
                      <div className="space-y-2">
                        {patient.consultations.slice(0, 3).map((consultation: any) => (
                          <div key={consultation.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {consultation.type === 'INITIAL'
                                    ? 'Consultation initiale'
                                    : consultation.type === 'SPECIALISEE'
                                    ? 'Consultation spécialisée'
                                    : 'Consultation standard'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {formatDate(consultation.date)}
                                </p>
                              </div>
                              <div className="text-sm text-blue-600">
                                Dr. {consultation.medecin?.prenom || 'N/A'} {consultation.medecin?.nom || ''}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <motion.button
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                      onClick={handleViewProfile}
                    >
                      <span>Voir le profil complet</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <User size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">Patient non trouvé</p>
                  <p className="text-gray-500 text-center">
                    Impossible de charger les informations du patient.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
