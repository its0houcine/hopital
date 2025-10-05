import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer toutes les files d'attente
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
      patientId: item.patientId,
      medecinId: item.medecinId,
      statut: item.statut,
      ordre: item.ordre,
      ajoute_le: item.ajoute_le.toISOString(),
      patient: item.patient,
      medecin: {
        id: item.medecin.id,
        userId: item.medecin.userId,
        specialite: item.medecin.specialite,
        nom: item.medecin.user.nom,
        prenom: item.medecin.user.prenom
      }
    }));

    return NextResponse.json(formattedFileAttente);
  } catch (error) {
    console.error("Erreur lors de la récupération de la file d'attente:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la file d'attente" },
      { status: 500 }
    );
  }
}

// Ajouter un patient à la file d'attente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, medecinId } = body;

    console.log("Données reçues:", { patientId, medecinId, body });

    // Vérifier que les valeurs sont présentes
    if (patientId === undefined || medecinId === undefined) {
      console.error("Erreur: patientId ou medecinId manquant", { patientId, medecinId });
      return NextResponse.json(
        { error: "patientId et medecinId sont requis" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Vérifier que les valeurs sont des nombres valides
    const patientIdNum = Number(patientId);
    const medecinIdNum = Number(medecinId);

    if (isNaN(patientIdNum) || patientIdNum <= 0 || isNaN(medecinIdNum) || medecinIdNum <= 0) {
      console.error("Erreur: patientId ou medecinId invalide", { patientIdNum, medecinIdNum });
      return NextResponse.json(
        { error: "patientId et medecinId doivent être des nombres positifs" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Vérifier si le patient existe
    const patient = await prisma.patient.findUnique({
      where: { id: patientIdNum }
    });

    console.log("Patient trouvé:", patient ? "Oui" : "Non", { patientIdNum });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Vérifier si le médecin existe
    const medecin = await prisma.medecin.findUnique({
      where: { id: medecinIdNum }
    });

    console.log("Médecin trouvé:", medecin ? "Oui" : "Non", { medecinIdNum });

    if (!medecin) {
      return NextResponse.json(
        { error: "Médecin non trouvé" },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Vérifier si le patient existe déjà dans la file d'attente
    const existingEntry = await prisma.fileAttente.findFirst({
      where: {
        patientId: patientIdNum,
        medecinId: medecinIdNum,
        statut: 'EN_ATTENTE'
      }
    });

    console.log("Patient déjà dans la file d'attente:", existingEntry ? "Oui" : "Non");

    if (existingEntry) {
      return NextResponse.json(
        { error: "Ce patient est déjà dans la file d'attente" },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Trouver l'ordre maximum actuel
    const maxOrdre = await prisma.fileAttente.findFirst({
      where: {
        medecinId: medecinIdNum,
        statut: 'EN_ATTENTE'
      },
      orderBy: {
        ordre: 'desc'
      },
      select: {
        ordre: true
      }
    });

    console.log("Ordre maximum actuel:", maxOrdre?.ordre || 0);

    const newOrdre = maxOrdre ? maxOrdre.ordre + 1 : 1;

    // Ajouter à la file d'attente dans une transaction
    console.log("Tentative d'ajout à la file d'attente:", { patientIdNum, medecinIdNum, newOrdre });

    try {
      // Vérifier si l'historique de consultation existe
      const historiqueExists = await prisma.historiqueConsultation.findFirst({
        where: {
          patientId: patientIdNum,
          medecinId: medecinIdNum,
          action: 'AJOUT_FILE',
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)) // Aujourd'hui
          }
        }
      });

      console.log("Vérification de l'historique:", historiqueExists ? "Existe déjà" : "N'existe pas");

      const result = await prisma.$transaction(async (tx) => {
        // 1. Créer l'entrée dans la file d'attente
        const fileAttente = await tx.fileAttente.create({
          data: {
            patientId: patientIdNum,
            medecinId: medecinIdNum,
            statut: 'EN_ATTENTE',
            ordre: newOrdre,
            ajoute_le: new Date()
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

        console.log("Entrée créée dans la file d'attente:", fileAttente.id);

        try {
          // 2. Créer l'historique (si pas déjà existant)
          if (!historiqueExists) {
            const historique = await tx.historiqueConsultation.create({
              data: {
                patientId: patientIdNum,
                medecinId: medecinIdNum,
                action: 'AJOUT_FILE',
                date: new Date()
              }
            });
            console.log("Historique créé:", historique.id);
          } else {
            console.log("Historique déjà existant, pas de création");
          }
        } catch (historiqueError) {
          console.error("Erreur lors de la création de l'historique (non bloquant):", historiqueError);
          // Ne pas faire échouer la transaction si l'historique échoue
        }

        return fileAttente;
      });

      console.log("Transaction réussie");

      // Formater la réponse
      const formattedResult = {
        id: result.id,
        patientId: result.patientId,
        medecinId: result.medecinId,
        statut: result.statut,
        ordre: result.ordre,
        ajoute_le: result.ajoute_le.toISOString(),
        patient: result.patient,
        medecin: {
          id: result.medecin.id,
          userId: result.medecin.userId,
          specialite: result.medecin.specialite,
          nom: result.medecin.user.nom,
          prenom: result.medecin.user.prenom
        }
      };

      return NextResponse.json(formattedResult, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (transactionError) {
      console.error("Erreur lors de la transaction:", transactionError);

      // Vérifier si c'est une erreur de contrainte unique
      if (transactionError instanceof Error &&
          transactionError.name === 'PrismaClientKnownRequestError' &&
          (transactionError as any).code === 'P2002') {
        return NextResponse.json(
          { error: "Ce patient est déjà dans la file d'attente" },
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          }
        );
      }

      throw transactionError;
    }

    // Cette partie ne sera jamais atteinte car nous retournons le résultat dans le bloc try
  } catch (error) {
    console.error("Erreur lors de l'ajout à la file d'attente:", error);

    // Déterminer le message d'erreur à renvoyer
    let errorMessage = "Erreur lors de l'ajout à la file d'attente";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      // Vérifier si c'est une erreur Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        // @ts-ignore - Propriété spécifique à Prisma
        const code = (error as any).code;

        if (code === 'P2002') {
          errorMessage = "Ce patient est déjà dans la file d'attente";
          statusCode = 400;
        } else if (code === 'P2003') {
          errorMessage = "Référence à une entité qui n'existe pas";
          statusCode = 400;
        }
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}
