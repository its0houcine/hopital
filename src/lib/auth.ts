'use client';

import { jwtDecode } from "jwt-decode";

// Type pour l'utilisateur décodé du token
export interface DecodedUser {
  id: number;
  email: string;
  role: string;
  medecinId?: number;
  iat: number;
  exp: number;
}

// Vérifier l'authentification côté client
export function verifyAuth(token: string): DecodedUser | null {
  try {
    // Décoder le token (sans vérification côté client)
    const decoded = jwtDecode<DecodedUser>(token);

    // Vérifier si le token est expiré
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    return null;
  }
}

// Obtenir l'utilisateur actuel à partir du cookie côté client
export function getCurrentUser() {
  // Fonction pour obtenir un cookie par son nom
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  try {
    const token = getCookie('auth-token');
    if (!token) {
      return null;
    }

    return verifyAuth(token);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}

// Vérifier si l'utilisateur a un rôle spécifique
export function hasRole(role: string | string[]) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  if (Array.isArray(role)) {
    return role.includes(user.role);
  }

  return user.role === role;
}
