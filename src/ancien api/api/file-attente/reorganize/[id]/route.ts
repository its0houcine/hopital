import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Attendre que les paramètres soient disponibles
    const { id } = await Promise.resolve(params);
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
      orderBy: {
        ordre: 'asc',
      },
    });

    const updates = fileAttente.map((item, index) => {
      return prisma.fileAttente.update({
        where: { id: item.id },
        data: { ordre: index + 1 },
      });
    });

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la réorganisation:', error);
    return NextResponse.json(
      { error: "Erreur lors de la réorganisation" },
      { status: 500 }
    );
  }
}
