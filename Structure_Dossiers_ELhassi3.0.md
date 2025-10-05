## Structure des dossiers principaux

L'application ELhassi 3.0 est organisée selon une architecture modulaire qui favorise la séparation des préoccupations et la réutilisation du code. Voici une description détaillée des principaux dossiers qui composent l'application :

### Dossier (components)

Le dossier `components` contient tous les composants React réutilisables de l'application, organisés par domaine fonctionnel :

- **components/auth** : Composants liés à l'authentification et à la gestion des utilisateurs.
  - `SimpleLoginLoadingScreen.tsx` : Écran de chargement optimisé avec animation lors de la connexion.
  - `GlobalLogoutHandler.tsx` : Gestion globale de la déconnexion.
  - `AuthDebug.tsx` : Outils de débogage pour l'authentification (utilisé en développement).

- **components/hopital** : Composants spécifiques à la gestion hospitalière.
  - `DataCard.tsx` : Cartes de statistiques pour le tableau de bord.
  - `Tables.tsx` : Gestion des tableaux de données pour la file d'attente.
  - `TableWrapper.tsx` : Conteneur pour les tableaux avec fonctionnalités de recherche et filtrage.
  - `TableClient.tsx` : Affichage des données de la file d'attente avec gestion des actions.
  - `ScrollingStats.tsx` : Statistiques animées avec défilement.
  - `StatisticsChart.tsx` : Graphiques de statistiques pour le tableau de bord.

- **components/medecin** : Composants spécifiques à l'interface médecin.
  - `CurrentPatient.tsx` : Affichage du patient actuellement en consultation.
  - `MedecinQueue.tsx` : Gestion de la file d'attente du médecin.
  - `CurrentConsultation.tsx` : Interface de consultation en cours.
  - `EnhancedDashboardStats.tsx` : Statistiques améliorées pour le tableau de bord médecin.

- **components/patients** : Composants liés à la gestion des patients.
  - `PatientsList.tsx` : Liste des patients avec pagination et recherche.
  - `PatientCard.tsx` : Carte d'information patient.
  - `AddPatientModal.tsx` : Modal d'ajout de patient.
  - `SearchPatientModal.tsx` : Modal de recherche de patient.
  - `PatientQuickView.tsx` : Vue rapide des informations d'un patient.
  - `SearchFilters.tsx` : Filtres de recherche pour les patients.

- **components/ui** : Composants d'interface utilisateur génériques et réutilisables.
  - `button/` : Différents styles de boutons.
  - `modal.tsx` : Composant modal réutilisable.
  - `table/` : Composants de tableau personnalisables.
  - `PageTransition.tsx` : Animations de transition entre les pages.
  - `SkeletonLoader.tsx` : Composants de chargement avec effet de squelette.
  - `ContentTransition.tsx` : Animations pour les transitions de contenu.
  - `DeleteButton.tsx` : Bouton de suppression avec confirmation.
  - `GlobalLoadingIndicator.tsx` : Indicateur de chargement global.

- **components/preload** : Composants liés au préchargement des ressources.
  - `ComponentPreloader.tsx` : Préchargement des composants en fonction du rôle utilisateur.

### Dossier (public)

Le dossier `public` contient toutes les ressources statiques accessibles directement par le navigateur :

- **public/images** : Images et ressources graphiques de l'application.
  - `logo/` : Logos de l'application dans différents formats.
    - `logo.svg` : Logo principal en couleur.
    - `logo-dark.svg` : Version du logo pour les fonds sombres.
    - `logo-icon.svg` : Version iconique du logo.
  - `grid.svg` : Motif de grille utilisé pour les arrière-plans.
  - `top-view-blue-textile-carnival.jpg` : Image d'arrière-plan pour le tableau de bord.
  - `default-avatar.png` : Avatar par défaut pour les utilisateurs sans photo.

- **public/uploads** : Dossier généré dynamiquement pour stocker les fichiers téléchargés par les utilisateurs.
  - Photos de profil des médecins et patients.
  - Documents médicaux téléchargés.

### Dossier (lib)

Le dossier `lib` contient les utilitaires, les services et les fonctions réutilisables qui ne sont pas des composants React :

- **lib/prisma.ts** : Configuration et instance singleton du client Prisma ORM.
- **lib/auth.ts** : Fonctions d'authentification côté client.
- **lib/auth-server.ts** : Fonctions d'authentification côté serveur.
- **lib/utils.ts** : Fonctions utilitaires génériques.

### Dossier (context)

Le dossier `context` contient les contextes React qui gèrent l'état global de l'application :

- **context/AuthContext.tsx** : Gestion de l'état d'authentification et des informations utilisateur.
- **context/SidebarContext.tsx** : Gestion de l'état de la barre latérale (expansion, navigation).
- **context/ThemeContext.tsx** : Gestion du thème de l'application (clair/sombre).

### Dossier (hooks)

Le dossier `hooks` contient les hooks React personnalisés qui encapsulent la logique réutilisable :

- **hooks/useAuth.ts** : Hook pour accéder au contexte d'authentification.
- **hooks/useSidebar.ts** : Hook pour gérer l'état de la barre latérale.
- **hooks/useFileAttente.ts** : Hook pour gérer la file d'attente des patients.
- **hooks/useFileAttenteQuery.ts** : Hook pour les requêtes liées à la file d'attente.
- **hooks/useConsultationQuery.ts** : Hook pour les requêtes liées aux consultations.
- **hooks/useModal.ts** : Hook pour gérer l'état des modales.
- **hooks/useCompilationStatus.ts** : Hook pour suivre l'état de compilation des pages.

### Dossier (services)

Le dossier `services` contient les services qui encapsulent la logique métier et les appels API :

- **services/preloadService.ts** : Service de préchargement des ressources.
- **services/dynamicRoutePreloadService.ts** : Service de préchargement des routes dynamiques.

### Dossier (app/actions)

Le dossier `app/actions` contient les actions serveur (Server Actions) de Next.js 14 :

- **app/actions/patient.ts** : Actions serveur pour la gestion des patients.
- **app/actions/medecin.ts** : Actions serveur pour la gestion des médecins.
- **app/actions/fileAttente.ts** : Actions serveur pour la gestion de la file d'attente.
- **app/actions/consultation.ts** : Actions serveur pour la gestion des consultations.

Cette architecture modulaire et bien organisée permet une maintenance facilitée, une évolution progressive du système, et une réutilisation efficace du code. La séparation claire entre les composants d'interface utilisateur, la logique métier, et les services d'accès aux données assure une application robuste et évolutive.
