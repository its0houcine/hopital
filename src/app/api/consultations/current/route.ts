import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer la consultation en cours
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const medecinId = searchParams.get('medecinId');

    if (!medecinId) {
      return NextResponse.json(
        { error: "medecinId est requis" },
        { status: 400 }
      );
    }

    // Convertir en nombre
    const medecinIdNum = parseInt(medecinId);

    if (isNaN(medecinIdNum)) {
      return NextResponse.json(
        { error: "medecinId doit être un nombre" },
        { status: 400 }
      );
    }

    // Récupérer d'abord les patients en cours de consultation dans la file d'attente
    const patientsEnCours = await prisma.fileAttente.findMany({
      where: {
        medecinId: medecinIdNum,
        statut: 'EN_COURS'
      },
      select: {
        patientId: true
      }
    });

    // Si aucun patient n'est en cours de consultation, retourner null
    if (patientsEnCours.length === 0) {
      const headers = new Headers();
      headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
      headers.append("Pragma", "no-cache");
      headers.append("Expires", "0");
      headers.append("X-Response-Time", Date.now().toString());

      return NextResponse.json(null, { headers });
    }

    // Récupérer la consultation la plus récente pour ce médecin et ce patient
    const patientIds = patientsEnCours.map(p => p.patientId);

    const currentConsultation = await prisma.consultation.findFirst({
      where: {
        medecinId: medecinIdNum,
        patientId: {
          in: patientIds
        },
        // Chercher les consultations d'aujourd'hui
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
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
            diagnostic: true
          }
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
      orderBy: {
        date: "desc",
      },
    });

    if (!currentConsultation) {
      // Ajouter des en-têtes pour éviter la mise en cache
      const headers = new Headers();
      headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
      headers.append("Pragma", "no-cache");
      headers.append("Expires", "0");
      headers.append("X-Response-Time", Date.now().toString());

      return NextResponse.json(null, { headers });
    }

    // Formater la réponse
    const formattedConsultation = {
      id: currentConsultation.id,
      patientId: currentConsultation.patientId,
      medecinId: currentConsultation.medecinId,
      date: currentConsultation.date.toISOString(),
      diagnostic: currentConsultation.diagnostic,
      traitement: currentConsultation.traitement,
      notes: currentConsultation.notes,
      type: currentConsultation.type,
      patient: {
        ...currentConsultation.patient,
        date_naissance: currentConsultation.patient.date_naissance.toISOString()
      },
      medecin: {
        id: currentConsultation.medecin.id,
        specialite: currentConsultation.medecin.specialite,
        nom: currentConsultation.medecin.user.nom,
        prenom: currentConsultation.medecin.user.prenom
      }
    };

    // Ajouter des en-têtes pour éviter la mise en cache
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");
    headers.append("X-Response-Time", Date.now().toString());

    return NextResponse.json(formattedConsultation, { headers });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la consultation en cours" },
      { status: 500 }
    );
  }
}
