'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from '@/app/actions/auth';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleLoginLoadingScreen from '@/components/auth/SimpleLoginLoadingScreen';
import { useAuth } from '@/context/AuthContext';
import { preloadAllData, preloadCommonData } from '@/services/preloadService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true); // Afficher l'écran de chargement dès le démarrage
  const [userInfo, setUserInfo] = useState<{role: string | null, name: string | null}>({
    role: null,
    name: null
  });

  // Utiliser le contexte d'authentification
  const { refreshUser } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // Effet pour vérifier l'authentification et précharger les données au démarrage
  useEffect(() => {
    if (showLoadingScreen) {
      const checkAuthAndPreload = async () => {
        try {
          // Rafraîchir les informations utilisateur
          refreshUser();

          // Vérifier si l'utilisateur est déjà connecté
          const userResponse = await fetch('/api/auth/me');
          const userData = await userResponse.json();

          if (userData.authenticated && userData.user) {
            // Utilisateur déjà connecté, précharger les données
            console.log('Utilisateur déjà connecté:', userData.user);

            // Mettre à jour les informations utilisateur pour l'écran de chargement
            setUserInfo({
              role: userData.user.role,
              name: userData.user.prenom ? `${userData.user.prenom} ${userData.user.nom}` : userData.user.email.split('@')[0]
            });

            // Précharger les données en fonction du rôle
            await preloadAllData(userData.user.role);

            // La redirection sera gérée par le callback onLoadingComplete du SimpleLoginLoadingScreen
          } else {
            // Utilisateur non connecté, précharger quand même certaines données communes
            console.log('Utilisateur non connecté, préchargement des données communes');

            // Précharger les données communes
            await preloadCommonData();

            // Attendre un peu plus longtemps pour montrer l'animation
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Masquer l'écran de chargement après un court délai
            setShowLoadingScreen(false);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'authentification:', error);
          // En cas d'erreur, masquer l'écran de chargement
          setShowLoadingScreen(false);
        }
      };

      // Lancer la vérification et le préchargement
      checkAuthAndPreload();
    }
  }, [showLoadingScreen, refreshUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Afficher l'écran de chargement pendant la récupération du contexte
        setShowLoadingScreen(true);

        try {
          // Rafraîchir le contexte d'authentification pour obtenir les informations utilisateur
          refreshUser();

          // Récupérer les données utilisateur directement depuis l'API pour l'écran de chargement
          const userResponse = await fetch('/api/auth/me');
          const userData = await userResponse.json();

          if (userData.authenticated && userData.user) {
            // Mettre à jour les informations utilisateur pour l'écran de chargement
            setUserInfo({
              role: userData.user.role,
              name: userData.user.prenom ? `${userData.user.prenom} ${userData.user.nom}` : userData.user.email.split('@')[0]
            });

            console.log('Utilisateur authentifié:', userData.user);
            console.log('Role détecté:', userData.user.role);

            // Le reste du processus (préchargement, redirection) est géré par SimpleLoginLoadingScreen
          } else {
            console.warn('API /me ne retourne pas les données attendues, utilisation du fallback');

            // Fallback si l'API ne retourne pas les données attendues
            setUserInfo({
              role: result.data?.role || null,
              name: result.data?.prenom ? `${result.data.prenom} ${result.data.nom}` : email.split('@')[0]
            });
          }
        } catch (apiError) {
          console.error('Erreur lors de la récupération des données utilisateur:', apiError);

          // Fallback en cas d'erreur API
          setUserInfo({
            role: result.data?.role || null,
            name: result.data?.prenom ? `${result.data.prenom} ${result.data.nom}` : email.split('@')[0]
          });
        }
      } else {
        setError(result.error || 'Erreur lors de la connexion');
        setLoading(false);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <SimpleLoginLoadingScreen
        isVisible={showLoadingScreen}
        userRole={userInfo.role}
        userName={userInfo.name}
        isStartup={searchParams.get('startup') === 'true'}
        onLoadingComplete={() => {
          // Rediriger après l'affichage du message de bienvenue
          const redirectTo = searchParams.has('redirect')
            ? decodeURIComponent(redirect)
            : userInfo.role === 'medecin' ? '/medecin/dashboard' : '/';

          // Rafraîchir une dernière fois le contexte avant la redirection
          refreshUser();
          // Utiliser window.location pour une redirection plus fiable
          window.location.href = redirectTo;
        }}
      />

      {/* Arrière-plan avec des formes flottantes */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a4b91] via-[#1a5fa3] to-[#3a7bd5] overflow-hidden">
        {/* Formes géométriques flottantes */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Cercle 1 */}
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-[#0077b6] to-[#48cae4] opacity-40 blur-lg"
            animate={{
              x: [0, 100, 50, 0],
              y: [0, 50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ top: '10%', left: '10%' }}
          />

          {/* Cercle 2 */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#023e8a] to-[#0077b6] opacity-40 blur-lg"
            animate={{
              x: [0, -100, -50, 0],
              y: [0, 100, 50, 0],
              scale: [1, 0.8, 1.2, 1],
              rotate: [0, -90, -180, -270, -360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ top: '50%', right: '10%' }}
          />

          {/* Triangle */}
          <motion.div
            className="absolute w-80 h-80 opacity-40 blur-lg"
            style={{
              background: 'linear-gradient(45deg, #0096c7, #4361ee)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              bottom: '10%',
              left: '30%'
            }}
            animate={{
              x: [0, 100, 0, -100, 0],
              y: [0, -50, -100, -50, 0],
              rotate: [0, 45, 0, -45, 0]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Rectangle */}
          <motion.div
            className="absolute w-64 h-32 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] opacity-40 blur-lg"
            animate={{
              x: [0, -50, 0, 50, 0],
              y: [0, 50, 100, 50, 0],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ top: '30%', left: '60%' }}
          />
        </div>

        {/* Effet de grille PlayStation */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-10">
        {/* Conteneur avec effet glassmorphism */}
        <motion.div
          className="max-w-md w-full space-y-8 backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src="/images/logo/logo-dark.svg"
                alt="Logo ELhassi"
                width={150}
                height={150}
                className="mx-auto h-24 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </motion.div>
            <motion.h2
              className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Connexion à votre compte
            </motion.h2>
          </div>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adresse email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 bg-white/30 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 bg-white/30 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.div
                className="text-red-300 text-sm text-center bg-red-500/20 py-2 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <motion.button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border-0 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#0077b6] to-[#0096c7] hover:from-[#023e8a] hover:to-[#0077b6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b6] shadow-lg shadow-[#0077b6]/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Se connecter
                    <motion.span
                      className="absolute right-4"
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </span>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}
