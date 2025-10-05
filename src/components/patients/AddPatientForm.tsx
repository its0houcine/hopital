"use client";

import React, { useState } from "react";
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
}

interface AddPatientFormProps {
  onSuccess: (patient: Patient) => void;
}

export default function AddPatientForm({ onSuccess }: AddPatientFormProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    date_naissance: "",
    numero_patient: "",
    genre: "Homme",
    adresse: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/patients/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du patient");
      }

      const newPatient = await response.json();
      onSuccess(newPatient);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="date_naissance">Date de naissance</Label>
          <Input
            id="date_naissance"
            name="date_naissance"
            type="date"
            value={formData.date_naissance}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="numero_patient">Numéro patient</Label>
          <Input
            id="numero_patient"
            name="numero_patient"
            value={formData.numero_patient}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="adresse">Adresse</Label>
          <Input
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Ajout en cours..." : "Ajouter le patient"}
        </Button>
      </div>
    </form>
  );
}