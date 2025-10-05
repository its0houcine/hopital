export interface Patient {
  id: number;
  nom: string;
  prenom: string;
  photo?: string;
  telephone?: string;
  numero_patient?: string;
  date_naissance?: string;
  genre?: 'Homme' | 'Femme' | 'Autre';
  antecedent?: string;
  diagnostic?: string;
}

export interface Medecin {
  id: number;
  nom: string;
  prenom: string;
}

export interface FileAttente {
  id: string;
  patientId: string;
  medecinId: string;
  status: 'EN_ATTENTE' | 'EN_CONSULTATION' | 'TERMINE';
  priorite: 'NORMAL' | 'URGENT';
  heure_arrivee: Date;
  heure_debut_consultation?: Date;
  heure_fin_consultation?: Date;
  commentaire?: string;
}

