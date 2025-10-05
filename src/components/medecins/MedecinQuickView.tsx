'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Stethoscope, User, Calendar, Clock, X } from 'lucide-react';
import Link from 'next/link';

interface MedecinQuickViewProps {
  medecinId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MedecinQuickView({ medecinId, isOpen, onClose }: MedecinQuickViewProps) {
  const [medecin, setMedecin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (isOpen && medecinId) {
      loadMedecinDetails();
    }
  }, [isOpen, medecinId]);

  const loadMedecinDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ajouter un timestamp pour éviter la mise en cache
      const timestamp = Date.now();
      console.log(`Chargement des détails du médecin ID: ${medecinId}, timestamp: ${timestamp}`);

      const response = await fetch(`/api/medecins/${medecinId}?_t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      console.log(`Réponse reçue avec statut: ${response.status}`);

      // Récupérer le texte de la réponse pour le débogage
      const responseText = await response.text();
      console.log("Réponse brute:", responseText.substring(0, 100) + (responseText.length > 100 ? '...' : ''));

      if (!response.ok) {
        // Essayer de parser le JSON si possible
        let errorMessage = `Erreur HTTP: ${response.status} ${response.statusText}`;

        try {
          if (responseText && responseText.trim().startsWith('{')) {
            const errorData = JSON.parse(responseText);
            if (errorData.error) {
              errorMessage = errorData.error;
            }
          }
        } catch (parseError) {
          console.error("Erreur lors du parsing de l'erreur:", parseError);
        }

        throw new Error(errorMessage);
      }

      // Parser le JSON
      let data;
      try {
        // Si la réponse est vide, c'est une erreur
        if (!responseText.trim()) {
          throw new Error("Réponse vide du serveur");
        }

        data = JSON.parse(responseText);

        // Vérifier que la réponse contient les données attendues
        if (!data || !data.id) {
          throw new Error("Format de réponse invalide");
        }

        console.log("Médecin chargé avec succès:", data.id);
      } catch (parseError) {
        console.error("Erreur lors du parsing JSON:", parseError);
        console.error("Réponse non valide:", responseText.substring(0, 200));
        throw new Error("Format de réponse invalide");
      }

      setMedecin(data);
    } catch (error) {
      console.error('Erreur lors du chargement des détails du médecin:', error);
      setError(error instanceof Error ? error.message : 'Impossible de charger les détails du médecin.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-0 overflow-hidden">
      {loading ? (
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Chargement des détails...</p>
        </div>
      ) : error ? (
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
            <X size={24} />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
      ) : medecin ? (
        <>
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
            >
              <X size={18} />
            </button>
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                {medecin.photo ? (
                  <img
                    src={medecin.photo}
                    alt={`${medecin.prenom} ${medecin.nom}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-500 text-3xl font-bold border-4 border-white">
                    {medecin.prenom.charAt(0)}{medecin.nom.charAt(0)}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dr. {medecin.prenom} {medecin.nom}
                </h2>
                {medecin.specialite && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <Stethoscope size={16} className="mr-2" />
                    <span>{medecin.specialite}</span>
                  </div>
                )}
              </div>
              <Link href={`/medecins/${medecin.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-lg shadow-sm"
                >
                  Voir profil complet
                </motion.button>
              </Link>
            </div>

            <div className="mt-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'info'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  Informations
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'patients'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('patients')}
                >
                  Patients
                </button>
              </div>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {activeTab === 'info' ? (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-gray-800">{medecin.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Téléphone</p>
                          <p className="text-gray-800">{medecin.telephone || 'Non renseigné'}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">ID Utilisateur</p>
                          <p className="text-gray-800">{medecin.userId}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Date d'inscription</p>
                          <p className="text-gray-800">{formatDate(medecin.cree_le)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="patients"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {medecin.patients && medecin.patients.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {medecin.patients.map((patient: any) => (
                          <div
                            key={patient.id}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                          >
                            {patient.photo ? (
                              <img
                                src={patient.photo}
                                alt={patient.nom}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold mr-3">
                                {patient.prenom.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-gray-800 font-medium">
                                {patient.prenom} {patient.nom}
                              </p>
                              <p className="text-xs text-gray-500">
                                #{patient.numero_patient}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                          <User size={24} />
                        </div>
                        <p className="text-gray-500">Aucun patient assigné à ce médecin</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  );
}
