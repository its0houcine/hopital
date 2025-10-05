"use client";
import React, { useState, useRef } from "react";
import { Modal } from "../ui/modal";
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Stethoscope, Upload, X } from 'lucide-react';

interface AddMedecinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medecin: any) => void;
}

export default function AddMedecinModal({ isOpen, onClose, onSave }: AddMedecinModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    specialite: "",
    mot_de_passe: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation des champs requis
      if (!formData.nom || !formData.prenom || !formData.email || !formData.mot_de_passe || !formData.specialite) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Format d'email invalide");
      }

      // Validation du mot de passe
      if (formData.mot_de_passe.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }

      console.log("Préparation des données du formulaire pour l'envoi");
      const formDataToSend = new FormData();

      // Ajouter chaque champ au FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          console.log(`Ajout du champ ${key}: ${value}`);
          formDataToSend.append(key, value.toString());
        }
      });

      if (photoFile) {
        console.log(`Ajout de la photo: ${photoFile.name}, taille: ${photoFile.size} bytes`);
        formDataToSend.append("photo", photoFile);
      }

      // Ajouter un timestamp pour éviter les problèmes de cache
      const timestamp = new Date().getTime();

      console.log("Envoi de la requête POST à /api/medecins");
      const response = await fetch(`/api/medecins?_t=${timestamp}`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          // Ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      console.log(`Réponse reçue avec le statut: ${response.status}`);

      // Récupérer le texte de la réponse pour le débogage
      const responseText = await response.text();
      console.log("Réponse brute:", responseText.substring(0, 100) + (responseText.length > 100 ? '...' : ''));

      if (!response.ok) {
        // Essayer de parser le JSON si possible
        let errorMessage = `Erreur HTTP: ${response.status} ${response.statusText}`;

        try {
          if (responseText && responseText.trim().startsWith('{')) {
            const errorData = JSON.parse(responseText);
            if (errorData.error) {
              errorMessage = errorData.error;
            }
          }
        } catch (parseError) {
          console.error("Erreur lors du parsing de l'erreur:", parseError);
        }

        throw new Error(errorMessage);
      }

      // Parser le JSON
      let newMedecin;
      try {
        // Si la réponse est vide, c'est une erreur
        if (!responseText.trim()) {
          throw new Error("Réponse vide du serveur");
        }

        newMedecin = JSON.parse(responseText);

        // Vérifier que la réponse contient les données attendues
        if (!newMedecin || !newMedecin.id) {
          throw new Error("Format de réponse invalide");
        }

        console.log("Médecin créé avec succès:", newMedecin.id);
      } catch (parseError) {
        console.error("Erreur lors du parsing JSON:", parseError);
        console.error("Réponse non valide:", responseText.substring(0, 200));
        throw new Error("Format de réponse invalide");
      }

      // Mise à jour de l'UI
      onSave(newMedecin);
      onClose();

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        specialite: "",
        mot_de_passe: "",
      });
      setPhotoFile(null);
      setPhotoPreview(null);

      alert("Médecin ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du médecin:", error);
      alert(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <h4 className="mb-6 text-xl font-semibold text-gray-800 flex items-center">
        <span className="w-2 h-6 bg-gradient-to-b from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] rounded-sm mr-2"></span>
        Ajouter un médecin
      </h4>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nom */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <User size={16} className="mr-2" />
              Nom <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              type="text"
              name="nom"
              required
              placeholder="Entrez le nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            />
          </div>

          {/* Prénom */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <User size={16} className="mr-2" />
              Prénom <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              type="text"
              name="prenom"
              required
              placeholder="Entrez le prénom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <Mail size={16} className="mr-2" />
              Email <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              type="email"
              name="email"
              required
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <Lock size={16} className="mr-2" />
              Mot de passe <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              type="password"
              name="mot_de_passe"
              required
              placeholder="Minimum 6 caractères"
              value={formData.mot_de_passe}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <Phone size={16} className="mr-2" />
              Téléphone
            </label>
            <motion.input
              type="tel"
              name="telephone"
              placeholder="+33 6 12 34 56 78"
              value={formData.telephone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            />
          </div>

          {/* Spécialité */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <Stethoscope size={16} className="mr-2" />
              Spécialité <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.select
              name="specialite"
              required
              value={formData.specialite}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
            >
              <option value="">Sélectionner une spécialité</option>
              <option value="Cardiologie">Cardiologie</option>
              <option value="Radiologie">Radiologie</option>
              <option value="Oncologie">Oncologie</option>
              <option value="Neurologie">Neurologie</option>
              <option value="Pédiatrie">Pédiatrie</option>
              <option value="Gynécologie">Gynécologie</option>
              <option value="Dermatologie">Dermatologie</option>
              <option value="Ophtalmologie">Ophtalmologie</option>
              <option value="ORL">ORL</option>
              <option value="Psychiatrie">Psychiatrie</option>
              <option value="Autre">Autre</option>
            </motion.select>
          </div>
        </div>

        {/* Photo */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
            <Upload size={16} className="mr-2" />
            Photo
          </label>
          <div className="flex items-center gap-4">
            <motion.label
              htmlFor="photo-upload"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload size={16} />
              Choisir une image
            </motion.label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />

            {photoPreview && (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Aperçu"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                />
                <motion.button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  onClick={removePhoto}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </motion.button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Formats acceptés: JPG, PNG, GIF (max 5MB)</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <motion.button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Annuler
          </motion.button>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] border border-transparent rounded-md shadow-sm"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ajout en cours...
              </span>
            ) : "Ajouter le médecin"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}



