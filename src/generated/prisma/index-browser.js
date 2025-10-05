
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nom: 'nom',
  prenom: 'prenom',
  email: 'email',
  mot_de_passe: 'mot_de_passe',
  role: 'role',
  specialite: 'specialite',
  telephone: 'telephone',
  photo: 'photo',
  cree_le: 'cree_le'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  numero_patient: 'numero_patient',
  nom: 'nom',
  prenom: 'prenom',
  telephone: 'telephone',
  date_naissance: 'date_naissance',
  genre: 'genre',
  medecin_id: 'medecin_id',
  condition_medicale: 'condition_medicale',
  photo: 'photo',
  consultation: 'consultation',
  consultation_specialisee: 'consultation_specialisee',
  ct_sim: 'ct_sim',
  debut_traitement: 'debut_traitement',
  fin_traitement: 'fin_traitement',
  rdv_traitement: 'rdv_traitement',
  technique_irradiation: 'technique_irradiation',
  dose_totale: 'dose_totale',
  dose_fraction: 'dose_fraction',
  cree_le: 'cree_le'
};

exports.Prisma.DossierMedicalScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  diagnostic: 'diagnostic',
  traitement: 'traitement',
  note_medecin: 'note_medecin',
  date_maj: 'date_maj'
};

exports.Prisma.RendezVousScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  medecin_id: 'medecin_id',
  type_rdv: 'type_rdv',
  date_rdv: 'date_rdv'
};

exports.Prisma.FileAttenteScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  medecin_id: 'medecin_id',
  statut: 'statut',
  ordre: 'ordre',
  ajoute_le: 'ajoute_le'
};

exports.Prisma.ConsultationScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  medecin_id: 'medecin_id',
  note: 'note',
  date_consultation: 'date_consultation'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  expediteur_id: 'expediteur_id',
  destinataire_id: 'destinataire_id',
  message: 'message',
  vu: 'vu',
  envoye_le: 'envoye_le'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  admin: 'admin',
  medecin: 'medecin'
};

exports.Genre = exports.$Enums.Genre = {
  Homme: 'Homme',
  Femme: 'Femme',
  Autre: 'Autre'
};

exports.TypeRDV = exports.$Enums.TypeRDV = {
  Consultation: 'Consultation',
  Consultation_specialisee: 'Consultation_specialisee',
  CT_Sim: 'CT_Sim',
  Debut_traitement: 'Debut_traitement',
  Fin_traitement: 'Fin_traitement',
  Rendez_vous_de_consultation_de_traitement: 'Rendez_vous_de_consultation_de_traitement'
};

exports.StatutFileAttente = exports.$Enums.StatutFileAttente = {
  EN_ATTENTE: 'EN_ATTENTE',
  EN_COURS: 'EN_COURS',
  TERMINE: 'TERMINE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Patient: 'Patient',
  DossierMedical: 'DossierMedical',
  RendezVous: 'RendezVous',
  FileAttente: 'FileAttente',
  Consultation: 'Consultation',
  Message: 'Message'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
