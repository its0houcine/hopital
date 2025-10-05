/*
  Warnings:

  - The values [TERMINE] on the enum `StatutFileAttente` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "TypeConsultation" AS ENUM ('INITIAL', 'STANDARD', 'SPECIALISEE');

-- AlterEnum
BEGIN;
CREATE TYPE "StatutFileAttente_new" AS ENUM ('EN_ATTENTE', 'EN_COURS');
ALTER TABLE "FileAttente" ALTER COLUMN "statut" DROP DEFAULT;
ALTER TABLE "FileAttente" ALTER COLUMN "statut" TYPE "StatutFileAttente_new" USING ("statut"::text::"StatutFileAttente_new");
ALTER TYPE "StatutFileAttente" RENAME TO "StatutFileAttente_old";
ALTER TYPE "StatutFileAttente_new" RENAME TO "StatutFileAttente";
DROP TYPE "StatutFileAttente_old";
ALTER TABLE "FileAttente" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';
COMMIT;

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnostic" TEXT,
    "traitement" TEXT,
    "notes" TEXT,
    "type" "TypeConsultation" NOT NULL DEFAULT 'STANDARD',
    "cree_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
