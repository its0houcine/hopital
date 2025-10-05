import prisma from "@/lib/prisma";
import PatientClient from "@/app/(admin)/patients/[id]/PatientClient";  // Import du même PatientClient que l'admin
import { notFound } from "next/navigation";

interface PatientPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function MedecinPatientPage({ params }: PatientPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const patientId = Number(resolvedParams.id);
  
  if (isNaN(patientId)) {
    return <div className="p-6">ID du patient invalide.</div>;
  }

  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!patient) {
    notFound();
  }

  // Formater les données comme dans la version admin
  const formattedPatient = {
    ...patient,
    telephone: patient.telephone ?? "",
    date_naissance: patient.date_naissance?.toISOString().split('T')[0] ?? "",
    consultation: patient.consultation?.toISOString().split('T')[0] ?? "",
    consultation_specialisee: patient.consultation_specialisee?.toISOString().split('T')[0] ?? "",
    ct_sim: patient.ct_sim?.toISOString().split('T')[0] ?? "",
    debut_traitement: patient.debut_traitement?.toISOString().split('T')[0] ?? "",
    fin_traitement: patient.fin_traitement?.toISOString().split('T')[0] ?? "",
    rdv_traitement: patient.rdv_traitement?.toISOString().split('T')[0] ?? "",
  };

  return <PatientClient patient={formattedPatient} />;
}

export const dynamic = "force-dynamic";





