/*
  Warnings:

  - You are about to drop the column `medecin_id` on the `FileAttente` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `FileAttente` table. All the data in the column will be lost.
  - You are about to drop the column `medecin_id` on the `HistoriqueConsultation` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `HistoriqueConsultation` table. All the data in the column will be lost.
  - You are about to drop the column `medecin_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `specialite` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_medecinId_fkey";

-- DropForeignKey
ALTER TABLE "FileAttente" DROP CONSTRAINT "FileAttente_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "FileAttente" DROP CONSTRAINT "FileAttente_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "HistoriqueConsultation" DROP CONSTRAINT "HistoriqueConsultation_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "HistoriqueConsultation" DROP CONSTRAINT "HistoriqueConsultation_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_medecinId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_medecin_id_fkey";

-- DropIndex
DROP INDEX "User_telephone_key";

-- CreateTable
CREATE TABLE "Medecin" (
    "id" SERIAL NOT NULL,
    "specialite" TEXT NOT NULL,
    "telephone" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_userId_key" ON "Medecin"("userId");

-- Insert data into Medecin table from User table
INSERT INTO "Medecin" ("specialite", "telephone", "userId")
SELECT "specialite", "telephone", "id" FROM "User" WHERE "role" = 'medecin';

-- Add temporary columns to FileAttente
ALTER TABLE "FileAttente" ADD COLUMN "medecinId" INTEGER;
ALTER TABLE "FileAttente" ADD COLUMN "patientId" INTEGER;

-- Update the new columns with the old data
UPDATE "FileAttente" SET "medecinId" = (
  SELECT "id" FROM "Medecin" WHERE "userId" = "medecin_id"
);
UPDATE "FileAttente" SET "patientId" = "patient_id";

-- Make the new columns NOT NULL after data migration
ALTER TABLE "FileAttente" ALTER COLUMN "medecinId" SET NOT NULL;
ALTER TABLE "FileAttente" ALTER COLUMN "patientId" SET NOT NULL;

-- Add temporary columns to HistoriqueConsultation
ALTER TABLE "HistoriqueConsultation" ADD COLUMN "medecinId" INTEGER;
ALTER TABLE "HistoriqueConsultation" ADD COLUMN "patientId" INTEGER;

-- Update the new columns with the old data
UPDATE "HistoriqueConsultation" SET "medecinId" = (
  SELECT "id" FROM "Medecin" WHERE "userId" = "medecin_id"
);
UPDATE "HistoriqueConsultation" SET "patientId" = "patient_id";

-- Make the new columns NOT NULL after data migration
ALTER TABLE "HistoriqueConsultation" ALTER COLUMN "medecinId" SET NOT NULL;
ALTER TABLE "HistoriqueConsultation" ALTER COLUMN "patientId" SET NOT NULL;

-- Add temporary column to Patient
ALTER TABLE "Patient" ADD COLUMN "medecinId" INTEGER;

-- Update the new column with the old data
UPDATE "Patient" SET "medecinId" = (
  SELECT "id" FROM "Medecin" WHERE "userId" = "medecin_id"
);

-- Now drop the old columns
ALTER TABLE "FileAttente" DROP COLUMN "medecin_id";
ALTER TABLE "FileAttente" DROP COLUMN "patient_id";

ALTER TABLE "HistoriqueConsultation" DROP COLUMN "medecin_id";
ALTER TABLE "HistoriqueConsultation" DROP COLUMN "patient_id";

ALTER TABLE "Patient" DROP COLUMN "medecin_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "specialite";
ALTER TABLE "User" DROP COLUMN "telephone";

-- We already created the index when creating the table

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttente" ADD CONSTRAINT "FileAttente_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttente" ADD CONSTRAINT "FileAttente_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueConsultation" ADD CONSTRAINT "HistoriqueConsultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueConsultation" ADD CONSTRAINT "HistoriqueConsultation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
