/*
  Warnings:

  - A unique constraint covering the columns `[patientId,medecinId,statut]` on the table `FileAttente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileAttente_patientId_medecinId_statut_key" ON "FileAttente"("patientId", "medecinId", "statut");
