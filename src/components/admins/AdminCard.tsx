'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, User, Calendar } from 'lucide-react';
import Image from 'next/image';
import DeleteButton from '../ui/DeleteButton';
import { useAuth } from '@/context/AuthContext';

interface AdminCardProps {
  admin: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    photo?: string;
    cree_le: string;
  };
  index: number;
  onClick?: () => void;
  onDelete?: () => Promise<void>;
}

export default function AdminCard({ admin, index, onClick, onDelete }: AdminCardProps) {
  const { isSuperAdmin } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

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

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } }
  };

  // Formater la date de création
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
               onClick={(e) => e.stopPropagation()}>
            {admin.photo ? (
              <Image
                src={admin.photo}
                alt={`${admin.prenom} ${admin.nom}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <User size={24} className="text-gray-400" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {admin.prenom} {admin.nom}
            </h3>
            <div className="flex items-center mt-1">
              {admin.role === 'super_admin' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Super Admin
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <User className="w-3 h-3 mr-1" />
                  Admin
                </span>
              )}
            </div>
          </div>

          {isSuperAdmin && onDelete && (
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
                onDelete={onDelete}
                itemName="admin"
                className="mt-1"
              />
            </div>
          )}
        </div>

        <motion.div
          variants={detailsVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          className="mt-3 overflow-hidden"
        >
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Mail size={14} />
              <span className="truncate">{admin.email}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar size={14} />
              <span>Créé le {formatDate(admin.cree_le)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"></div>
    </motion.div>
  );
}
