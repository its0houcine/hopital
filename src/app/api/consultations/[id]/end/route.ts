import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Terminer une consultation
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = parseInt(params.id);

    if (isNaN(consultationId)) {
      return NextResponse.json(
        { error: "ID de consultation invalide" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { diagnostic, traitement, notes, type, patientId, medecinId } = body;

    // Vérifier les données requises
    if (!patientId || !medecinId) {
      return NextResponse.json(
        { error: "patientId et medecinId sont requis" },
        { status: 400 }
      );
    }

    // Utiliser une transaction pour garantir l'atomicité
    const result = await prisma.$transaction(async (tx) => {
      // Créer un timestamp pour la fin de la consultation
      const now = new Date();

      // 1. Mettre à jour la consultation
      const updatedConsultation = await tx.consultation.update({
        where: { id: consultationId },
        data: {
          diagnostic: diagnostic || null,
          traitement: traitement || null,
          notes: notes || null,
          type: type || 'STANDARD',
          fin: now // Enregistrer l'heure de fin de la consultation
        },
        include: {
          patient: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              numero_patient: true,
              photo: true
            }
          },
          medecin: {
            include: {
              user: {
                select: {
                  id: true,
                  nom: true,
                  prenom: true
                }
              }
            }
          }
        }
      });

      // 2. Mettre à jour le statut dans la file d'attente
      const fileAttente = await tx.fileAttente.findFirst({
        where: {
          patientId: parseInt(patientId),
          medecinId: parseInt(medecinId),
          statut: 'EN_COURS'
        }
      });

      if (fileAttente) {
        await tx.fileAttente.delete({
          where: { id: fileAttente.id }
        });
      }

      // 3. Créer l'historique
      await tx.historiqueConsultation.create({
        data: {
          patientId: parseInt(patientId),
          medecinId: parseInt(medecinId),
          action: 'FIN_TRAITEMENT',
          date: new Date()
        }
      });

      return updatedConsultation;
    });

    // Formater la réponse
    const formattedConsultation = {
      id: result.id,
      patientId: result.patientId,
      medecinId: result.medecinId,
      date: result.date.toISOString(),
      diagnostic: result.diagnostic,
      traitement: result.traitement,
      notes: result.notes,
      type: result.type,
      cree_le: result.cree_le.toISOString(),
      // Inclure les champs de durée
      debut: result.debut.toISOString(),
      fin: result.fin ? result.fin.toISOString() : null,
      // Calculer la durée en minutes
      duree: result.fin && result.debut ?
        Math.round((result.fin.getTime() - result.debut.getTime()) / (1000 * 60)) :
        null,
      patient: result.patient,
      medecin: {
        id: result.medecin.id,
        specialite: result.medecin.specialite,
        nom: result.medecin.user.nom,
        prenom: result.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedConsultation);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la fin de la consultation" },
      { status: 500 }
    );
  }
}
