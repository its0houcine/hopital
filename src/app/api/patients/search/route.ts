import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Cache simple avec Map
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

// Fonction pour nettoyer le cache si nécessaire
const cleanCache = () => {
  if (cache.size > MAX_CACHE_SIZE) {
    // Supprimer les entrées les plus anciennes
    const entriesToDelete = [...cache.entries()]
      .sort((a, b) => a[1].timestamp - b[1].timestamp)
      .slice(0, Math.floor(MAX_CACHE_SIZE / 2))
      .map(entry => entry[0]);

    entriesToDelete.forEach(key => cache.delete(key));
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term');

    if (!term) {
      return NextResponse.json([], {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Vérifier le cache
    const cacheKey = term.toLowerCase();
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      const { data, timestamp } = cachedData;
      // Vérifier si le cache est encore valide
      if (Date.now() - timestamp < CACHE_TTL) {
        return NextResponse.json(data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Supprimer l'entrée expirée
        cache.delete(cacheKey);
      }
    }

    // Optimisation de la recherche
    const searchTerms = term.toLowerCase().split(' ').filter(t => t.length > 0);

    // Construire la requête de recherche
    const searchQuery = {
      where: {
        OR: [
          { nom: { contains: term, mode: 'insensitive' } },
          { prenom: { contains: term, mode: 'insensitive' } },
          { numero_patient: { contains: term, mode: 'insensitive' } },
          { telephone: { contains: term, mode: 'insensitive' } },
          // Recherche par numéro de téléphone sans espaces ni caractères spéciaux
          {
            telephone: {
              contains: term.replace(/[\s\-\.\(\)]/g, ''),
              mode: 'insensitive'
            }
          },
          // Recherche par numéro de patient sans espaces
          {
            numero_patient: {
              contains: term.replace(/\s/g, ''),
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        numero_patient: true,
        nom: true,
        prenom: true,
        telephone: true,
        genre: true,
        date_naissance: true,
        photo: true,
        medecinId: true,
        medecin: {
          select: {
            id: true,
            specialite: true,
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      },
      take: 10,
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }]
    };

    // Ajouter les recherches combinées si nécessaire
    if (searchTerms.length > 1) {
      searchQuery.where.OR.push(
        {
          AND: [
            { nom: { contains: searchTerms[0], mode: 'insensitive' } },
            { prenom: { contains: searchTerms[1], mode: 'insensitive' } }
          ]
        },
        {
          AND: [
            { prenom: { contains: searchTerms[0], mode: 'insensitive' } },
            { nom: { contains: searchTerms[1], mode: 'insensitive' } }
          ]
        }
      );
    }

    // Exécuter la requête
    const patients = await prisma.patient.findMany(searchQuery);

    // Formater les résultats
    const formattedPatients = patients.map(patient => {
      // Créer un nouvel objet pour éviter de modifier l'original
      const formattedPatient = {
        id: patient.id,
        numero_patient: patient.numero_patient,
        nom: patient.nom,
        prenom: patient.prenom,
        telephone: patient.telephone,
        genre: patient.genre,
        photo: patient.photo,
        medecinId: patient.medecinId,
        // Gérer date_naissance qui peut être null
        date_naissance: patient.date_naissance ? patient.date_naissance.toISOString() : null,
        // Gérer medecin qui peut être null
        medecin: patient.medecin ? {
          id: patient.medecin.id,
          specialite: patient.medecin.specialite,
          nom: patient.medecin.user.nom,
          prenom: patient.medecin.user.prenom
        } : null
      };

      return formattedPatient;
    });

    // Mettre en cache le résultat
    cache.set(cacheKey, {
      data: formattedPatients,
      timestamp: Date.now()
    });

    // Nettoyer le cache si nécessaire
    cleanCache();

    return NextResponse.json(formattedPatients, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
