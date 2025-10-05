import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';

interface SearchResult {
  id: string;
  type: 'patient' | 'medecin';
  nom: string;
  prenom: string;
  specialite?: string;
  dateNaissance?: string;
  avatar?: string;
}

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const LoadingSpinner = () => (
  <motion.svg
    className="w-5 h-5 text-gray-400"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
);

// Fonction de recherche qui combine patients et médecins
const searchAll = async (query: string): Promise<SearchResult[]> => {
  try {
    // Rechercher les patients
    const patientsResponse = await fetch(`/api/patients/search?term=${encodeURIComponent(query)}`);
    const patients = await patientsResponse.json();
    
    // Rechercher les médecins
    const medecinsResponse = await fetch(`/api/medecins?search=${encodeURIComponent(query)}&limit=5`);
    const medecins = await medecinsResponse.json();

    // Formater les résultats
    const formattedResults: SearchResult[] = [
      ...patients.map((patient: any) => ({
        id: patient.id.toString(),
        type: 'patient',
        nom: patient.nom,
        prenom: patient.prenom,
        dateNaissance: patient.date_naissance,
        avatar: patient.photo
      })),
      ...medecins.map((medecin: any) => ({
        id: medecin.id.toString(),
        type: 'medecin',
        nom: medecin.nom,
        prenom: medecin.prenom,
        specialite: medecin.specialite,
        avatar: medecin.photo
      }))
    ];

    return formattedResults;
  } catch (error) {
    console.error('Erreur de recherche:', error);
    return [];
  }
};

export const IntelligentSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchAll(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    const route = result.type === 'patient' 
      ? `/patients/${result.id}`
      : `/medecins/${result.id}`;
    router.push(route);
    setIsOpen(false);
    setQuery('');
  };

  // Fermer les résultats quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl search-container">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un patient ou un médecin..."
          className="w-full h-10 pl-12 pr-4 rounded-lg border border-gray-300 
                     bg-white dark:bg-gray-800 dark:border-gray-700
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          {isLoading ? <LoadingSpinner /> : <SearchIcon />}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white dark:bg-gray-900 
                     rounded-lg shadow-lg border dark:border-gray-700 
                     max-h-96 overflow-y-auto z-50"
          >
            {results.map((result) => (
              <motion.div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="flex items-center p-3 hover:bg-gray-50 
                         dark:hover:bg-gray-800 border-b last:border-b-0 
                         cursor-pointer"
                whileHover={{ x: 5 }}
              >
                {result.avatar && (
                  <img
                    src={result.avatar}
                    alt={`${result.prenom} ${result.nom}`}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium">
                    {result.nom} {result.prenom}
                  </div>
                  <div className="text-sm text-gray-500">
                    {result.type === 'medecin' 
                      ? `Médecin - ${result.specialite}`
                      : `Patient - ${new Date(result.dateNaissance || '').toLocaleDateString()}`
                    }
                  </div>
                </div>

                <span className={`px-2 py-1 rounded-full text-xs
                  ${result.type === 'patient' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {result.type}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntelligentSearch; 