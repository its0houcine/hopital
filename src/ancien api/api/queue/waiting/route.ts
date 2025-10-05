import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const waitingPatients = await prisma.queue.findMany({
      where: {
        status: 'WAITING'
      },
      include: {
        patient: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(waitingPatients);
  } catch (error) {
    console.error('Error fetching waiting patients:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}