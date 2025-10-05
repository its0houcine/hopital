import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Cache simple pour 5 minutes
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');

  if (!term) {
    return NextResponse.json([]);
  }

  // Vérifier le cache
  const cacheKey = term.toLowerCase();
  const cachedResult = cache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedResult.data);
  }

  try {
    // Séparer les termes de recherche
    const searchTerms = term.toLowerCase().split(' ').filter(t => t.length > 0);
    
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          // Recherche exacte
          { nom: { contains: term, mode: 'insensitive' } },
          { prenom: { contains: term, mode: 'insensitive' } },
          { numero_patient: { contains: term, mode: 'insensitive' } },
          { telephone: { contains: term, mode: 'insensitive' } },
          
          // Recherche combinée nom prénom
          {
            AND: [
              { nom: { contains: searchTerms[0], mode: 'insensitive' } },
              { prenom: { contains: searchTerms[1] || '', mode: 'insensitive' } }
            ]
          },
          // Recherche combinée prénom nom
          {
            AND: [
              { prenom: { contains: searchTerms[0], mode: 'insensitive' } },
              { nom: { contains: searchTerms[1] || '', mode: 'insensitive' } }
            ]
          },
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
      },
      take: 10, // Augmenté à 10 pour plus de résultats pertinents
      orderBy: [
        {
          nom: 'asc'
        },
        {
          prenom: 'asc'
        }
      ]
    });

    const formattedPatients = patients.map(patient => ({
      ...patient,
      date_naissance: patient.date_naissance.toISOString(),
    }));

    // Mettre en cache le résultat
    cache.set(cacheKey, {
      data: formattedPatients,
      timestamp: Date.now()
    });

    return NextResponse.json(formattedPatients);
  } catch (error) {
    console.error('Erreur lors de la recherche des patients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche' }, 
      { status: 500 }
    );
  }
}



