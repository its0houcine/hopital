/*
  Warnings:

  - You are about to drop the column `destinataire_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `envoye_le` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `expediteur_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `vu` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `condition_medicale` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DossierMedical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RendezVous` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contenu` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medecinId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionHistorique" AS ENUM ('AJOUT_FILE', 'CONSULTATION', 'FIN_TRAITEMENT', 'AUTRE');

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "DossierMedical" DROP CONSTRAINT "DossierMedical_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_destinataire_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_expediteur_id_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RendezVous" DROP CONSTRAINT "RendezVous_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "RendezVous" DROP CONSTRAINT "RendezVous_patient_id_fkey";

-- DropIndex
DROP INDEX "Patient_user_id_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "destinataire_id",
DROP COLUMN "envoye_le",
DROP COLUMN "expediteur_id",
DROP COLUMN "message",
DROP COLUMN "vu",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "medecinId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'observation';

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "condition_medicale",
DROP COLUMN "user_id",
ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "antecedent" TEXT,
ADD COLUMN     "diagnostic" TEXT;

-- DropTable
DROP TABLE "Consultation";

-- DropTable
DROP TABLE "DossierMedical";

-- DropTable
DROP TABLE "RendezVous";

-- DropEnum
DROP TYPE "TypeRDV";

-- CreateTable
CREATE TABLE "HistoriqueConsultation" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "medecin_id" INTEGER NOT NULL,
    "action" "ActionHistorique" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoriqueConsultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueConsultation" ADD CONSTRAINT "HistoriqueConsultation_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueConsultation" ADD CONSTRAINT "HistoriqueConsultation_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
