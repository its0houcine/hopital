import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const fileAttente = await prisma.fileAttente.findMany({
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
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        }
      },
      orderBy: {
        ordre: 'asc'
      }
    });

    return NextResponse.json(fileAttente);
  } catch (error) {
    console.error("Erreur lors de la récupération de la file d'attente:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la file d'attente" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, medecinId, statut = "EN_ATTENTE" } = body;

    if (!patientId || !medecinId) {
      return NextResponse.json(
        { error: "patientId et medecinId sont requis" },
        { status: 400 }
      );
    }

    // Conversion et validation stricte des IDs
    const safePatientId = Number(patientId);
    const safeMedecinId = Number(medecinId);

    // Vérification que les IDs sont des entiers valides et dans la plage PostgreSQL INT4
    if (!Number.isInteger(safePatientId) || !Number.isInteger(safeMedecinId) ||
        safePatientId > 2147483647 || safePatientId < 1 ||
        safeMedecinId > 2147483647 || safeMedecinId < 1) {
      return NextResponse.json(
        { error: "ID invalide - doit être un entier positif valide" },
        { status: 400 }
      );
    }

    // Vérifier que le patient existe
    const patient = await prisma.patient.findUnique({
      where: { id: safePatientId }
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    const fileAttente = await prisma.$transaction(async (prisma) => {
      const lastInQueue = await prisma.fileAttente.findFirst({
        where: {
          statut: "EN_ATTENTE"
        },
        select: { ordre: true },
        orderBy: { ordre: 'desc' }
      });
      
      const newOrdre = (lastInQueue?.ordre || 0) + 1;

      return prisma.fileAttente.create({
        data: {
          patient_id: safePatientId,
          medecin_id: safeMedecinId,
          statut,
          ordre: newOrdre
        },
        include: {
          patient: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              numero_patient: true
            }
          },
          medecin: {
            select: {
              id: true,
              nom: true,
              prenom: true
            }
          }
        }
      });
    });

    return NextResponse.json(fileAttente);
  } catch (error) {
    console.error("Erreur lors de l'ajout à la file d'attente:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout à la file d'attente" },
      { status: 500 }
    );
  }
}









