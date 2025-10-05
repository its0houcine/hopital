'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Toujours afficher la première page
    pageNumbers.push(1);
    
    // Calculer la plage de pages à afficher autour de la page actuelle
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Ajouter des ellipses si nécessaire avant la plage
    if (startPage > 2) {
      pageNumbers.push('ellipsis-start');
    }
    
    // Ajouter les pages dans la plage
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Ajouter des ellipses si nécessaire après la plage
    if (endPage < totalPages - 1) {
      pageNumbers.push('ellipsis-end');
    }
    
    // Toujours afficher la dernière page si elle existe
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {/* Bouton précédent */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-50'
        }`}
        aria-label="Page précédente"
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Numéros de page */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1">
              <MoreHorizontal size={20} className="text-gray-400" />
            </span>
          );
        }

        return (
          <motion.button
            key={`page-${page}`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 rounded-md ${
              currentPage === page
                ? 'bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white font-medium shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Bouton suivant */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-50'
        }`}
        aria-label="Page suivante"
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
