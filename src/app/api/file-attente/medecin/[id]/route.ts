import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer la file d'attente d'un médecin
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Utiliser await pour accéder aux propriétés de params
    const id = await Promise.resolve(params.id);
    const medecinId = parseInt(id);

    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID du médecin invalide" },
        { status: 400 }
      );
    }

    // Vérifier si le médecin existe
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinId }
    });

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer la file d'attente complète (EN_ATTENTE et EN_COURS)
    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: {
          in: ['EN_ATTENTE', 'EN_COURS']
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
            genre: true,
            date_naissance: true,
            telephone: true,
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
                prenom: true
              }
            }
          }
        }
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Formater la réponse
    const formattedFileAttente = fileAttente.map(item => ({
      id: item.id,
      patient: {
        ...item.patient,
        date_naissance: item.patient.date_naissance.toISOString()
      },
      medecin: {
        id: item.medecin.id,
        userId: item.medecin.userId,
        specialite: item.medecin.specialite,
        nom: item.medecin.user.nom,
        prenom: item.medecin.user.prenom,
        telephone: item.medecin.telephone,
        adresse: item.medecin.adresse,
      },
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
    }));

    // Ajouter des en-têtes pour éviter la mise en cache
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");
    headers.append("X-Response-Time", Date.now().toString());

    return NextResponse.json(formattedFileAttente, { headers });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la file d'attente" },
      { status: 500 }
    );
  }
}

// Réorganiser la file d'attente d'un médecin
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Utiliser await pour accéder aux propriétés de params
    const id = await Promise.resolve(params.id);
    const medecinId = parseInt(id);

    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID du médecin invalide" },
        { status: 400 }
      );
    }

    // Récupérer la file d'attente actuelle
    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Réorganiser les ordres
    const updates = fileAttente.map((item, index) => {
      return prisma.fileAttente.update({
        where: { id: item.id },
        data: { ordre: index + 1 }
      });
    });

    // Exécuter toutes les mises à jour
    await prisma.$transaction(updates);

    // Récupérer la file d'attente mise à jour
    const updatedFileAttente = await prisma.fileAttente.findMany({
      where: {
        medecinId,
        statut: 'EN_ATTENTE'
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
        }
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    // Formater la réponse
    const formattedFileAttente = updatedFileAttente.map(item => ({
      id: item.id,
      patientId: item.patientId,
      medecinId: item.medecinId,
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
      patient: item.patient
    }));

    return NextResponse.json(formattedFileAttente);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la réorganisation de la file d'attente" },
      { status: 500 }
    );
  }
}
