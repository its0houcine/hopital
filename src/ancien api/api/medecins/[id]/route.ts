import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const medecinId = parseInt(params.id);
  if (isNaN(medecinId)) {
    return NextResponse.json(
      { error: "ID du médecin invalide" },
      { status: 400 }
    );
  }

  try {
    const medecin = await prisma.user.findUnique({
      where: { id: medecinId }
    });

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(medecin);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du médecin" },
      { status: 500 }
    );
  }
}

