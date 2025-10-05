import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import multer from "multer";
import { promisify } from "util";

// Configuration de Multer pour l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("photo");
const uploadMiddleware = promisify(upload);

const DEFAULT_AVATAR = '/images/default-avatar.png';

export const config = {
  api: {
    bodyParser: false
  }
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const formData = await request.formData();
    const updateData: Record<string, any> = {};

    // Champs de type DateTime selon le modèle Prisma
    const dateFields = [
      'date_naissance',
      'consultation',
      'consultation_specialisee',
      'ct_sim',
      'debut_traitement',
      'fin_traitement',
      'rdv_traitement'
    ];

    // Champs de type Float selon le modèle Prisma
    const floatFields = ['dose_totale', 'dose_fraction'];

    // Champs à exclure car gérés automatiquement
    const excludeFields = ['id', 'cree_le', 'medecin_id'];

    for (const [key, value] of formData.entries()) {
      if (value === '' || value === undefined || value === null || excludeFields.includes(key)) continue;

      if (dateFields.includes(key) && typeof value === 'string') {
        updateData[key] = new Date(value).toISOString();
      } else if (floatFields.includes(key)) {
        updateData[key] = parseFloat(value as string);
      } else if (key === 'photo' && value instanceof File) {
        const fileName = `${Date.now()}-${value.name}`;
        const filePath = `/uploads/${fileName}`;
        
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const { writeFile, mkdir } = require('fs/promises');
        const { join } = require('path');
        
        await mkdir('public/uploads', { recursive: true });
        await writeFile(join(process.cwd(), 'public', 'uploads', fileName), buffer);
        
        updateData[key] = filePath;
      } else if (key === 'genre') {
        // Validation du genre selon l'enum Genre
        if (['Homme', 'Femme', 'Autre'].includes(value as string)) {
          updateData[key] = value;
        }
      } else {
        // Autres champs de type String
        updateData[key] = value;
      }
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du patient' },
      { status: 500 }
    );
  }
}


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: Number(params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient non trouvé" }, { status: 404 });
    }

    // Si pas de photo, utiliser l'avatar par défaut
    if (!patient.photo) {
      patient.photo = DEFAULT_AVATAR;
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}










