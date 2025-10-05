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
  adresse?: string;
  antecedent?: string;
  diagnostic?: string;
  photo?: string;
  consultation?: string;
  consultation_specialisee?: string;
  ct_sim?: string;
  debut_traitement?: string;
  fin_traitement?: string;
  rdv_traitement?: string;
  technique_irradiation?: string;
  dose_totale?: number;
  dose_fraction?: number;
}

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  onUpdate: (updatedPatient: Patient) => void;
}

export default function EditPatientModal({
  isOpen,
  onClose,
  patient,
  onUpdate,
}: EditPatientModalProps) {
  const [formData, setFormData] = useState<Patient>({
    ...patient,
    date_naissance: patient.date_naissance || '',
    consultation: patient.consultation || '',
    consultation_specialisee: patient.consultation_specialisee || '',
    ct_sim: patient.ct_sim || '',
    debut_traitement: patient.debut_traitement || '',
    fin_traitement: patient.fin_traitement || '',
    rdv_traitement: patient.rdv_traitement || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    setFormData({
      ...patient,
      date_naissance: patient.date_naissance || '',
      consultation: patient.consultation || '',
      consultation_specialisee: patient.consultation_specialisee || '',
      ct_sim: patient.ct_sim || '',
      debut_traitement: patient.debut_traitement || '',
      fin_traitement: patient.fin_traitement || '',
      rdv_traitement: patient.rdv_traitement || '',
    });
  }, [patient]);

  useEffect(() => {
    // Nettoyage de l'URL de l'objet lors du démontage du composant
    return () => {
      if (photoFile) {
        URL.revokeObjectURL(URL.createObjectURL(photoFile));
      }
    };
  }, [photoFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: value ? parseFloat(value) : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

      // Ajouter tous les champs non nuls au FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== 'id' && key !== 'cree_le') {
          // Convertir les nombres en chaînes
          if (typeof value === 'number') {
            formDataToSend.append(key, value.toString());
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      // Ajouter la photo si elle existe
      if (photoFile) {
        formDataToSend.append('photo', photoFile);
      }

      const response = await fetch(`/api/patients/${patient.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour');
      }

      onUpdate(data);
      onClose();
      alert('Patient mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de la mise à jour du patient');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      className="max-w-[90%] md:max-w-[800px] m-4 max-h-[90vh] overflow-y-auto"
    >
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6">Modifier le patient</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
              
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
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="date_naissance">Date de naissance</Label>
                <Input
                  id="date_naissance"
                  name="date_naissance"
                  type="date"
                  value={formData.date_naissance || ''}
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  name="adresse"
                  value={formData.adresse || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Informations médicales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations médicales</h3>
              
              <div>
                <Label htmlFor="antecedent">Antécédents</Label>
                <textarea
                  id="antecedent"
                  name="antecedent"
                  value={formData.antecedent || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="diagnostic">Diagnostic</Label>
                <textarea
                  id="diagnostic"
                  name="diagnostic"
                  value={formData.diagnostic || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="technique_irradiation">Technique d'irradiation</Label>
                <Input
                  id="technique_irradiation"
                  name="technique_irradiation"
                  value={formData.technique_irradiation || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="dose_totale">Dose totale (Gy)</Label>
                <Input
                  id="dose_totale"
                  name="dose_totale"
                  type="number"
                  step={0.01}
                  value={formData.dose_totale ?? ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="dose_fraction">Dose par fraction (Gy)</Label>
                <Input
                  id="dose_fraction"
                  name="dose_fraction"
                  type="number"
                  step={0.01}
                  value={formData.dose_fraction ?? ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dates importantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="consultation">Consultation initiale</Label>
                <Input
                  id="consultation"
                  name="consultation"
                  type="date"
                  value={formData.consultation || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="consultation_specialisee">Consultation spécialisée</Label>
                <Input
                  id="consultation_specialisee"
                  name="consultation_specialisee"
                  type="date"
                  value={formData.consultation_specialisee || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="ct_sim">CT Sim</Label>
                <Input
                  id="ct_sim"
                  name="ct_sim"
                  type="date"
                  value={formData.ct_sim || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="debut_traitement">Début traitement</Label>
                <Input
                  id="debut_traitement"
                  name="debut_traitement"
                  type="date"
                  value={formData.debut_traitement || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="fin_traitement">Fin traitement</Label>
                <Input
                  id="fin_traitement"
                  name="fin_traitement"
                  type="date"
                  value={formData.fin_traitement || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="rdv_traitement">RDV traitement</Label>
                <Input
                  id="rdv_traitement"
                  name="rdv_traitement"
                  type="date"
                  value={formData.rdv_traitement || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Photo */}
          <div>
            <Label htmlFor="photo">Photo</Label>
            <div className="flex items-center gap-4">
              {photoFile ? (
                <img
                  src={URL.createObjectURL(photoFile)}
                  alt="Nouvelle photo"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Photo actuelle"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full" />
              )}
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="photo"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {formData.photo || photoFile ? 'Changer la photo' : 'Ajouter une photo'}
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}






