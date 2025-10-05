-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'medecin');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Homme', 'Femme', 'Autre');

-- CreateEnum
CREATE TYPE "StatutFileAttente" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE');

-- CreateEnum
CREATE TYPE "TypeRDV" AS ENUM ('Consultation', 'Consultation_specialisee', 'CT_Sim', 'Debut_traitement', 'Fin_traitement', 'Rendez_vous_de_consultation_de_traitement');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "specialite" TEXT,
    "telephone" TEXT,
    "photo" TEXT,
    "cree_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "numero_patient" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "genre" "Genre" NOT NULL,
    "medecin_id" INTEGER,
    "condition_medicale" TEXT NOT NULL,
    "photo" TEXT,
    "consultation" TIMESTAMP(3),
    "consultation_specialisee" TIMESTAMP(3),
    "ct_sim" TIMESTAMP(3),
    "debut_traitement" TIMESTAMP(3),
    "fin_traitement" TIMESTAMP(3),
    "rdv_traitement" TIMESTAMP(3),
    "technique_irradiation" TEXT,
    "dose_totale" DOUBLE PRECISION,
    "dose_fraction" DOUBLE PRECISION,
    "cree_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DossierMedical" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "diagnostic" TEXT NOT NULL,
    "traitement" TEXT,
    "note_medecin" TEXT,
    "date_maj" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DossierMedical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "medecin_id" INTEGER NOT NULL,
    "type_rdv" "TypeRDV" NOT NULL,
    "date_rdv" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAttente" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "medecin_id" INTEGER NOT NULL,
    "statut" "StatutFileAttente" NOT NULL DEFAULT 'EN_ATTENTE',
    "ordre" INTEGER NOT NULL,
    "ajoute_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileAttente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "medecin_id" INTEGER,
    "note" TEXT,
    "date_consultation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "expediteur_id" INTEGER NOT NULL,
    "destinataire_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "vu" BOOLEAN NOT NULL DEFAULT false,
    "envoye_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_numero_patient_key" ON "Patient"("numero_patient");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DossierMedical" ADD CONSTRAINT "DossierMedical_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttente" ADD CONSTRAINT "FileAttente_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttente" ADD CONSTRAINT "FileAttente_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_expediteur_id_fkey" FOREIGN KEY ("expediteur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_destinataire_id_fkey" FOREIGN KEY ("destinataire_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
