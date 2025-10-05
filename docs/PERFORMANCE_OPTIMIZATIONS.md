# Optimisations de Performance

Ce document décrit les optimisations de performance mises en place pour améliorer la rapidité et la fluidité de l'application, en particulier pour les statistiques du médecin.

## Optimisations Backend

### 1. Système de Cache à Plusieurs Niveaux

Nous avons implémenté un système de cache à plusieurs niveaux pour réduire la charge sur la base de données :

- **Cache Redis distribué** : Pour les déploiements en production, nous utilisons Redis pour stocker les données fréquemment accédées.
- **Cache en mémoire** : Comme fallback si Redis n'est pas disponible, nous utilisons un cache en mémoire.
- **Stratégie de cache différenciée** :
  - Cache court (2 minutes) pour les données qui changent fréquemment (file d'attente, consultations du jour)
  - Cache long (15 minutes) pour les données qui changent moins souvent (nombre total de patients, temps moyen)

### 2. Requêtes SQL Optimisées

Nous avons optimisé les requêtes SQL pour réduire le temps de réponse :

- **Requêtes agrégées** : Utilisation de requêtes SQL agrégées pour récupérer plusieurs métriques en une seule requête.
- **Sélection minimale** : Récupération uniquement des champs nécessaires pour réduire la taille des données transférées.
- **Requêtes SQL brutes** : Utilisation de `$queryRaw` pour des requêtes complexes qui seraient moins efficaces avec l'ORM.

### 3. Index de Base de Données

Nous avons ajouté des index à la base de données pour accélérer les requêtes fréquentes :

- Index sur `(medecinId, statut)` pour les requêtes de file d'attente
- Index sur `(medecinId, date)` pour les requêtes de consultations
- Index sur `medecinId` pour les requêtes de patients
- Index sur `(patientId)` pour les requêtes de consultations par patient

Pour appliquer ces index, exécutez :

```bash
npm run optimize-db
```

## Optimisations Frontend

### 1. React Query

Nous utilisons React Query pour gérer l'état et le cache côté client :

- **Mise en cache intelligente** : Les données sont mises en cache et réutilisées lorsque c'est possible.
- **Invalidation sélective** : Seules les données qui ont changé sont rechargées.
- **Gestion des erreurs** : Retry automatique avec backoff exponentiel.
- **Stale-while-revalidate** : Affichage des données en cache pendant que les nouvelles données sont chargées.

### 2. Chargement Progressif

Nous avons implémenté un chargement progressif des données :

- **Données en temps réel** : Chargées immédiatement (file d'attente, consultations du jour)
- **Données historiques** : Chargées en arrière-plan (statistiques globales, temps moyen)

### 3. Optimisations Visuelles

Nous avons ajouté des optimisations visuelles pour améliorer l'expérience utilisateur :

- **Animations de chargement** : Effet de shimmer pendant le chargement des données
- **Indicateurs de fraîcheur** : Indication visuelle lorsque les données sont mises à jour
- **Transitions fluides** : Animations douces entre les états pour masquer les temps de chargement

## Configuration

### Redis (Optionnel mais Recommandé)

Pour utiliser Redis comme cache distribué :

1. Créez un compte gratuit sur [Upstash](https://upstash.com/)
2. Créez une base de données Redis
3. Copiez le fichier `.env.local.example` vers `.env.local`
4. Remplissez les variables d'environnement avec vos informations Redis :

```
UPSTASH_REDIS_REST_URL=votre-url-redis
UPSTASH_REDIS_REST_TOKEN=votre-token-redis
```

Si Redis n'est pas configuré, l'application utilisera automatiquement le cache en mémoire comme fallback.

## Bonnes Pratiques

- **Évitez les requêtes inutiles** : Utilisez le cache autant que possible
- **Utilisez les index** : Assurez-vous que les requêtes fréquentes sont indexées
- **Surveillez les performances** : Utilisez les outils de développement du navigateur pour identifier les goulots d'étranglement
- **Optimisez les images** : Utilisez des formats modernes (WebP) et le chargement progressif
- **Utilisez la pagination** : Pour les grandes listes de données
- **Préchargez les données critiques** : Utilisez `prefetch` pour les données qui seront nécessaires bientôt
