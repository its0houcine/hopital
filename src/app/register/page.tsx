'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { register } from '@/app/actions/auth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    confirmation: '',
    specialite: '',
    telephone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation simple
    if (formData.mot_de_passe !== formData.confirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      // Appeler l'action serveur pour l'enregistrement
      const result = await register({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        mot_de_passe: formData.mot_de_passe,
        specialite: formData.specialite,
        telephone: formData.telephone
      });

      if (result.success) {
        // Rediriger vers la page d'accueil
        router.push('/');
      } else {
        setError(result.error || 'Erreur lors de l\'enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Logo ELhassi"
            width={150}
            height={150}
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link href="/login" className="font-medium text-elhassi1 hover:text-elhassi2">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="nom" className="sr-only">Nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="prenom" className="sr-only">Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="sr-only">Téléphone</label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="specialite" className="sr-only">Spécialité</label>
              <input
                id="specialite"
                name="specialite"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                placeholder="Spécialité médicale"
                value={formData.specialite}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mot_de_passe" className="sr-only">Mot de passe</label>
              <input
                id="mot_de_passe"
                name="mot_de_passe"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmation" className="sr-only">Confirmer le mot de passe</label>
              <input
                id="confirmation"
                name="confirmation"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-elhassi1 focus:border-elhassi1 focus:z-10 sm:text-sm"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmation}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-elhassi1 to-elhassi3 hover:from-elhassi2 hover:to-elhassi4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-elhassi1"
            >
              {loading ? 'Création en cours...' : 'Créer un compte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
