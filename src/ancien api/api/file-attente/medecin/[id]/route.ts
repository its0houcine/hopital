import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const medecinId = parseInt(id);

    if (isNaN(medecinId)) {
      return NextResponse.json(
        { error: "ID médecin invalide" },
        { status: 400 }
      );
    }

    const fileAttente = await prisma.fileAttente.findMany({
      where: {
        medecin_id: medecinId,
      },
      include: {
        patient: true,
      },
      orderBy: {
        ordre: 'asc',
      },
    });

    return NextResponse.json(fileAttente);
  } catch (error) {
    console.error('Error fetching file attente:', error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la file d'attente" },
      { status: 500 }
    );
  }
}


