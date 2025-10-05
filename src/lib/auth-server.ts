import { verify, sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from './prisma';

// Type pour l'utilisateur décodé du token
export interface DecodedUser {
  id: number;
  email: string;
  role: string;
  medecinId?: number;
  iat: number;
  exp: number;
}

// Vérifier l'authentification
export async function verifyAuth(token: string): Promise<DecodedUser> {
  try {
    // Vérifier et décoder le token
    const decoded = verify(token, process.env.JWT_SECRET || 'secret-key') as DecodedUser;

    // Vérifier si l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        medecin: true
      }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return {
      ...decoded,
      medecinId: user.medecin?.id
    };
  } catch (error) {
    throw new Error('Token invalide');
  }
}

// Obtenir l'utilisateur actuel à partir du cookie
export async function getCurrentUser() {
  try {
    // Utiliser await avec cookies() pour éviter l'erreur
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const user = await verifyAuth(token);
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
}

// Créer un token JWT
export function createToken(user: any) {
  return sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      medecinId: user.medecin?.id
    },
    process.env.JWT_SECRET || 'secret-key',
    { expiresIn: '1d' }
  );
}

// Vérifier si l'utilisateur a un rôle spécifique
export async function hasRole(role: string | string[]) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  if (Array.isArray(role)) {
    return role.includes(user.role);
  }

  return user.role === role;
}
