import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const patientId = parseInt(req.query.id as string);

  if (isNaN(patientId)) {
    return res.status(400).json({ error: "ID de patient invalide." });
  }

  if (req.method === "DELETE") {
    try {
      // Supprime le patient
      await prisma.patient.delete({
        where: { id: patientId },
      });

      return res.status(200).json({ message: "Patient supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return res.status(500).json({ error: "Erreur interne lors de la suppression." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  }
}
