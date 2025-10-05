'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: any) => void;
}

export default function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
      onFilterChange({ specialite });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, specialite, onSearch, onFilterChange]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSpecialite('');
    onSearch('');
    onFilterChange({});
  };

  // Animation variants
  const containerVariants = {
    collapsed: { height: 60 },
    expanded: { height: 'auto' }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un médecin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isExpanded ? 'Masquer les filtres' : 'Afficher les filtres'}
          </motion.button>

          {(searchTerm || specialite) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              Réinitialiser
            </motion.button>
          )}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Spécialité
              </label>
              <select
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les spécialités</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Oncologie">Oncologie</option>
                <option value="Neurologie">Neurologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Gynécologie">Gynécologie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="ORL">ORL</option>
                <option value="Psychiatrie">Psychiatrie</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
