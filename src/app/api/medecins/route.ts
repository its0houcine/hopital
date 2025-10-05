import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

// Fonction utilitaire pour traiter les photos
async function processPhoto(file: File) {
  try {
    console.log(`Traitement de la photo: ${file.name}, taille: ${file.size} bytes`);

    // Vérifier que le fichier est valide
    if (!file.size) {
      throw new Error("Le fichier est vide");
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

    console.log(`Photo enregistrée avec succès: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Erreur lors du traitement de la photo:", error);
    throw new Error(`Erreur lors du traitement de la photo: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Récupérer tous les médecins
export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de requête
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const specialite = searchParams.get('specialite') || '';

    // Calculer l'offset pour la pagination
    const skip = (page - 1) * limit;

    // Construire les conditions de recherche
    const whereConditions: any = {};

    if (search) {
      whereConditions.OR = [
        { user: { nom: { contains: search, mode: 'insensitive' } } },
        { user: { prenom: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }

    if (specialite) {
      whereConditions.specialite = { contains: specialite, mode: 'insensitive' };
    }

    // Récupérer les médecins avec pagination et filtres
    const [medecins, totalMedecins] = await Promise.all([
      prisma.medecin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              photo: true,
              cree_le: true,
              role: true
            }
          }
        }
      }),
      prisma.medecin.count({ where: whereConditions })
    ]);

    // Formater les données pour l'API
    const formattedMedecins = medecins.map(medecin => ({
      id: medecin.id,
      userId: medecin.userId,
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      email: medecin.user.email,
      telephone: medecin.telephone,
      specialite: medecin.specialite,
      photo: medecin.user.photo,
      cree_le: medecin.user.cree_le.toISOString(),
      role: medecin.user.role
    }));

    // Ajouter les en-têtes pour éviter la mise en cache
    return NextResponse.json(formattedMedecins, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des médecins" },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}

// Créer un nouveau médecin
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Valider les champs requis
    const requiredFields = ['nom', 'prenom', 'email', 'mot_de_passe', 'specialite'];
    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          }
        );
      }
    }

    // Valider l'email
    const email = formData.get('email') as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Valider le mot de passe
    const motDePasse = formData.get('mot_de_passe') as string;
    if (motDePasse.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Traiter la photo si elle existe
    let photoPath = null;
    const photoFile = formData.get('photo') as File;
    if (photoFile && photoFile.size > 0) {
      try {
        photoPath = await processPhoto(photoFile);
      } catch (photoError) {
        return NextResponse.json(
          { error: photoError instanceof Error ? photoError.message : "Erreur lors du traitement de la photo" },
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          }
        );
      }
    }

    // Utiliser une transaction pour créer à la fois l'utilisateur et le médecin
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer l'utilisateur
      const hashedPassword = await hash(motDePasse, 10);

      const user = await tx.user.create({
        data: {
          nom: formData.get('nom') as string,
          prenom: formData.get('prenom') as string,
          email: email,
          mot_de_passe: hashedPassword,
          role: 'medecin',
          photo: photoPath
        }
      });

      // 2. Créer le médecin associé
      const medecin = await tx.medecin.create({
        data: {
          specialite: formData.get('specialite') as string,
          telephone: formData.get('telephone') as string || null,
          userId: user.id
        },
        include: {
          user: true
        }
      });

      return {
        id: medecin.id,
        userId: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: medecin.telephone,
        specialite: medecin.specialite,
        photo: user.photo,
        cree_le: user.cree_le.toISOString(),
        role: user.role
      };
    });

    return NextResponse.json(result, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error("Erreur lors de la création du médecin:", error);

    // Déterminer le message d'erreur à renvoyer
    let errorMessage = "Erreur lors de la création du médecin";
    let statusCode = 500;

    if (error instanceof Error) {
      // Inclure le message d'erreur original pour plus de détails
      errorMessage = `Erreur lors de la création du médecin: ${error.message}`;

      // Vérifier si c'est une erreur Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        // @ts-ignore - Propriété spécifique à Prisma
        const code = (error as any).code;

        if (code === 'P2002') {
          errorMessage = "Un médecin avec cet email existe déjà";
          statusCode = 400;
        }
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}
