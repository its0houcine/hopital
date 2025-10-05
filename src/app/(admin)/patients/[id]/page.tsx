import prisma from "@/lib/prisma";
import PatientClient from "./PatientClient";

interface PatientPageProps {
  params: { id: string };
}

export default async function PatientPage({ params }: PatientPageProps) {
  // Utilisation de params.id de manière correcte avec une gestion asynchrone
  const patientId = Number(params.id); // Convertir l'ID du paramètre en nombre
  
  // Vérifier si l'ID est valide
  if (isNaN(patientId)) {
    return <div className="p-6">ID du patient invalide.</div>;
  }

  // Récupérer les données du patient à partir de Prisma
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      consultations: {
        include: {
          medecin: true
        }
      }
    }
  });

  // Si le patient n'existe pas, afficher un message d'erreur
  if (!patient) {
    return <div className="p-6">Patient non trouvé</div>;
  }

  // Passer les données du patient au composant PatientClient
  return <PatientClient patient={{
    ...patient, 
    telephone: patient.telephone ?? "", 
    date_naissance: patient.date_naissance?.toISOString().split('T')[0] ?? "",
    consultation: patient.consultation?.toISOString().split('T')[0] ?? "",
    consultation_specialisee: patient.consultation_specialisee?.toISOString().split('T')[0] ?? "",
    
    ct_sim: patient.ct_sim?.toISOString().split('T')[0] ?? "",
    debut_traitement: patient.debut_traitement?.toISOString().split('T')[0] ?? "",
    fin_traitement: patient.fin_traitement?.toISOString().split('T')[0] ?? "",
    technique_irradiation: patient.technique_irradiation ?? undefined,
    dose_totale: patient.dose_totale ?? undefined,
    dose_fraction: patient.dose_fraction ?? undefined,
    adresse: patient.adresse ?? undefined
  }} />;
}

// Forcer le rendu dynamique
export const dynamic = "force-dynamic";
export const dynamicParams = true;
