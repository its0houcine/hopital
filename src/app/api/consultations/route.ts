import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer toutes les consultations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const medecinId = searchParams.get('medecinId');
    const patientId = searchParams.get('patientId');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construire la requête
    const whereClause: any = {};
    if (medecinId) {
      whereClause.medecinId = parseInt(medecinId);
    }
    if (patientId) {
      whereClause.patientId = parseInt(patientId);
    }
    if (date) {
      const dateObj = new Date(date);
      dateObj.setHours(0, 0, 0, 0);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      
      whereClause.date = {
        gte: dateObj,
        lt: nextDay
      };
    }

    // Récupérer les consultations avec pagination
    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where: whereClause,
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
          date: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.consultation.count({
        where: whereClause
      })
    ]);

    // Formater les données
    const formattedConsultations = consultations.map(consultation => ({
      id: consultation.id,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      date: consultation.date.toISOString(),
      diagnostic: consultation.diagnostic,
      traitement: consultation.traitement,
      notes: consultation.notes,
      type: consultation.type,
      cree_le: consultation.cree_le.toISOString(),
      patient: consultation.patient,
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom
      }
    }));

    return NextResponse.json({
      consultations: formattedConsultations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des consultations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des consultations" },
      { status: 500 }
    );
  }
}

// Créer une nouvelle consultation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, medecinId, type, diagnostic, traitement, notes } = body;

    if (!patientId || !medecinId) {
      return NextResponse.json(
        { error: "patientId et medecinId sont requis" },
        { status: 400 }
      );
    }

    // Créer la consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId: parseInt(patientId),
        medecinId: parseInt(medecinId),
        date: new Date(),
        type: type || 'STANDARD',
        diagnostic: diagnostic || null,
        traitement: traitement || null,
        notes: notes || null
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
      }
    });

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
      cree_le: consultation.cree_le.toISOString(),
      patient: consultation.patient,
      medecin: {
        id: consultation.medecin.id,
        specialite: consultation.medecin.specialite,
        nom: consultation.medecin.user.nom,
        prenom: consultation.medecin.user.prenom
      }
    };

    return NextResponse.json(formattedConsultation);
  } catch (error) {
    console.error("Erreur lors de la création de la consultation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la consultation" },
      { status: 500 }
    );
  }
}
