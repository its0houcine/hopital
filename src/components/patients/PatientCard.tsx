'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar } from 'lucide-react';
import DeleteButton from '../ui/DeleteButton';

interface PatientCardProps {
  patient: {
    id: number;
    nom: string;
    prenom: string;
    numero_patient: string;
    telephone?: string;
    date_naissance?: string;
    genre?: string;
    photo?: string;
    adresse?: string;
    medecin?: {
      nom: string;
      prenom: string;
      specialite: string;
    };
  };
  index: number;
  onClick?: () => void;
}

export default function PatientCard({ patient, index, onClick }: PatientCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/patients/${patient.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Rafraîchir la page après suppression
        router.refresh();
      } else {
        const error = await response.json();
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du patient');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du patient');
    }
  };

  // Formater la date de naissance
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)',
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
      transition: {
        duration: 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick || (() => router.push(`/patients/${patient.id}`))}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
            variants={imageVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {patient.photo ? (
              <Image
                src={patient.photo}
                alt={`${patient.prenom} ${patient.nom}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <User size={24} className="text-gray-400" />
            )}
          </motion.div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {patient.prenom} {patient.nom}
            </h3>
            <p className="text-sm text-gray-500">
              {patient.numero_patient}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <motion.div
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick ? onClick() : router.push(`/patients/${patient.id}`);
              }}
            >
              Voir profil
            </motion.div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <DeleteButton
                onDelete={handleDelete}
                itemName="patient"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <motion.div
          variants={detailsVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          className="mt-3 overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Phone size={14} />
              <span>{patient.telephone || 'Non renseigné'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar size={14} />
              <span>{formatDate(patient.date_naissance)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={14} />
              <span className="truncate">{patient.adresse || 'Non renseigné'}</span>
            </div>
            {patient.medecin && (
              <div className="flex items-center gap-1 text-gray-600">
                <User size={14} />
                <span>Dr. {patient.medecin.prenom} {patient.medecin.nom}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"></div>
    </motion.div>
  );
}
