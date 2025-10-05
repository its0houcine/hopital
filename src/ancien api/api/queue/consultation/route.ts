import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inConsultation = await prisma.queue.findMany({
      where: {
        status: 'IN_CONSULTATION'
      },
      include: {
        patient: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json(inConsultation);
  } catch (error) {
    console.error('Error fetching patients in consultation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}