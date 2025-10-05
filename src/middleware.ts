import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Stockage pour suivre l'état de démarrage de l'application
// Toujours considérer comme premier chargement pour forcer le passage par la page de login
let isAppFirstLoad = true;
const APP_STARTUP_COOKIE = 'app_startup';
const APP_STARTUP_PARAM = 'startup';

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = [
  '/api/auth/login',
  '/api/system/compilation-status',
  '/api/health',
  '/api/setup',
  '/api/fix-super-admin',
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
  '/images'
];

// Routes spécifiques aux rôles
const adminRoutes = ['/'];
const medecinRoutes = ['/medecin'];
const superAdminRoutes = ['/'];

// Fonction pour vérifier si une route est publique
const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => path.startsWith(route));
};

// Fonction pour vérifier si un token est expiré
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;

    // Ajouter une marge de 5 minutes pour éviter les redirections trop fréquentes
    // quand le token est sur le point d'expirer
    return decoded.exp < (currentTime - 300); // 5 minutes de marge
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Vérifier si c'est le premier chargement de l'application
  const isStartup = isAppFirstLoad || request.cookies.get(APP_STARTUP_COOKIE)?.value === 'true';

  // Si c'est le premier chargement et que ce n'est pas déjà la page de login,
  // rediriger vers la page de login avec le paramètre de démarrage
  if (isStartup && path !== '/login' && !path.startsWith('/api/') && !path.includes('/_next/')) {
    isAppFirstLoad = false; // Marquer que ce n'est plus le premier chargement

    // Créer l'URL de redirection vers la page de login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set(APP_STARTUP_PARAM, 'true');
    loginUrl.searchParams.set('redirect', encodeURIComponent(path));

    // Créer la réponse avec un cookie pour suivre l'état de démarrage
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(APP_STARTUP_COOKIE, 'true', {
      maxAge: 60, // 1 minute
      path: '/'
    });

    return response;
  }

  // Si on est sur la page de login et que c'était un démarrage,
  // ne plus considérer comme un démarrage pour les prochaines requêtes
  if (path === '/login' && isStartup) {
    isAppFirstLoad = false;

    // Continuer normalement, mais avec un cookie mis à jour
    const response = NextResponse.next();
    response.cookies.set(APP_STARTUP_COOKIE, 'false', {
      maxAge: 60 * 60, // 1 heure
      path: '/'
    });

    return response;
  }

  // Vérifier si la route est publique
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }

  // Vérifier si la route est une API
  if (path.startsWith('/api/')) {
    // Vérifier le token d'authentification
    const token = request.cookies.get('auth-token')?.value;

    if (!token || isTokenExpired(token)) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    try {
      // Décoder le token (sans vérification de signature côté middleware)
      const decoded = jwtDecode(token);

      // Ajouter l'utilisateur à la requête pour les contrôleurs
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', (decoded as any).id.toString());
      requestHeaders.set('x-user-role', (decoded as any).role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }
  }

  // Pour les routes non-API, rediriger vers la page de connexion si non authentifié
  const token = request.cookies.get('auth-token')?.value;

  if (!token || isTokenExpired(token)) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', encodeURIComponent(request.nextUrl.pathname));
    return NextResponse.redirect(url);
  }

  // Vérifier les autorisations basées sur le rôle
  try {
    const decoded = jwtDecode<{ role: string }>(token);
    const role = decoded.role;
    const pathname = request.nextUrl.pathname;

    // Vérifier si l'utilisateur a accès à cette route
    if (pathname.startsWith('/medecin') && role !== 'medecin' && role !== 'super_admin' && role !== 'admin') {
      // Rediriger les utilisateurs non autorisés vers la page de connexion
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/' && role === 'medecin') {
      // Rediriger les médecins vers leur dashboard
      return NextResponse.redirect(new URL('/medecin/dashboard', request.url));
    }

    // Si le token est valide et les autorisations sont correctes, continuer
    return NextResponse.next();
  } catch (error) {
    // En cas d'erreur, rediriger vers la page de connexion
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image).*)',
  ],
};
