"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import EditMedecinModal from "@/components/medecins/EditMedecinModal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Activity,
  Phone,
  Mail,
  Award,
  Calendar as CalendarIcon,
  User,
  FileText,
  ArrowRight,
  ChevronRight,
  Stethoscope
} from "lucide-react";
import Link from "next/link";
import ContentTransition from "@/components/ui/ContentTransition";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  numero_patient: string;
  photo?: string;
}

interface Consultation {
  id: number;
  date: string;
  type: string;
  diagnostic: string | null;
  traitement: string | null;
  notes: string | null;
  patient: {
    id: number;
    nom: string;
    prenom: string;
    photo?: string;
    numero_patient: string;
  };
}

interface HistoriqueConsultation {
  id: number;
  date: string;
  action: string;
  patient: {
    id: number;
    nom: string;
    prenom: string;
    photo?: string;
  };
}

interface MedecinData {
  id: number;
  userId: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  photo?: string;
  cree_le: string;
  role: string;
  patients: Patient[];
  stats: {
    patientsCount: number;
    consultationsCount: number;
    fileAttenteCount: number;
  };
  recentConsultations: Consultation[];
  recentHistorique: HistoriqueConsultation[];
}

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

const StatCard = ({ icon: Icon, title, value, color }: { icon: any, title: string, value: number | string, color: string }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className={`bg-white rounded-2xl p-6 shadow-md overflow-hidden relative`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mt-8 -mr-8 ${color}`}></div>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </motion.div>
);

const PatientCard = ({ patient }: { patient: Patient }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3"
  >
    {patient.photo ? (
      <Image
        src={patient.photo}
        alt={`${patient.prenom} ${patient.nom}`}
        width={40}
        height={40}
        className="rounded-full"
      />
    ) : (
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <User size={16} className="text-blue-500" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-800 truncate">{patient.prenom} {patient.nom}</p>
      <p className="text-xs text-gray-500">#{patient.numero_patient}</p>
    </div>
    <Link href={`/patients/${patient.id}`}>
      <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </Link>
  </motion.div>
);

const ConsultationItem = ({ consultation }: { consultation: Consultation }) => {
  const date = new Date(consultation.date);
  const formattedDate = date.toLocaleDateString('fr-FR');
  const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
    >
      <div className="bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white p-3 rounded-xl">
        <Calendar size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{consultation.patient.prenom} {consultation.patient.nom}</p>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon size={14} className="mr-1" />
          <span>{formattedDate}</span>
          <Clock size={14} className="ml-3 mr-1" />
          <span>{formattedTime}</span>
        </div>
      </div>
      <Link href={`/patients/${consultation.patient.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-blue-50 text-blue-600 rounded-full"
        >
          <ArrowRight size={16} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

const HistoryItem = ({ item }: { item: HistoriqueConsultation }) => {
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString('fr-FR');
  const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-3 py-3"
    >
      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
        <FileText size={16} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{item.action}</p>
        <p className="text-xs text-gray-500">
          Patient: {item.patient.prenom} {item.patient.nom}
        </p>
        <p className="text-xs text-gray-400">{formattedDate} à {formattedTime}</p>
      </div>
    </motion.div>
  );
};

export default function MedecinClient({ medecinData }: { medecinData: MedecinData }) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [currentMedecin, setCurrentMedecin] = useState(medecinData);
  const [activeTab, setActiveTab] = useState('consultations');
  const [isLoading, setIsLoading] = useState(false);

  // Animation pour simuler le chargement des données
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateMedecin = (updatedMedecin: any) => {
    setCurrentMedecin({
      ...currentMedecin,
      ...updatedMedecin
    });
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center" style={{ backgroundColor: "oklch(0.964 0.018 257.5)" }}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col" style={{ backgroundColor: "oklch(0.964 0.018 257.5)" }}>
        {/* Boutons en haut */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center mb-6"
        >
          <button
            onClick={() => router.push("/medecins")}
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition"
          >
            ← Retour
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white font-medium px-4 py-2 rounded-xl shadow hover:shadow-lg transition"
          >
            ✏️ Modifier
          </motion.button>
        </motion.div>

        {/* En-tête du profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] rounded-2xl p-6 shadow-lg mb-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              {currentMedecin.photo ? (
                <Image
                  src={currentMedecin.photo}
                  alt={`Dr. ${currentMedecin.prenom} ${currentMedecin.nom}`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-blue-500">
                    {currentMedecin.prenom[0]}
                    {currentMedecin.nom[0]}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold"
              >
                Dr. {currentMedecin.prenom} {currentMedecin.nom}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row gap-4 mt-2 items-center md:items-start"
              >
                {currentMedecin.specialite && (
                  <div className="flex items-center">
                    <Stethoscope size={16} className="mr-2" />
                    <span>{currentMedecin.specialite}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>{currentMedecin.email}</span>
                </div>
                {currentMedecin.telephone && (
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    <span>{currentMedecin.telephone}</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start"
              >
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Inscrit depuis {new Date(currentMedecin.cree_le).toLocaleDateString('fr-FR')}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {currentMedecin.role === 'medecin' ? 'Médecin' : currentMedecin.role}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne de gauche */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistiques */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <StatCard
                icon={Users}
                title="Patients"
                value={currentMedecin.stats.patientsCount}
                color="bg-blue-500"
              />
              <StatCard
                icon={Calendar}
                title="Consultations"
                value={currentMedecin.stats.consultationsCount}
                color="bg-green-500"
              />
              <StatCard
                icon={Clock}
                title="En attente"
                value={currentMedecin.stats.fileAttenteCount}
                color="bg-orange-500"
              />
            </motion.div>

            {/* Onglets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('consultations')}
                  className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                    activeTab === 'consultations'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Consultations récentes
                  {activeTab === 'consultations' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('patients')}
                  className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                    activeTab === 'patients'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Patients
                  {activeTab === 'patients' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'consultations' && (
                  <motion.div
                    key="consultations"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {currentMedecin.recentConsultations.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {currentMedecin.recentConsultations.map((consultation) => (
                          <ConsultationItem key={consultation.id} consultation={consultation} />
                        ))}
                      </motion.div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="mx-auto mb-2 text-gray-400" size={32} />
                        <p>Aucune consultation récente</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'patients' && (
                  <motion.div
                    key="patients"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {currentMedecin.patients.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {currentMedecin.patients.map((patient) => (
                          <PatientCard key={patient.id} patient={patient} />
                        ))}
                      </motion.div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="mx-auto mb-2 text-gray-400" size={32} />
                        <p>Aucun patient assigné</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* Activité récente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Activité récente</h3>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Activity size={16} />
                </div>
              </div>

              {currentMedecin.recentHistorique.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-100"
                >
                  {currentMedecin.recentHistorique.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="mx-auto mb-2 text-gray-400" size={32} />
                  <p>Aucune activité récente</p>
                </div>
              )}
            </motion.div>

            {/* Compétences et spécialités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Spécialités</h3>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Award size={16} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentMedecin.specialite ? (
                  <span className="bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white px-3 py-1 rounded-full text-sm">
                    {currentMedecin.specialite}
                  </span>
                ) : (
                  <div className="text-center w-full py-4 text-gray-500">
                    <p>Aucune spécialité renseignée</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal de modification avec effet de flou */}
        <EditMedecinModal
          isOpen={isOpen}
          onClose={closeModal}
          medecin={currentMedecin}
          onUpdate={handleUpdateMedecin}
        />
      </div>
  );
}
