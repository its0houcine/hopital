export interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'medecin';
  specialite?: string | null;
  telephone?: string | null;
  photo?: string | null;
  cree_le: Date;
}

export interface MedecinFormData {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe?: string;
  specialite?: string;
  telephone?: string;
  photo?: File | null;
}