/**
 * Service pour gérer la file d'attente avec des performances optimales
 */

import { Patient } from '@/types';
import { Medecin } from '@/types/medecin';

// Types
export type FileAttenteStatut = 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE';

export interface FileAttenteItem {
  id: number;
  patient: Patient;
  medecin: Medecin;
  statut: FileAttenteStatut;
  ordre: number;
  ajoute_le?: string;
}

// Cache en mémoire pour la file d'attente
const fileAttenteCache = new Map<number, {
  data: FileAttenteItem[];
  timestamp: number;
}>();

// Durée du cache: 5 secondes
const CACHE_DURATION = 5 * 1000;

// Fonction pour récupérer la file d'attente d'un médecin
export async function fetchFileAttenteMedecin(medecinId: number): Promise<FileAttenteItem[]> {
  try {
    // Vérifier si nous sommes en train de traiter une consultation
    const isProcessing = sessionStorage.getItem(`processing-consultation-${medecinId}`) === 'true';

    // Vérifier le cache si nous sommes en train de traiter une consultation
    if (isProcessing) {
      const cachedData = fileAttenteCache.get(medecinId);
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        console.log('Utilisation du cache pour la file d\'attente');
        return cachedData.data;
      }
    }

    // Ajouter un timestamp pour éviter les problèmes de cache
    const timestamp = Date.now();

    const response = await fetch(`/api/file-attente/medecin/${medecinId}?t=${timestamp}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Request-Time': timestamp.toString(),
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Mettre en cache les données
    fileAttenteCache.set(medecinId, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la file d\'attente:', error);

    // En cas d'erreur, utiliser le cache si disponible
    const cachedData = fileAttenteCache.get(medecinId);
    if (cachedData) {
      console.log('Utilisation du cache pour la file d\'attente (après erreur)');
      return cachedData.data;
    }

    throw error;
  }
}

// Fonction pour récupérer le patient actuel (premier de la file d'attente)
export async function fetchCurrentPatient(medecinId: number): Promise<FileAttenteItem | null> {
  try {
    const fileAttente = await fetchFileAttenteMedecin(medecinId);
    // Trouver le premier patient en attente
    return fileAttente.find(item => item.statut === 'EN_ATTENTE') || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du patient actuel:', error);
    throw error;
  }
}

// Cache en mémoire pour la consultation en cours
const consultationCache = new Map<number, {
  data: any;
  timestamp: number;
}>();

// Durée du cache: 5 secondes
const CONSULTATION_CACHE_DURATION = 5 * 1000;

// Fonction pour récupérer la consultation en cours
export async function fetchCurrentConsultation(medecinId: number): Promise<any | null> {
  try {
    // Vérifier si nous sommes en train de traiter une consultation
    const isProcessing = sessionStorage.getItem(`processing-consultation-${medecinId}`) === 'true';

    // Vérifier si la consultation a été terminée récemment
    const isConsultationTerminee = sessionStorage.getItem(`consultation-terminee-${medecinId}`) === 'true';

    // Si la consultation a été terminée, retourner null directement
    if (isConsultationTerminee) {
      return null;
    }

    // Vérifier le cache si nous sommes en train de traiter une consultation
    if (isProcessing) {
      const cachedData = consultationCache.get(medecinId);
      if (cachedData && Date.now() - cachedData.timestamp < CONSULTATION_CACHE_DURATION) {
        console.log('Utilisation du cache pour la consultation en cours');
        return cachedData.data;
      }
    }

    // Ajouter un timestamp pour éviter les problèmes de cache
    const timestamp = Date.now();

    const response = await fetch(`/api/consultations/current?medecinId=${medecinId}&t=${timestamp}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Request-Time': timestamp.toString(),
      },
      // Ajouter un timeout pour éviter les requêtes bloquantes
      signal: AbortSignal.timeout(5000) // 5 secondes de timeout
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Vérifier si la réponse est vide
    const text = await response.text();
    if (!text) {
      console.log('Réponse vide du serveur pour la consultation en cours');
      return null;
    }

    // Essayer de parser la réponse JSON
    try {
      const data = JSON.parse(text);

      // Mettre en cache les données
      if (data) {
        consultationCache.set(medecinId, {
          data,
          timestamp: Date.now()
        });
      }

      return data;
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError, 'Texte reçu:', text);
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la consultation en cours:', error);

    // En cas d'erreur, utiliser le cache si disponible
    const cachedData = consultationCache.get(medecinId);
    if (cachedData) {
      console.log('Utilisation du cache pour la consultation en cours (après erreur)');
      return cachedData.data;
    }

    return null; // Retourner null au lieu de propager l'erreur
  }
}

