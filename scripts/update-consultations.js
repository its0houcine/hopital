// Script pour mettre à jour les consultations existantes avec des dates de début et de fin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateConsultations() {
  try {
    console.log('Récupération des consultations existantes...');
    
    // Récupérer toutes les consultations
    const consultations = await prisma.consultation.findMany({
      orderBy: {
        date: 'desc'
      },
      take: 50 // Limiter aux 50 dernières consultations
    });
    
    console.log(`${consultations.length} consultations trouvées.`);
    
    // Mettre à jour les consultations avec des dates de début et de fin
    for (let i = 0; i < consultations.length; i++) {
      const consultation = consultations[i];
      
      // Créer une date de début (1 heure avant la date de la consultation)
      const debut = new Date(consultation.date);
      debut.setHours(debut.getHours() - 1);
      
      // Créer une date de fin (entre 15 et 45 minutes après le début)
      const dureeMinutes = Math.floor(Math.random() * 30) + 15; // Entre 15 et 45 minutes
      const fin = new Date(debut);
      fin.setMinutes(fin.getMinutes() + dureeMinutes);
      
      // Mettre à jour la consultation
      await prisma.consultation.update({
        where: {
          id: consultation.id
        },
        data: {
          debut,
          fin
        }
      });
      
      console.log(`Consultation ${consultation.id} mise à jour avec une durée de ${dureeMinutes} minutes.`);
    }
    
    console.log('Mise à jour terminée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des consultations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction
updateConsultations();
