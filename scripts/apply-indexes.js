const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function applyIndexes() {
  try {
    console.log('Applying performance indexes to the database...');
    
    // Lire le fichier SQL
    const sqlPath = path.join(__dirname, '..', 'prisma', 'migrations', 'add_performance_indexes.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Créer une instance Prisma
    const prisma = new PrismaClient();
    
    // Exécuter le SQL directement
    await prisma.$executeRawUnsafe(sql);
    
    console.log('Performance indexes applied successfully!');
    
    // Fermer la connexion Prisma
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error applying indexes:', error);
    process.exit(1);
  }
}

applyIndexes();
