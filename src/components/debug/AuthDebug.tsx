'use client';

import { useAuth } from '@/context/AuthContext';
import { RefreshCw } from 'lucide-react';

export default function AuthDebug() {
  const { user, isLoading, isSuperAdmin, isAdmin, isMedecin, refreshUser } = useAuth();

  const fixSuperAdmin = async () => {
    try {
      const response = await fetch('/api/fix-super-admin');
      const data = await response.json();
      console.log('Fix super admin response:', data);
      alert('Rôle super_admin mis à jour. Veuillez rafraîchir l\'authentification.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle super_admin:', error);
      alert('Erreur lors de la mise à jour du rôle super_admin');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-md text-xs overflow-auto max-h-60">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Auth Debug</h3>
        <div className="flex gap-2">
          <button
            onClick={refreshUser}
            className="p-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            title="Rafraîchir l'authentification"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-blue-600' : 'text-blue-600'} />
          </button>
          <button
            onClick={fixSuperAdmin}
            className="px-2 py-1 bg-purple-100 rounded text-purple-600 hover:bg-purple-200 transition-colors"
            title="Corriger le rôle super_admin"
          >
            Fix Super Admin
          </button>
        </div>
      </div>
      <div>
        <p><strong>Loading:</strong> {isLoading ? 'true' : 'false'}</p>
        <p><strong>isSuperAdmin:</strong> {isSuperAdmin ? 'true' : 'false'}</p>
        <p><strong>isAdmin:</strong> {isAdmin ? 'true' : 'false'}</p>
        <p><strong>isMedecin:</strong> {isMedecin ? 'true' : 'false'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}</p>
      </div>
    </div>
  );
}
