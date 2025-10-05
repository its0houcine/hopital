"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  photo?: string;
}

interface EditMedecinModalProps {
  isOpen: boolean;
  onClose: () => void;
  medecin: Medecin;
  onUpdate: (updatedMedecin: Medecin) => void;
}

export default function EditMedecinModal({
  isOpen,
  onClose,
  medecin,
  onUpdate,
}: EditMedecinModalProps) {
  const [formData, setFormData] = useState({
    nom: medecin.nom,
    prenom: medecin.prenom,
    email: medecin.email,
    telephone: medecin.telephone || "",
    specialite: medecin.specialite || "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      const response = await fetch(`/api/medecins/${medecin.id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification");
      }

      const updatedMedecin = await response.json();
      onUpdate(updatedMedecin);
      onClose();
      alert("Médecin modifié avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la modification du médecin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          Modifier le médecin
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Nom */}
          <div className="col-span-1">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          {/* Prénom */}
          <div className="col-span-1">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Téléphone */}
          <div className="col-span-1">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          {/* Spécialité */}
          <div className="col-span-2">
            <Label htmlFor="specialite">Spécialité</Label>
            <Input
              id="specialite"
              name="specialite"
              value={formData.specialite}
              onChange={handleChange}
              placeholder="Cardiologie, Radiologie, etc."
            />
          </div>

          {/* Upload Image */}
          <div className="col-span-2">
            <Label htmlFor="photo">Photo</Label>
            <div className="flex items-center gap-3">
              <label htmlFor="photo" className="cursor-pointer px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition flex items-center gap-2">
                📷 Choisir une image
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {medecin.photo && !photoFile && (
                <img
                  src={medecin.photo}
                  alt="Photo actuelle"
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              {photoFile && (
                <img
                  src={URL.createObjectURL(photoFile)}
                  alt="Nouvelle photo"
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => {}} disabled={isLoading}>
            {isLoading ? "Modification..." : "Modifier"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

