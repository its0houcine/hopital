'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

// Type pour l'utilisateur
export interface User {
  id: number;
  email: string;
  role: 'super_admin' | 'admin' | 'medecin';
  medecinId?: number;
  nom?: string;
  prenom?: string;
  photo?: string;
}

// Type pour le contexte d'authentification
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isMedecin: boolean;
  logout: () => Promise<void>;
  refreshUser: () => void;
  setIsLoggingOut: (value: boolean) => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Provider du contexte
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Fonction pour rafraîchir les informations de l'utilisateur
  const refreshUser = () => {
    setIsLoading(true);

    // Utiliser la nouvelle API pour obtenir l'utilisateur actuel avec toutes ses informations
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        console.log('Auth me response:', data);

        if (data.authenticated && data.user) {
          console.log('Utilisateur authentifié:', data.user);
          console.log('Role utilisateur:', data.user.role);

          // Vérifier si le rôle est correctement défini
          if (data.user.role) {
            // Normaliser le rôle pour s'assurer qu'il correspond aux types attendus
            const normalizedRole = data.user.role.toLowerCase() === 'super_admin'
              ? 'super_admin'
              : data.user.role.toLowerCase() === 'admin'
                ? 'admin'
                : 'medecin';

            // Mettre à jour l'utilisateur avec le rôle normalisé
            setUser({
              ...data.user,
              role: normalizedRole as 'super_admin' | 'admin' | 'medecin'
            });

            console.log('Role normalisé:', normalizedRole);
          } else {
            console.warn('Rôle utilisateur non défini dans la réponse API');
            setUser(data.user);
          }
        } else {
          console.log('Utilisateur non authentifié');
          setUser(null);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        setUser(null);
        setIsLoading(false);
      });
  };

  // Effet pour charger l'utilisateur au montage du composant
  useEffect(() => {
    refreshUser();
  }, []);

  // Fonction de déconnexion améliorée
  const logout = async () => {
    try {
      // Activer l'écran de déconnexion
      setIsLoggingOut(true);

      // Phase 1: Nettoyage des données côté client (géré par le composant LogoutScreen)

      // Phase 2: Appel API pour la déconnexion côté serveur
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (apiError) {
        console.error('Erreur API lors de la déconnexion:', apiError);
        // Continuer malgré l'erreur pour assurer la déconnexion côté client
      }

      // Nettoyer l'état utilisateur immédiatement
      setUser(null);

      // L'animation de déconnexion est gérée par le composant LogoutScreen
      // La redirection vers la page de login sera effectuée par le GlobalLogoutHandler
      // quand l'animation sera terminée

      // Note: Ne pas désactiver isLoggingOut ici, cela sera fait par le GlobalLogoutHandler
      // après la redirection
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // En cas d'erreur, réinitialiser l'état et rediriger quand même
      setUser(null);
      router.push('/login');
      setIsLoggingOut(false);
    }
  };

  // Valeurs du contexte
  const isSuperAdmin = user?.role === 'super_admin';
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isMedecin = user?.role === 'medecin';

  const value = {
    user,
    isLoading,
    isLoggingOut,
    isSuperAdmin,
    isAdmin,
    isMedecin,
    logout,
    refreshUser,
    setIsLoggingOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
