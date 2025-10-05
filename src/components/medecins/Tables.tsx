import prisma from "@/lib/prisma";
import ClientWrapper from "./ClientWrapper";

export default async function TableMedecins() {
  const medecins = await prisma.user.findMany({
    where: { role: "medecin" },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      telephone: true,
      specialite: true,
      photo: true,
    },
  });

  return <ClientWrapper medecins={medecins.map(m => ({
    ...m,
    telephone: m.telephone || undefined,
    specialite: m.specialite || undefined,
    photo: m.photo || undefined
  }))} />;
}
