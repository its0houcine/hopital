@echo off
echo ===================================
echo Nettoyage complet du cache Next.js
echo ===================================

echo 1. Arrêt des processus Node.js en cours...
taskkill /f /im node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    - Processus Node.js arrêtés avec succès
) else (
    echo    - Aucun processus Node.js en cours d'exécution
)

echo 2. Suppression du dossier .next...
if exist .next (
    rmdir /s /q .next
    echo    - Dossier .next supprimé avec succès
) else (
    echo    - Dossier .next non trouvé
)

echo 3. Suppression du cache de Node.js...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo    - Cache Node.js supprimé avec succès
) else (
    echo    - Cache Node.js non trouvé
)

echo 4. Nettoyage des fichiers temporaires...
del /q /f *.log >nul 2>&1
del /q /f npm-debug.log* >nul 2>&1
echo    - Fichiers temporaires supprimés

echo 5. Optimisation du cache npm...
call npm cache verify
echo    - Cache npm vérifié et optimisé

echo 6. Vérification des dépendances...
call npm prune
echo    - Dépendances inutilisées supprimées

echo ===================================
echo Nettoyage terminé avec succès!
echo ===================================

echo Redémarrage de l'application avec optimisations...
echo.
set NODE_OPTIONS=--max-old-space-size=4096
npm run dev
