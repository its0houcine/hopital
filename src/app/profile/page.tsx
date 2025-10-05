'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Mail, Phone, Calendar, Shield, User, MapPin, Edit, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Récupérer les données complètes de l'utilisateur
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-elhassi1 rounded-full animate-spin"></div>
      </div>
    );
  }

  const userInfo = userData || user;

  if (!userInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-gray-600 mb-4">Vous n'êtes pas connecté</p>
        <button 
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-elhassi1 text-white rounded-md hover:bg-elhassi3 transition-colors"
        >
          Se connecter
        </button>
      </div>
    );
  }

  // Déterminer le rôle à afficher
  const getRoleDisplay = () => {
    switch (userInfo.role) {
      case 'super_admin':
        return 'Administrateur';
      case 'admin':
        return 'Secrétariat';
      case 'medecin':
        return 'Médecin';
      default:
        return userInfo.role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-elhassi1 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour au tableau de bord
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* En-tête du profil */}
          <motion.div 
            variants={itemVariants}
            className="relative h-48 bg-gradient-to-r from-elhassi1 to-elhassi3"
          >
            <div className="absolute bottom-0 left-0 w-full p-6 pb-24 flex justify-between items-end">
              <h1 className="text-2xl font-bold text-white">
                Profil Utilisateur
              </h1>
            </div>
          </motion.div>

          {/* Photo de profil */}
          <div className="relative px-6 -mt-16">
            <motion.div 
              variants={itemVariants}
              className="relative inline-block"
            >
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                {userInfo.photo ? (
                  <Image
                    src={userInfo.photo}
                    alt={`${userInfo.prenom} ${userInfo.nom}`}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-elhassi1">
                      {userInfo.prenom?.[0]}{userInfo.nom?.[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getRoleDisplay()}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Informations de l'utilisateur */}
          <div className="px-6 py-6">
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {userInfo.prenom} {userInfo.nom}
              </h2>
              <p className="text-gray-500">{userInfo.email}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 text-elhassi1 mr-3" />
                    <span className="text-gray-600">{userInfo.email}</span>
                  </li>
                  {userInfo.telephone && (
                    <li className="flex items-center">
                      <Phone className="w-5 h-5 text-elhassi1 mr-3" />
                      <span className="text-gray-600">{userInfo.telephone}</span>
                    </li>
                  )}
                  <li className="flex items-center">
                    <Calendar className="w-5 h-5 text-elhassi1 mr-3" />
                    <span className="text-gray-600">
                      Inscrit le {new Date(userInfo.cree_le).toLocaleDateString('fr-FR')}
                    </span>
                  </li>
                  <li className="flex items-center">
                    {userInfo.role === 'super_admin' || userInfo.role === 'admin' ? (
                      <Shield className="w-5 h-5 text-elhassi1 mr-3" />
                    ) : (
                      <User className="w-5 h-5 text-elhassi1 mr-3" />
                    )}
                    <span className="text-gray-600">{getRoleDisplay()}</span>
                  </li>
                </ul>
              </motion.div>

              {userInfo.role === 'medecin' && userInfo.medecin && (
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations professionnelles</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <User className="w-5 h-5 text-elhassi1 mr-3" />
                      <span className="text-gray-600">Spécialité: {userInfo.medecin.specialite}</span>
                    </li>
                    {userInfo.medecin.telephone && (
                      <li className="flex items-center">
                        <Phone className="w-5 h-5 text-elhassi1 mr-3" />
                        <span className="text-gray-600">{userInfo.medecin.telephone}</span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex justify-end"
            >
              <button 
                className="px-4 py-2 bg-elhassi1 text-white rounded-md hover:bg-elhassi3 transition-colors flex items-center"
                onClick={() => alert('Fonctionnalité de modification de profil à venir')}
              >
                <Edit size={16} className="mr-2" />
                Modifier mon profil
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
