// pages/api/patients/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Cette route API permet de récupérer tous les patients
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        id: "desc", // Pour afficher les plus récents d’abord (optionnel)
      },
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error("Erreur lors de la récupération des patients :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
