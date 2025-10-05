import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Fonction utilitaire pour traiter les photos
async function processPhoto(file: File) {
  try {
    // Vérifier que le fichier est valide
    if (!file || !file.size) {
      throw new Error("Le fichier est vide ou invalide");
    }

    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error(`Type de fichier non supporté: ${file.type}. Types acceptés: ${validTypes.join(', ')}`);
    }

    // Limiter la taille du fichier (5 Mo)
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    if (file.size > maxSize) {
      throw new Error(`Fichier trop volumineux: ${(file.size / 1024 / 1024).toFixed(2)} Mo. Maximum: 5 Mo`);
    }

    const bytes = await file.arrayBuffer();
    if (!bytes || bytes.byteLength === 0) {
      throw new Error("Impossible de lire le contenu du fichier");
    }

    const buffer = Buffer.from(bytes);

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${randomString}-${safeFileName}`;
    const filePath = `/uploads/${fileName}`;

    const { writeFile, mkdir } = require('fs/promises');
    const { join } = require('path');

    // Créer le dossier s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Écrire le fichier
    await writeFile(join(uploadDir, fileName), buffer);

    return filePath;
  } catch (error) {
    console.error("Erreur lors du traitement de la photo:", error);
    throw new Error(`Erreur lors du traitement de la photo: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Récupérer tous les patients
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const medecinId = searchParams.get('medecinId');
    const search = searchParams.get('search');
    const genre = searchParams.get('genre');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construire la requête
    const whereClause: any = {};

    // Filtre par médecin
    if (medecinId) {
      whereClause.medecinId = parseInt(medecinId);
    }

    // Filtre par genre
    if (genre) {
      whereClause.genre = genre;
    }

    // Filtre de recherche
    if (search) {
      whereClause.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { prenom: { contains: search, mode: 'insensitive' } },
        { numero_patient: { contains: search, mode: 'insensitive' } }
      ];

      // Ajouter le téléphone à la recherche si c'est un numéro
      if (/^\d+$/.test(search)) {
        whereClause.OR.push({ telephone: { contains: search } });
      }
    }

    // Récupérer les patients avec pagination
    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where: whereClause,
        include: {
          medecin: {
            include: {
              user: {
                select: {
                  nom: true,
                  prenom: true
                }
              }
            }
          }
        },
        orderBy: {
          id: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.patient.count({
        where: whereClause
      })
    ]);

    // Formater les données
    const formattedPatients = patients.map(patient => ({
      ...patient,
      date_naissance: patient.date_naissance?.toISOString() || null,
      medecin: patient.medecin ? {
        id: patient.medecin.id,
        specialite: patient.medecin.specialite,
        nom: patient.medecin.user.nom,
        prenom: patient.medecin.user.prenom
      } : null
    }));

    // Ajouter des en-têtes pour éviter la mise en cache
    return NextResponse.json(
      {
        patients: formattedPatients,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des patients" },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}

// Créer un nouveau patient
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Valider les champs requis
    const requiredFields = ['nom', 'prenom', 'date_naissance', 'numero_patient', 'genre'];
    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Préparer les données du patient
    const patientData: any = {};

    // Traiter les champs de base
    const stringFields = ['nom', 'prenom', 'numero_patient', 'telephone', 'genre', 'adresse'];
    for (const field of stringFields) {
      const value = formData.get(field);
      patientData[field] = value ? String(value).trim() : null;
    }

    // Traiter la date de naissance
    const dateNaissance = formData.get('date_naissance');
    if (dateNaissance) {
      const dateObj = new Date(dateNaissance.toString());
      if (isNaN(dateObj.getTime())) {
        return NextResponse.json(
          { error: "Le format de la date de naissance est invalide" },
          { status: 400 }
        );
      }
      patientData.date_naissance = dateObj;
    }

    // Traiter la photo si elle existe
    const photo = formData.get('photo');
    if (photo instanceof File) {
      try {
        patientData.photo = await processPhoto(photo);
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Erreur lors du traitement de la photo' },
          { status: 400 }
        );
      }
    }

    // Créer le patient
    const newPatient = await prisma.patient.create({
      data: patientData
    });

    return NextResponse.json(newPatient);
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du patient" },
      { status: 500 }
    );
  }
}
