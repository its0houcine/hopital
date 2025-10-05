-- Indexes pour améliorer les performances des requêtes de statistiques

-- Index pour les requêtes de file d'attente par médecin
CREATE INDEX IF NOT EXISTS "idx_file_attente_medecin_statut" ON "FileAttente" ("medecinId", "statut");

-- Index pour les consultations par médecin et date
CREATE INDEX IF NOT EXISTS "idx_consultation_medecin_date" ON "Consultation" ("medecinId", "date");

-- Index pour les patients par médecin
CREATE INDEX IF NOT EXISTS "idx_patient_medecin" ON "Patient" ("medecinId");

-- Index pour l'historique des consultations
CREATE INDEX IF NOT EXISTS "idx_historique_medecin_date" ON "HistoriqueConsultation" ("medecinId", "date");

-- Index pour les consultations par patient
CREATE INDEX IF NOT EXISTS "idx_consultation_patient" ON "Consultation" ("patientId");

-- Index pour les consultations par type
CREATE INDEX IF NOT EXISTS "idx_consultation_type" ON "Consultation" ("type");

-- Index pour la date de création des patients
CREATE INDEX IF NOT EXISTS "idx_patient_cree_le" ON "Patient" ("cree_le");