// Fonction pour démarrer une consultation
export async function startConsultation(fileAttenteId: number, medecinId: number): Promise<any> {
  try {
    // Marquer que nous sommes en train de traiter une consultation
    sessionStorage.setItem(`processing-consultation-${medecinId}`, 'true');

    // Ajouter un timestamp pour éviter les problèmes de cache
    const timestamp = Date.now();

    // Créer un contrôleur d'abandon pour pouvoir annuler la requête si nécessaire
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes de timeout

    try {
      const response = await fetch(`/api/consultations/start?t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Request-Time': timestamp.toString(),
        },
        body: JSON.stringify({
          fileAttenteId,
          medecinId
        }),
        signal: controller.signal
      });

      // Annuler le timeout
      clearTimeout(timeoutId);

      // Vérifier si la réponse est vide
      const text = await response.text();
      if (!text) {
        console.error('Réponse vide du serveur');
        throw new Error('Réponse vide du serveur');
      }

      // Essayer de parser la réponse JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Erreur de parsing JSON:', parseError, 'Texte reçu:', text);
        throw new Error('Erreur de parsing de la réponse du serveur');
      }

      if (!response.ok) {
        console.error('Réponse d\'erreur du serveur:', data);
        throw new Error(data.error || 'Erreur lors du démarrage de la consultation');
      }

      // Mettre en cache la consultation
      consultationCache.set(medecinId, {
        data,
        timestamp: Date.now()
      });

      // Mettre à jour le cache de la file d'attente
      const fileAttente = fileAttenteCache.get(medecinId);
      if (fileAttente) {
        const updatedFileAttente = fileAttente.data.map(item =>
          item.id === fileAttenteId
            ? { ...item, statut: 'EN_COURS' as const }
            : item
        );

        fileAttenteCache.set(medecinId, {
          data: updatedFileAttente,
          timestamp: Date.now()
        });
      }

      console.log('Consultation démarrée avec succès:', data);
      return data;
    } catch (error) {
      // Annuler le timeout en cas d'erreur
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    console.error('Erreur détaillée lors du démarrage de la consultation:', error);

    // Indiquer que nous avons terminé le traitement même en cas d'erreur
    sessionStorage.removeItem(`processing-consultation-${medecinId}`);

    throw error;
  } finally {
    // S'assurer que le flag de traitement est supprimé après un certain délai
    setTimeout(() => {
      sessionStorage.removeItem(`processing-consultation-${medecinId}`);
    }, 5000);
  }
}

// Fonction pour terminer une consultation
export async function endConsultation(
  consultationId: number,
  patientId: number,
  medecinId: number,
  data: {
    diagnostic: string;
    traitement: string;
    notes: string;
    type: 'INITIAL' | 'STANDARD' | 'SPECIALISEE';
  }
): Promise<any> {
  try {
    console.log('Finalisation de la consultation...', { consultationId, patientId, medecinId });

    // Ajouter un timestamp pour éviter les problèmes de cache
    const timestamp = Date.now();

    const response = await fetch(`/api/consultations/${consultationId}/end?t=${timestamp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Request-Time': timestamp.toString(),
      },
      body: JSON.stringify({
        ...data,
        patientId,
        medecinId
      }),
    });

    // Vérifier si la réponse est vide
    const text = await response.text();
    if (!text) {
      console.error('Réponse vide du serveur');
      throw new Error('Réponse vide du serveur');
    }

    // Essayer de parser la réponse JSON
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError, 'Texte reçu:', text);
      throw new Error('Erreur de parsing de la réponse du serveur');
    }

    if (!response.ok) {
      console.error('Réponse d\'erreur du serveur:', responseData);
      throw new Error(responseData.error || 'Erreur lors de la finalisation de la consultation');
    }

    console.log('Consultation terminée avec succès:', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur détaillée lors de la finalisation de la consultation:', error);
    throw error;
  }
}

// Fonction pour mettre à jour le statut d'un patient dans la file d'attente
export async function updatePatientStatus(patientId: number, status: FileAttenteStatut): Promise<any> {
  try {
    const response = await fetch('/api/file-attente/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientId, status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la mise à jour du statut');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    throw error;
  }
}
