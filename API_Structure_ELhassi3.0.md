## Structure des API

Le dossier contient également un dossier (api) pour les points de terminaison d'API pour l'accès aux données avec des composants client. Voici les principales API (se formant des sous-dossiers) :

### API d'authentification (api/auth)
- **POST /api/auth/login** : Authentifie un utilisateur et génère un jeton JWT pour l'autorisation.
- **POST /api/auth/logout** : Invalide le jeton JWT de l'utilisateur et le déconnecte.
- **GET /api/auth/me** : Récupère les informations de l'utilisateur actuellement connecté.
- **GET /api/auth/check** : Vérifie si l'utilisateur est authentifié et renvoie son statut.

### API de patients (api/patients)
- **GET /api/patients** : Récupère une liste paginée de tous les patients avec options de filtrage et de recherche.
- **POST /api/patients** : Crée un nouveau patient avec ses informations médicales.
- **GET /api/patients/[id]** : Récupère les informations détaillées d'un patient spécifique.
- **PUT /api/patients/[id]** : Met à jour les informations d'un patient existant.
- **DELETE /api/patients/[id]** : Supprime un patient du système.
- **GET /api/patients/recent** : Récupère la liste des patients récemment consultés.

### API de médecins (api/medecins)
- **GET /api/medecins** : Récupère une liste de tous les médecins enregistrés dans le système.
- **POST /api/medecins** : Crée un nouveau compte médecin avec ses informations professionnelles.
- **GET /api/medecins/[id]** : Récupère les informations détaillées d'un médecin spécifique.
- **PUT /api/medecins/[id]** : Met à jour les informations d'un médecin existant.
- **DELETE /api/medecins/[id]** : Supprime un médecin du système.
- **GET /api/medecins/active** : Récupère les médecins les plus actifs en fonction du nombre de consultations.

### API de file d'attente (api/file-attente)
- **GET /api/file-attente** : Récupère la liste complète des patients en file d'attente.
- **POST /api/file-attente** : Ajoute un patient à la file d'attente d'un médecin.
- **PUT /api/file-attente/[id]** : Met à jour le statut d'un patient dans la file d'attente.
- **DELETE /api/file-attente/[id]** : Retire un patient de la file d'attente.
- **GET /api/file-attente/medecin/[id]** : Récupère la file d'attente spécifique à un médecin.

### API de consultations (api/consultations)
- **GET /api/consultations** : Récupère une liste paginée des consultations avec options de filtrage.
- **POST /api/consultations** : Crée une nouvelle consultation pour un patient.
- **GET /api/consultations/[id]** : Récupère les détails d'une consultation spécifique.
- **PUT /api/consultations/[id]** : Met à jour les informations d'une consultation existante.
- **DELETE /api/consultations/[id]** : Supprime une consultation du système.
- **GET /api/consultations/current** : Récupère la consultation actuellement en cours pour un médecin.

### API de statistiques (api/statistics)
- **GET /api/statistics** : Récupère des statistiques globales sur les patients, consultations et médecins.
- **GET /api/statistics/medecin/[id]** : Récupère des statistiques spécifiques à un médecin.
- **GET /api/statistics/daily** : Récupère les statistiques quotidiennes des consultations.
- **GET /api/statistics/monthly** : Récupère les statistiques mensuelles des consultations.

### API d'utilisateurs (api/users)
- **GET /api/users** : Récupère la liste des utilisateurs du système (administrateurs et médecins).
- **POST /api/users** : Crée un nouvel utilisateur administratif.
- **GET /api/users/[id]** : Récupère les informations détaillées d'un utilisateur spécifique.
- **PUT /api/users/[id]** : Met à jour les informations d'un utilisateur existant.
- **DELETE /api/users/[id]** : Supprime un utilisateur du système.

### API système (api/system)
- **GET /api/health** : Vérifie l'état de santé de l'API et renvoie la version actuelle.
- **GET /api/setup** : Configure les utilisateurs initiaux du système (super admin et admin).
- **POST /api/system/compilation-status** : Met à jour le statut de compilation des pages pour le chargement optimisé.
- **GET /api/fix-super-admin** : Corrige le rôle super_admin dans la base de données.

Ces API sont conçues selon les principes RESTful, avec des points de terminaison cohérents et des méthodes HTTP appropriées pour chaque opération. Elles utilisent Prisma comme ORM pour interagir avec la base de données PostgreSQL, garantissant des opérations de données sécurisées et efficaces. L'authentification est gérée via JWT (JSON Web Tokens) pour sécuriser l'accès aux ressources protégées.
