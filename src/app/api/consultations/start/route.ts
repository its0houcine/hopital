import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("Démarrage de la consultation - API appelée");

    // Récupérer et valider le corps de la requête
    const body = await request.json();
    console.log("Corps de la requête:", body);

    const { fileAttenteId, medecinId } = body;

    if (!fileAttenteId || !medecinId) {
      return NextResponse.json(
        { error: "fileAttenteId et medecinId sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si la file d'attente existe
    console.log("Recherche de la file d'attente:", fileAttenteId);

    let fileAttente;
    try {
      fileAttente = await prisma.fileAttente.findUnique({
        where: { id: fileAttenteId },
        include: {
          patient: true,
        },
      });

      console.log("File d'attente trouvée:", fileAttente ? "Oui" : "Non");
    } catch (error) {
      console.error("Erreur lors de la recherche de la file d'attente:", error);
      return NextResponse.json(
        { error: "Erreur lors de la recherche de la file d'attente" },
        { status: 500 }
      );
    }

    if (!fileAttente) {
      console.log("File d'attente non trouvée");
      return NextResponse.json(
        { error: "File d'attente non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier si le médecin existe
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinId },
    });

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        { status: 404 }
      );
    }

    // Nous ne vérifions plus si une consultation est déjà en cours
    // car nous voulons permettre plusieurs consultations par jour

    // Mettre à jour le statut de la file d'attente
    await prisma.fileAttente.update({
      where: { id: fileAttenteId },
      data: { statut: "EN_COURS" },
    });

    // Nous n'avons pas besoin de créer une entrée dans l'historique ici
    // car nous créons déjà une consultation juste après

    // Créer une nouvelle consultation
    // Utiliser un bloc try/catch spécifique pour cette opération
    let consultation;
    try {
      console.log("Création de la consultation avec:", {
        patientId: fileAttente.patientId,
        medecinId,
        date: new Date(),
      });

      // Créer un timestamp pour le début de la consultation
      const now = new Date();

      consultation = await prisma.consultation.create({
        data: {
          patientId: fileAttente.patientId,
          medecinId,
          date: now,
          debut: now, // Explicitement définir le début de la consultation
          type: "STANDARD", // Valeur par défaut
        },
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            numero_patient: true,
            photo: true,
            telephone: true,
            genre: true,
            date_naissance: true,
            antecedent: true,
            diagnostic: true,
          },
        },
        medecin: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
              },
            },
          },
        },
      },
    });
    } catch (error) {
      console.error("Erreur lors de la création de la consultation:", error);

      // Essayer de récupérer plus d'informations sur l'erreur
      let errorMessage = "Erreur lors de la création de la consultation";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Annuler la mise à jour du statut de la file d'attente
      try {
        await prisma.fileAttente.update({
          where: { id: fileAttenteId },
          data: { statut: "EN_ATTENTE" },
        });
        console.log("Statut de la file d'attente remis à EN_ATTENTE");
      } catch (rollbackError) {
        console.error("Erreur lors de l'annulation de la mise à jour du statut:", rollbackError);
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Formater la réponse
    const formattedConsultation = {
      id: consultation.id,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      date: consultation.date.toISOString(),
      diagnostic: consultation.diagnostic,
      traitement: consultation.traitement,
      notes: consultation.notes,
      type: consultation.type,
      // Inclure les champs de durée
      debut: consultation.debut.toISOString(),
      fin: consultation.fin ? consultation.fin.toISOString() : null,
      statut: "EN_COURS",
      patient: {
        ...consultation.patient,
        date_naissance: consultation.patient.date_naissance.toISOString(),
      },
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom,
      },
    };

    // Ajouter des en-têtes pour éviter la mise en cache
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");
    headers.append("X-Response-Time", Date.now().toString());

    return NextResponse.json(formattedConsultation, { headers });
  } catch (error) {
    console.error("Erreur lors du démarrage de la consultation:", error);
    return NextResponse.json(
      { error: "Erreur lors du démarrage de la consultation" },
      { status: 500 }
    );
  }
}
