'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LogoutScreen from './LogoutScreen';

export default function GlobalLogoutHandler() {
  const { isLoggingOut, setIsLoggingOut } = useAuth();
  const router = useRouter();

  // Fonction appelée lorsque l'animation de déconnexion est terminée
  const handleLogoutComplete = () => {
    console.log('Animation de déconnexion terminée, redirection vers la page de login');

    // Rediriger directement vers la page de login sans passer par le router Next.js
    // Cela force un rechargement complet de la page et évite les problèmes de transition
    // Utiliser replace au lieu de href pour éviter que l'utilisateur puisse revenir en arrière
    window.location.replace('/login');

    // Note: Pas besoin de réinitialiser isLoggingOut car la page sera rechargée
  };

  return (
    <LogoutScreen
      isVisible={isLoggingOut}
      onAnimationComplete={handleLogoutComplete}
    />
  );
}
