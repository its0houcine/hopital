import { Modal } from "@/components/ui/modal";
import Image from "next/image";

interface ConsultationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: {
    date: Date;
    diagnostic: string | null;
    traitement: string | null;
    notes: string | null;
    medecin: {
      nom: string;
      prenom: string;
      photo: string | null;
    };
  };
}

function formatDate(date: Date | string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR");
}

export default function ConsultationDetailsModal({
  isOpen,
  onClose,
  consultation,
}: ConsultationDetailsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-lg bg-white/95 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-white/20"
    >
      {/* En-tête avec gradient elhassi et animation */}
      <div className="relative bg-gradient-to-r from-[#329DFF] to-blue-600 px-6 py-4 shimmer-effect">
        <h2 className="text-xl font-semibold text-white">
          Consultation du {formatDate(consultation.date)}
        </h2>
      </div>

        {/* Information du médecin */}
        <div className="px-6 py-4 bg-blue-50/50">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#329DFF] to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                {consultation.medecin.photo ? (
                  <Image
                    src={consultation.medecin.photo}
                    alt={`Dr. ${consultation.medecin.prenom} ${consultation.medecin.nom}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-500">
                    👨‍⚕️
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">
                Dr. {consultation.medecin.prenom} {consultation.medecin.nom}
              </h3>
              <p className="text-sm text-blue-600">Médecin traitant</p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="px-6 py-4 space-y-4">
          {/* Diagnostic */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#329DFF] uppercase tracking-wider">
              Diagnostic
            </h4>
            <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
              <p className="text-gray-700">
                {consultation.diagnostic || "Aucun diagnostic renseigné"}
              </p>
            </div>
          </div>

          {/* Traitement */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#329DFF] uppercase tracking-wider">
              Traitement
            </h4>
            <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
              <p className="text-gray-700">
                {consultation.traitement || "Aucun traitement renseigné"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#329DFF] uppercase tracking-wider">
              Notes
            </h4>
            <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
              <p className="text-gray-700">
                {consultation.notes || "Aucune note"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer avec gradient et animation */}
        <div className="px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#329DFF] to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity duration-200 shimmer-effect"
          >
            Fermer
          </button>
        </div>
    </Modal>
  );
}



