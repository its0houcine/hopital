import prisma from "@/lib/prisma";
import ClientWrapper from "./ClientWrapper";

export default async function TablePatients() {
  const patients = await prisma.patient.findMany();
  const medecins = await prisma.user.findMany({
    where: { role: "medecin" },
    select: {
      id: true,
      nom: true,
      prenom: true,
    },
  });

  const serializedPatients = patients.map((patient) => ({
    ...patient,
    date_naissance: patient.date_naissance.toISOString(),
  }));

  return <ClientWrapper patients={serializedPatients} medecins={medecins} />;
}
