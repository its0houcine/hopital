'use client';

import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemName: string;
  className?: string;
  compact?: boolean;
}

export default function DeleteButton({ onDelete, itemName, className = "", compact = false }: DeleteButtonProps) {
  const { isSuperAdmin, user } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Vérifier si l'utilisateur est un super admin
  // Ajouter un message de débogage
  console.log('DeleteButton - isSuperAdmin:', isSuperAdmin, 'user:', user);

  // Temporairement désactivé pour le débogage
  // if (!isSuperAdmin) {
  //   return null;
  // }

  const handleDelete = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    try {
      setIsDeleting(true);

      // Animation de suppression
      setIsDeleted(true);

      // Attendre un peu pour que l'animation soit visible
      setTimeout(async () => {
        await onDelete();
        setIsDeleting(false);
        setIsConfirming(false);
      }, 300);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setIsDeleted(false);
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };



  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isDeleted ? {
        opacity: 0,
        scale: 0.8,
        y: -10,
        transition: { duration: 0.3, ease: "easeInOut" }
      } : {}}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      {isConfirming ? (
        <motion.div
          className="flex items-center gap-2 p-1 bg-white rounded-lg shadow-lg border border-gray-100"
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            disabled={isDeleting}
            className={`px-3 py-1.5 text-xs font-medium text-white rounded-md shadow-sm transition-all duration-200
              ${isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-md"}
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          >
            {isDeleting ? (
              <div className="flex items-center gap-1">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Suppression...</span>
              </div>
            ) : (
              "Confirmer"
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleCancel();
            }}
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Annuler
          </button>
        </motion.div>
      ) : (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDelete();
          }}
          onMouseDown={stopPropagation}
          onTouchStart={stopPropagation}
          className={`flex items-center ${compact ? 'p-1.5' : 'gap-1.5 px-3 py-1.5'} text-xs font-medium text-white rounded-lg shadow-sm transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 4px 8px rgba(239, 68, 68, 0.25)"
          }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Trash2 size={14} className="text-white" />
          {!compact && <span>Supprimer {itemName}</span>}
        </motion.button>
      )}
    </motion.div>
  );
}
