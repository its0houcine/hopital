import { NextResponse } from 'next/server';

// Variables globales pour suivre l'état de compilation
let compilationStatus = {
  isCompiling: false,
  progress: 0,
  currentRoute: '',
  userRole: '',
  routes: {
    total: 0,
    completed: 0,
    failed: 0
  },
  startTime: 0,
  endTime: 0,
  errors: [] as string[]
};

// Fonction pour réinitialiser le statut de compilation
export function resetCompilationStatus() {
  compilationStatus = {
    isCompiling: false,
    progress: 0,
    currentRoute: '',
    userRole: '',
    routes: {
      total: 0,
      completed: 0,
      failed: 0
    },
    startTime: 0,
    endTime: 0,
    errors: []
  };
}

// Fonction pour démarrer une nouvelle compilation
export function startCompilation(totalRoutes: number, userRole?: string) {
  resetCompilationStatus();
  compilationStatus.isCompiling = true;
  compilationStatus.startTime = Date.now();
  compilationStatus.routes.total = totalRoutes;

  // Stocker le rôle de l'utilisateur si fourni
  if (userRole) {
    compilationStatus.userRole = userRole;
  }

  return compilationStatus;
}

// Fonction pour mettre à jour le statut de compilation
export function updateCompilationStatus(route: string, success: boolean) {
  if (!compilationStatus.isCompiling) return compilationStatus;

  compilationStatus.currentRoute = route;

  if (success) {
    compilationStatus.routes.completed++;
  } else {
    compilationStatus.routes.failed++;
    compilationStatus.errors.push(`Échec de compilation pour: ${route}`);
  }

  // Calculer la progression globale (0-100)
  const completedTotal = compilationStatus.routes.completed + compilationStatus.routes.failed;
  compilationStatus.progress = Math.round((completedTotal / compilationStatus.routes.total) * 100);

  // Si toutes les routes sont traitées, marquer la compilation comme terminée
  if (completedTotal >= compilationStatus.routes.total) {
    compilationStatus.isCompiling = false;
    compilationStatus.endTime = Date.now();
  }

  return compilationStatus;
}

// Endpoint pour obtenir le statut de compilation actuel
export async function GET() {
  return NextResponse.json(
    {
      ...compilationStatus,
      elapsedTime: compilationStatus.startTime > 0
        ? (compilationStatus.endTime > 0
            ? compilationStatus.endTime - compilationStatus.startTime
            : Date.now() - compilationStatus.startTime)
        : 0
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json'
      }
    }
  );
}

// Endpoint pour mettre à jour le statut de compilation (utilisé par les services de préchargement)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, totalRoutes, route, success, userRole } = body;

    if (action === 'start' && totalRoutes) {
      startCompilation(totalRoutes, userRole);
    } else if (action === 'update' && route) {
      updateCompilationStatus(route, success !== false);
    } else if (action === 'reset') {
      resetCompilationStatus();
    } else {
      return NextResponse.json(
        { error: "Action invalide ou paramètres manquants" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ...compilationStatus,
        elapsedTime: compilationStatus.startTime > 0
          ? (compilationStatus.endTime > 0
              ? compilationStatus.endTime - compilationStatus.startTime
              : Date.now() - compilationStatus.startTime)
          : 0
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de compilation:', error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
