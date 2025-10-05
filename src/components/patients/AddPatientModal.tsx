"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  telephone?: string;
  date_naissance: string;
  numero_patient: string;
  genre: string;
  adresse: string;
  photo?: File | null;
  cree_le: string;
}

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPatient: Patient, tempId?: number) => void;
}

export default function AddPatientModal({ isOpen, onClose, onSave }: AddPatientModalProps) {
  const initialFormState: Patient = {
    id: 0,
    nom: "",
    prenom: "",
    telephone: "",
    date_naissance: "",
    numero_patient: "",
    genre: "Homme",
    adresse: "",
    photo: null,
    cree_le: new Date().toISOString()
  };

  const [formData, setFormData] = useState<Patient>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (5 Mo maximum)
      const maxSize = 5 * 1024 * 1024; // 5 Mo
      if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. La taille maximale est de 5 Mo.');
        e.target.value = ''; // Réinitialiser l'input
        return;
      }

      // Vérifier le type de fichier
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Type de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.');
        e.target.value = ''; // Réinitialiser l'input
        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));
    } else {
      setFormData((prev) => ({ ...prev, photo: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom || !formData.prenom || !formData.date_naissance || !formData.numero_patient || !formData.genre || !formData.adresse) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Ajouter chaque champ au FormData sauf la photo
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '' && key !== 'photo') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Gérer la photo séparément
      if (formData.photo instanceof File) {
        formDataToSend.append('photo', formData.photo, formData.photo.name);
      }

      const response = await fetch('/api/patients', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du patient');
      }

      onSave(data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création du patient:", error);
      alert(error instanceof Error ? error.message : 'Erreur lors de la création du patient');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-xl font-semibold text-gray-800 flex items-center">
          <span className="w-2 h-6 bg-gradient-to-b from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] rounded-sm mr-2"></span>
          Ajouter un Patient
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Nom */}
          <div className="col-span-1">
            <Label htmlFor="nom">Nom</Label>
            <Input id="nom" type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
          </div>

          {/* Prénom */}
          <div className="col-span-1">
            <Label htmlFor="prenom">Prénom</Label>
            <Input id="prenom" type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
          </div>

          {/* Téléphone */}
          <div className="col-span-1">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input id="telephone" type="text" name="telephone" placeholder="+33 6 12 34 56 78" value={formData.telephone} onChange={handleChange} />
          </div>

          {/* Date de naissance */}
          <div className="col-span-1">
            <Label htmlFor="date_naissance">Date de Naissance</Label>
            <Input id="date_naissance" type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
          </div>

          {/* Numéro du patient */}
          <div className="col-span-1">
            <Label htmlFor="numero_patient">Numéro du Patient</Label>
            <Input id="numero_patient" type="text" name="numero_patient" placeholder="12345" value={formData.numero_patient} onChange={handleChange} required />
          </div>

          {/* Genre */}
          <div className="col-span-1">
            <Label htmlFor="genre">Genre</Label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Condition médicale */}
          <div className="col-span-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Input id="adresse" type="text" name="adresse" placeholder="adresse" value={formData.adresse} onChange={handleChange} required />
          </div>

          {/* Upload Image */}
          <div className="col-span-2">
            <Label htmlFor="photo">Photo</Label>
            <div className="flex items-center gap-3">
              <label htmlFor="photo" className="cursor-pointer px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition flex items-center gap-2">
                📷 Choisir une image
              </label>
              <input id="photo" type="file" name="photo" accept="image/*" onChange={handleFileChange} className="hidden" />

              {formData.photo && (
                <div className="w-20 h-20 rounded-md overflow-hidden shadow-md">
                  <img src={URL.createObjectURL(formData.photo)} alt="Aperçu" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2"
          >
            Annuler
          </Button>
          <Button
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)]"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ajout en cours...
              </span>
            ) : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
