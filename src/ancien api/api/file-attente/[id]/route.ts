import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/file-attente/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const medecinId = parseInt(id);
    
    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID du médecin invalide" },
        { status: 400 }
      );
    }

    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecin_id: medecinId,
        statut: 'EN_ATTENTE',
      },
      include: {
        patient: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            telephone: true,
            photo: true,
            numero_patient: true
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

// DELETE /api/file-attente/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const medecinId = parseInt(params.id);
    
    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID du médecin invalide" },
        { status: 400 }
      );
    }

    await prisma.fileAttente.deleteMany({
      where: {
        medecin_id: medecinId,
        statut: 'EN_ATTENTE'
      }
    });

    return NextResponse.json({ message: "File d'attente vidée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la file d'attente:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la file d'attente" },
      { status: 500 }
    );
  }
}




