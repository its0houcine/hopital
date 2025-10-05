'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RefreshCw, Shield, User, Edit } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DeleteButton from '@/components/ui/DeleteButton';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';

interface Admin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  photo?: string;
  cree_le: string;
}

interface AdminClientProps {
  initialAdmins: Admin[];
}

export default function AdminClient({ initialAdmins }: AdminClientProps) {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const router = useRouter();
  const { isSuperAdmin } = useAuth();

  const refreshAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admins');
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des administrateurs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    try {
      const response = await fetch(`/api/admins/${adminId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Mettre à jour la liste des admins
        setAdmins(admins.filter(admin => admin.id !== adminId));
      } else {
        const error = await response.json();
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'administrateur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de l\'administrateur');
    }
  };

  const handleAddAdmin = (newAdmin: Admin) => {
    setAdmins([newAdmin, ...admins]);
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleUpdateAdmin = (updatedAdmin: Admin) => {
    setAdmins(admins.map(admin =>
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Administration
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({admins.length} administrateurs)
          </span>
        </h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            onClick={refreshAdmins}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>Actualiser</span>
          </motion.button>

          {/* Temporairement désactivé la vérification du rôle pour le débogage */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] text-white rounded-lg shadow-md hover:shadow-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>Nouvel administrateur</span>
          </motion.button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administrateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {admins.map((admin) => (
                  <motion.tr
                    key={admin.id}
                    variants={itemVariants}
                    exit={{ opacity: 0, height: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          {admin.photo ? (
                            <Image
                              src={admin.photo}
                              alt={`${admin.prenom} ${admin.nom}`}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] flex items-center justify-center text-white font-medium">
                              {admin.prenom[0]}{admin.nom[0]}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {admin.prenom} {admin.nom}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {admin.role === 'super_admin' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Super Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <User className="w-3 h-3 mr-1" />
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(admin.cree_le).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-900 text-sm"
                          onClick={() => handleEditAdmin(admin)}
                        >
                          <Edit size={14} />
                          Modifier
                        </button>

                        <DeleteButton
                          onDelete={() => handleDeleteAdmin(admin.id)}
                          itemName="admin"
                          className="hover:shadow-md transition-shadow"
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {admins.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Aucun administrateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAdmin}
      />

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateAdmin}
        admin={selectedAdmin}
      />
    </div>
  );
}
