'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Stethoscope } from 'lucide-react';
import DeleteButton from '../ui/DeleteButton';
import { useRouter } from 'next/navigation';

interface MedecinCardProps {
  medecin: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string | null;
    specialite?: string | null;
    photo?: string | null;
  };
  index: number;
  onClick?: () => void;
}

export default function MedecinCard({ medecin, index, onClick }: MedecinCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/medecins/${medecin.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Rafraîchir la page après suppression
        router.refresh();
      } else {
        const error = await response.json();
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du médecin');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du médecin');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.05
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            {medecin.photo ? (
              <img
                src={medecin.photo}
                alt={`${medecin.prenom} ${medecin.nom}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-500 text-xl font-bold">
                {medecin.prenom.charAt(0)}{medecin.nom.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Dr. {medecin.prenom} {medecin.nom}
            </h3>
            {medecin.specialite && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                <Stethoscope size={14} className="mr-1" />
                <span>{medecin.specialite}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Mail size={14} className="mr-2" />
            <span className="truncate">{medecin.email}</span>
          </div>

          {medecin.telephone && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Phone size={14} className="mr-2" />
              <span>{medecin.telephone}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ID: {medecin.id}
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-3 py-1 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick && onClick();
                }}
              >
                Voir détails
              </motion.button>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <DeleteButton
                  onDelete={handleDelete}
                  itemName="médecin"
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
