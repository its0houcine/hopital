import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Hasher les mots de passe
    const superAdminPassword = await hash('superadmin123', 10);
    const adminPassword = await hash('admin123', 10);

    // Créer un super admin
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@elhassi.dz' },
      update: {},
      create: {
        nom: 'Super',
        prenom: 'Admin',
        email: 'superadmin@elhassi.dz',
        mot_de_passe: superAdminPassword,
        role: 'super_admin',
        photo: null
      }
    });

    // Créer un admin (secrétaire/réceptionniste)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@elhassi.dz' },
      update: {},
      create: {
        nom: 'Secrétaire',
        prenom: 'Réceptionniste',
        email: 'admin@elhassi.dz',
        mot_de_passe: adminPassword,
        role: 'admin',
        photo: null
      }
    });

    console.log('Super admin créé:', superAdmin.email);
    console.log('Admin créé:', admin.email);
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs:', error);
  } finally {
    await prisma.$disconnect();
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
