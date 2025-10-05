'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PatientCard from './PatientCard';
import PatientCardSkeleton from './PatientCardSkeleton';
import Pagination from '../ui/Pagination';
import SearchFilters from './SearchFilters';
import { Plus, RefreshCw } from 'lucide-react';

interface PatientsListProps {
  initialPatients: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  medecins: any[];
  onAddPatient: () => void;
  onPatientClick?: (patientId: number) => void;
}

export default function PatientsList({
  initialPatients,
  initialPagination,
  medecins,
  onAddPatient,
  onPatientClick
}: PatientsListProps) {
  const [patients, setPatients] = useState(initialPatients);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(initialPagination.page);

  // Référence pour le scroll
  const listRef = useRef<HTMLDivElement>(null);

  // Observer pour détecter quand la liste est visible
  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Fonction pour charger les patients

  const loadPatients = useCallback(async () => {
    // Éviter les appels multiples pendant le chargement
    if (loading) return;

    setLoading(true);

    try {
      // Construire l'URL avec les paramètres actuels (pas de références)
      let url = `/api/patients?page=${currentPage}&limit=12`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (filters.medecinId) {
        url += `&medecinId=${filters.medecinId}`;
      }

      if (filters.genre) {
        url += `&genre=${encodeURIComponent(filters.genre)}`;
      }

      console.log('Chargement des patients:', url);

      // Ajouter un timestamp pour éviter la mise en cache
      url += `&_t=${Date.now()}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes timeout

      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Vérifier que les données sont valides
      if (!data.patients || !Array.isArray(data.patients)) {
        throw new Error('Format de données invalide');
      }

      setPatients(data.patients);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
      // Ne pas mettre à jour l'état en cas d'erreur pour conserver les données existantes
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filters, loading]);

  // Référence pour suivre si c'est le premier rendu et les appels précédents
  const isFirstRender = useRef(true);
  const previousRequest = useRef('');

  // Charger les patients uniquement lorsque les filtres ou la page changent
  useEffect(() => {
    // Ne pas charger les données au premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Construire la requête actuelle pour la comparer avec la précédente
    const currentRequest = JSON.stringify({
      page: currentPage,
      search: searchTerm,
      medecinId: filters.medecinId,
      genre: filters.genre
    });

    // Ne pas recharger si la requête est identique à la précédente
    if (currentRequest === previousRequest.current) {
      return;
    }

    // Mettre à jour la référence de la requête précédente
    previousRequest.current = currentRequest;

    // Ajouter un délai pour éviter les appels trop fréquents
    const timer = setTimeout(() => {
      loadPatients();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchTerm, filters.medecinId, filters.genre]);

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Scroll en haut de la liste
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="space-y-6" ref={listRef}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Patients
          {pagination.total > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({pagination.total})
            </span>
          )}
        </h1>

        <div className="flex gap-2">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            onClick={loadPatients}
          >
            <RefreshCw size={16} />
            <span>Actualiser</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-lg shadow-md hover:shadow-lg"
            onClick={onAddPatient}
          >
            <Plus size={16} />
            <span>Nouveau patient</span>
          </motion.button>
        </div>
      </div>

      <SearchFilters
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        medecins={medecins}
      />

      <div ref={observerRef}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <PatientCardSkeleton key={`skeleton-${index}`} index={index} />
              ))}
            </motion.div>
          ) : patients.length > 0 ? (
            <motion.div
              key="patients"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {patients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  index={index}
                  onClick={onPatientClick ? () => onPatientClick(patient.id) : undefined}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun patient trouvé
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                {searchTerm || filters.medecinId || filters.genre
                  ? "Aucun patient ne correspond à vos critères de recherche."
                  : "Vous n'avez pas encore ajouté de patients."}
              </p>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-lg shadow-md hover:shadow-lg"
                onClick={onAddPatient}
              >
                <Plus size={16} />
                <span>Ajouter un patient</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
