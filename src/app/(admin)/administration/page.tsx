import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import AdminClient from './AdminClient';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AdminPage() {
  // Récupérer tous les administrateurs (admin et super_admin)
  const admins = await prisma.user.findMany({
    where: {
      OR: [
        { role: 'admin' },
        { role: 'super_admin' }
      ]
    },
    orderBy: {
      cree_le: 'desc'
    }
  });

  // Formater les données pour le client
  const formattedAdmins = admins.map(admin => ({
    id: admin.id,
    nom: admin.nom,
    prenom: admin.prenom,
    email: admin.email,
    role: admin.role,
    photo: admin.photo,
    cree_le: admin.cree_le.toISOString()
  }));

  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <AdminClient initialAdmins={formattedAdmins} />
      </Suspense>
    </div>
  );
}
