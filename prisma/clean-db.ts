import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Nettoyage de la base de données...');

  // Suppression des données dans l'ordre pour respecter les contraintes de clé étrangère
  try {
    // 1. Supprimer les historiques de consultation
    await prisma.historiqueConsultation.deleteMany({});
    console.log('✅ Historiques de consultation supprimés');

    // 2. Supprimer les messages
    await prisma.message.deleteMany({});
    console.log('✅ Messages supprimés');

    // 3. Supprimer les files d'attente
    await prisma.fileAttente.deleteMany({});
    console.log('✅ Files d\'attente supprimées');

    // 4. Supprimer les consultations
    await prisma.consultation.deleteMany({});
    console.log('✅ Consultations supprimées');

    // 5. Supprimer les patients
    await prisma.patient.deleteMany({});
    console.log('✅ Patients supprimés');

    // 6. Supprimer les médecins
    await prisma.medecin.deleteMany({});
    console.log('✅ Médecins supprimés');

    // 7. Supprimer les utilisateurs
    await prisma.user.deleteMany({});
    console.log('✅ Utilisateurs supprimés');

    console.log('✅ Base de données vidée avec succès');
  } catch (error) {
    console.error('Erreur lors du nettoyage de la base de données:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
