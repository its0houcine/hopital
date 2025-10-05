import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import multer from "multer";
import { promisify } from "util";

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    await uploadMiddleware(req as any, res as any);

    const { nom, prenom, telephone, date_naissance, numero_patient, genre, adresse } = req.body;

    if (!nom || !prenom || !date_naissance || !numero_patient || !genre || !adresse) {
      return res.status(400).json({ error: "Tous les champs requis doivent être remplis." });
    }

    const imagePath = (req as any).file ? `/uploads/${(req as any).file.filename}` : null;

    // Utilisation d'une transaction pour garantir l'atomicité
    const newPatient = await prisma.$transaction(async (prisma) => {
      const patient = await prisma.patient.create({
        data: {
          nom,
          prenom,
          telephone: telephone || null,
          adresse,
          date_naissance: new Date(date_naissance),
          numero_patient,
          genre,
          photo: imagePath,
        },
      });

      return patient;
    });

    return res.status(201).json(newPatient);
  } catch (error) {
    console.error("Erreur lors de l'ajout du patient :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
}
