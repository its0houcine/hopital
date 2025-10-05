
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model DossierMedical
 * 
 */
export type DossierMedical = $Result.DefaultSelection<Prisma.$DossierMedicalPayload>
/**
 * Model RendezVous
 * 
 */
export type RendezVous = $Result.DefaultSelection<Prisma.$RendezVousPayload>
/**
 * Model FileAttente
 * 
 */
export type FileAttente = $Result.DefaultSelection<Prisma.$FileAttentePayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  medecin: 'medecin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Genre: {
  Homme: 'Homme',
  Femme: 'Femme',
  Autre: 'Autre'
};

export type Genre = (typeof Genre)[keyof typeof Genre]


export const StatutFileAttente: {
  EN_ATTENTE: 'EN_ATTENTE',
  EN_COURS: 'EN_COURS',
  TERMINE: 'TERMINE'
};

export type StatutFileAttente = (typeof StatutFileAttente)[keyof typeof StatutFileAttente]


export const TypeRDV: {
  Consultation: 'Consultation',
  Consultation_specialisee: 'Consultation_specialisee',
  CT_Sim: 'CT_Sim',
  Debut_traitement: 'Debut_traitement',
  Fin_traitement: 'Fin_traitement',
  Rendez_vous_de_consultation_de_traitement: 'Rendez_vous_de_consultation_de_traitement'
};

export type TypeRDV = (typeof TypeRDV)[keyof typeof TypeRDV]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Genre = $Enums.Genre

export const Genre: typeof $Enums.Genre

export type StatutFileAttente = $Enums.StatutFileAttente

export const StatutFileAttente: typeof $Enums.StatutFileAttente

export type TypeRDV = $Enums.TypeRDV

export const TypeRDV: typeof $Enums.TypeRDV

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dossierMedical`: Exposes CRUD operations for the **DossierMedical** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DossierMedicals
    * const dossierMedicals = await prisma.dossierMedical.findMany()
    * ```
    */
  get dossierMedical(): Prisma.DossierMedicalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rendezVous`: Exposes CRUD operations for the **RendezVous** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RendezVous
    * const rendezVous = await prisma.rendezVous.findMany()
    * ```
    */
  get rendezVous(): Prisma.RendezVousDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fileAttente`: Exposes CRUD operations for the **FileAttente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileAttentes
    * const fileAttentes = await prisma.fileAttente.findMany()
    * ```
    */
  get fileAttente(): Prisma.FileAttenteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Patient: 'Patient',
    DossierMedical: 'DossierMedical',
    RendezVous: 'RendezVous',
    FileAttente: 'FileAttente',
    Consultation: 'Consultation',
    Message: 'Message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "patient" | "dossierMedical" | "rendezVous" | "fileAttente" | "consultation" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      DossierMedical: {
        payload: Prisma.$DossierMedicalPayload<ExtArgs>
        fields: Prisma.DossierMedicalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DossierMedicalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DossierMedicalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          findFirst: {
            args: Prisma.DossierMedicalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DossierMedicalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          findMany: {
            args: Prisma.DossierMedicalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>[]
          }
          create: {
            args: Prisma.DossierMedicalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          createMany: {
            args: Prisma.DossierMedicalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DossierMedicalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>[]
          }
          delete: {
            args: Prisma.DossierMedicalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          update: {
            args: Prisma.DossierMedicalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          deleteMany: {
            args: Prisma.DossierMedicalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DossierMedicalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DossierMedicalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>[]
          }
          upsert: {
            args: Prisma.DossierMedicalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DossierMedicalPayload>
          }
          aggregate: {
            args: Prisma.DossierMedicalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDossierMedical>
          }
          groupBy: {
            args: Prisma.DossierMedicalGroupByArgs<ExtArgs>
            result: $Utils.Optional<DossierMedicalGroupByOutputType>[]
          }
          count: {
            args: Prisma.DossierMedicalCountArgs<ExtArgs>
            result: $Utils.Optional<DossierMedicalCountAggregateOutputType> | number
          }
        }
      }
      RendezVous: {
        payload: Prisma.$RendezVousPayload<ExtArgs>
        fields: Prisma.RendezVousFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RendezVousFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RendezVousFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findFirst: {
            args: Prisma.RendezVousFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RendezVousFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findMany: {
            args: Prisma.RendezVousFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          create: {
            args: Prisma.RendezVousCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          createMany: {
            args: Prisma.RendezVousCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RendezVousCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          delete: {
            args: Prisma.RendezVousDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          update: {
            args: Prisma.RendezVousUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          deleteMany: {
            args: Prisma.RendezVousDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RendezVousUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RendezVousUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          upsert: {
            args: Prisma.RendezVousUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          aggregate: {
            args: Prisma.RendezVousAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRendezVous>
          }
          groupBy: {
            args: Prisma.RendezVousGroupByArgs<ExtArgs>
            result: $Utils.Optional<RendezVousGroupByOutputType>[]
          }
          count: {
            args: Prisma.RendezVousCountArgs<ExtArgs>
            result: $Utils.Optional<RendezVousCountAggregateOutputType> | number
          }
        }
      }
      FileAttente: {
        payload: Prisma.$FileAttentePayload<ExtArgs>
        fields: Prisma.FileAttenteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileAttenteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileAttenteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          findFirst: {
            args: Prisma.FileAttenteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileAttenteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          findMany: {
            args: Prisma.FileAttenteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>[]
          }
          create: {
            args: Prisma.FileAttenteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          createMany: {
            args: Prisma.FileAttenteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileAttenteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>[]
          }
          delete: {
            args: Prisma.FileAttenteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          update: {
            args: Prisma.FileAttenteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          deleteMany: {
            args: Prisma.FileAttenteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileAttenteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileAttenteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>[]
          }
          upsert: {
            args: Prisma.FileAttenteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttentePayload>
          }
          aggregate: {
            args: Prisma.FileAttenteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileAttente>
          }
          groupBy: {
            args: Prisma.FileAttenteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileAttenteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileAttenteCountArgs<ExtArgs>
            result: $Utils.Optional<FileAttenteCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    patient?: PatientOmit
    dossierMedical?: DossierMedicalOmit
    rendezVous?: RendezVousOmit
    fileAttente?: FileAttenteOmit
    consultation?: ConsultationOmit
    message?: MessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    patients: number
    rendezVous: number
    fileAttente: number
    consultations: number
    messagesEnvoyes: number
    messagesRecus: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patients?: boolean | UserCountOutputTypeCountPatientsArgs
    rendezVous?: boolean | UserCountOutputTypeCountRendezVousArgs
    fileAttente?: boolean | UserCountOutputTypeCountFileAttenteArgs
    consultations?: boolean | UserCountOutputTypeCountConsultationsArgs
    messagesEnvoyes?: boolean | UserCountOutputTypeCountMessagesEnvoyesArgs
    messagesRecus?: boolean | UserCountOutputTypeCountMessagesRecusArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileAttenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileAttenteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesEnvoyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesRecusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    dossier: number
    rendezVous: number
    fileAttente: number
    consultations: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dossier?: boolean | PatientCountOutputTypeCountDossierArgs
    rendezVous?: boolean | PatientCountOutputTypeCountRendezVousArgs
    fileAttente?: boolean | PatientCountOutputTypeCountFileAttenteArgs
    consultations?: boolean | PatientCountOutputTypeCountConsultationsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountDossierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DossierMedicalWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountFileAttenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileAttenteWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    nom: string | null
    prenom: string | null
    email: string | null
    mot_de_passe: string | null
    role: $Enums.Role | null
    specialite: string | null
    telephone: string | null
    photo: string | null
    cree_le: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    nom: string | null
    prenom: string | null
    email: string | null
    mot_de_passe: string | null
    role: $Enums.Role | null
    specialite: string | null
    telephone: string | null
    photo: string | null
    cree_le: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    mot_de_passe: number
    role: number
    specialite: number
    telephone: number
    photo: number
    cree_le: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    mot_de_passe?: true
    role?: true
    specialite?: true
    telephone?: true
    photo?: true
    cree_le?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    mot_de_passe?: true
    role?: true
    specialite?: true
    telephone?: true
    photo?: true
    cree_le?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    mot_de_passe?: true
    role?: true
    specialite?: true
    telephone?: true
    photo?: true
    cree_le?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite: string | null
    telephone: string | null
    photo: string | null
    cree_le: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    mot_de_passe?: boolean
    role?: boolean
    specialite?: boolean
    telephone?: boolean
    photo?: boolean
    cree_le?: boolean
    patientProfil?: boolean | User$patientProfilArgs<ExtArgs>
    patients?: boolean | User$patientsArgs<ExtArgs>
    rendezVous?: boolean | User$rendezVousArgs<ExtArgs>
    fileAttente?: boolean | User$fileAttenteArgs<ExtArgs>
    consultations?: boolean | User$consultationsArgs<ExtArgs>
    messagesEnvoyes?: boolean | User$messagesEnvoyesArgs<ExtArgs>
    messagesRecus?: boolean | User$messagesRecusArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    mot_de_passe?: boolean
    role?: boolean
    specialite?: boolean
    telephone?: boolean
    photo?: boolean
    cree_le?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    mot_de_passe?: boolean
    role?: boolean
    specialite?: boolean
    telephone?: boolean
    photo?: boolean
    cree_le?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    mot_de_passe?: boolean
    role?: boolean
    specialite?: boolean
    telephone?: boolean
    photo?: boolean
    cree_le?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "mot_de_passe" | "role" | "specialite" | "telephone" | "photo" | "cree_le", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientProfil?: boolean | User$patientProfilArgs<ExtArgs>
    patients?: boolean | User$patientsArgs<ExtArgs>
    rendezVous?: boolean | User$rendezVousArgs<ExtArgs>
    fileAttente?: boolean | User$fileAttenteArgs<ExtArgs>
    consultations?: boolean | User$consultationsArgs<ExtArgs>
    messagesEnvoyes?: boolean | User$messagesEnvoyesArgs<ExtArgs>
    messagesRecus?: boolean | User$messagesRecusArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patientProfil: Prisma.$PatientPayload<ExtArgs> | null
      patients: Prisma.$PatientPayload<ExtArgs>[]
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
      fileAttente: Prisma.$FileAttentePayload<ExtArgs>[]
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
      messagesEnvoyes: Prisma.$MessagePayload<ExtArgs>[]
      messagesRecus: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nom: string
      prenom: string
      email: string
      mot_de_passe: string
      role: $Enums.Role
      specialite: string | null
      telephone: string | null
      photo: string | null
      cree_le: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patientProfil<T extends User$patientProfilArgs<ExtArgs> = {}>(args?: Subset<T, User$patientProfilArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patients<T extends User$patientsArgs<ExtArgs> = {}>(args?: Subset<T, User$patientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rendezVous<T extends User$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, User$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fileAttente<T extends User$fileAttenteArgs<ExtArgs> = {}>(args?: Subset<T, User$fileAttenteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultations<T extends User$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, User$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesEnvoyes<T extends User$messagesEnvoyesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesEnvoyesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesRecus<T extends User$messagesRecusArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesRecusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly mot_de_passe: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly specialite: FieldRef<"User", 'String'>
    readonly telephone: FieldRef<"User", 'String'>
    readonly photo: FieldRef<"User", 'String'>
    readonly cree_le: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.patientProfil
   */
  export type User$patientProfilArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * User.patients
   */
  export type User$patientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    cursor?: PatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * User.rendezVous
   */
  export type User$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * User.fileAttente
   */
  export type User$fileAttenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    where?: FileAttenteWhereInput
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    cursor?: FileAttenteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileAttenteScalarFieldEnum | FileAttenteScalarFieldEnum[]
  }

  /**
   * User.consultations
   */
  export type User$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * User.messagesEnvoyes
   */
  export type User$messagesEnvoyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.messagesRecus
   */
  export type User$messagesRecusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    medecin_id: number | null
    dose_totale: number | null
    dose_fraction: number | null
  }

  export type PatientSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    medecin_id: number | null
    dose_totale: number | null
    dose_fraction: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    numero_patient: string | null
    nom: string | null
    prenom: string | null
    telephone: string | null
    date_naissance: Date | null
    genre: $Enums.Genre | null
    medecin_id: number | null
    condition_medicale: string | null
    photo: string | null
    consultation: Date | null
    consultation_specialisee: Date | null
    ct_sim: Date | null
    debut_traitement: Date | null
    fin_traitement: Date | null
    rdv_traitement: Date | null
    technique_irradiation: string | null
    dose_totale: number | null
    dose_fraction: number | null
    cree_le: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    numero_patient: string | null
    nom: string | null
    prenom: string | null
    telephone: string | null
    date_naissance: Date | null
    genre: $Enums.Genre | null
    medecin_id: number | null
    condition_medicale: string | null
    photo: string | null
    consultation: Date | null
    consultation_specialisee: Date | null
    ct_sim: Date | null
    debut_traitement: Date | null
    fin_traitement: Date | null
    rdv_traitement: Date | null
    technique_irradiation: string | null
    dose_totale: number | null
    dose_fraction: number | null
    cree_le: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    user_id: number
    numero_patient: number
    nom: number
    prenom: number
    telephone: number
    date_naissance: number
    genre: number
    medecin_id: number
    condition_medicale: number
    photo: number
    consultation: number
    consultation_specialisee: number
    ct_sim: number
    debut_traitement: number
    fin_traitement: number
    rdv_traitement: number
    technique_irradiation: number
    dose_totale: number
    dose_fraction: number
    cree_le: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    id?: true
    user_id?: true
    medecin_id?: true
    dose_totale?: true
    dose_fraction?: true
  }

  export type PatientSumAggregateInputType = {
    id?: true
    user_id?: true
    medecin_id?: true
    dose_totale?: true
    dose_fraction?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    user_id?: true
    numero_patient?: true
    nom?: true
    prenom?: true
    telephone?: true
    date_naissance?: true
    genre?: true
    medecin_id?: true
    condition_medicale?: true
    photo?: true
    consultation?: true
    consultation_specialisee?: true
    ct_sim?: true
    debut_traitement?: true
    fin_traitement?: true
    rdv_traitement?: true
    technique_irradiation?: true
    dose_totale?: true
    dose_fraction?: true
    cree_le?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    user_id?: true
    numero_patient?: true
    nom?: true
    prenom?: true
    telephone?: true
    date_naissance?: true
    genre?: true
    medecin_id?: true
    condition_medicale?: true
    photo?: true
    consultation?: true
    consultation_specialisee?: true
    ct_sim?: true
    debut_traitement?: true
    fin_traitement?: true
    rdv_traitement?: true
    technique_irradiation?: true
    dose_totale?: true
    dose_fraction?: true
    cree_le?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    user_id?: true
    numero_patient?: true
    nom?: true
    prenom?: true
    telephone?: true
    date_naissance?: true
    genre?: true
    medecin_id?: true
    condition_medicale?: true
    photo?: true
    consultation?: true
    consultation_specialisee?: true
    ct_sim?: true
    debut_traitement?: true
    fin_traitement?: true
    rdv_traitement?: true
    technique_irradiation?: true
    dose_totale?: true
    dose_fraction?: true
    cree_le?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: number
    user_id: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone: string | null
    date_naissance: Date
    genre: $Enums.Genre
    medecin_id: number | null
    condition_medicale: string
    photo: string | null
    consultation: Date | null
    consultation_specialisee: Date | null
    ct_sim: Date | null
    debut_traitement: Date | null
    fin_traitement: Date | null
    rdv_traitement: Date | null
    technique_irradiation: string | null
    dose_totale: number | null
    dose_fraction: number | null
    cree_le: Date
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    numero_patient?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    date_naissance?: boolean
    genre?: boolean
    medecin_id?: boolean
    condition_medicale?: boolean
    photo?: boolean
    consultation?: boolean
    consultation_specialisee?: boolean
    ct_sim?: boolean
    debut_traitement?: boolean
    fin_traitement?: boolean
    rdv_traitement?: boolean
    technique_irradiation?: boolean
    dose_totale?: boolean
    dose_fraction?: boolean
    cree_le?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
    dossier?: boolean | Patient$dossierArgs<ExtArgs>
    rendezVous?: boolean | Patient$rendezVousArgs<ExtArgs>
    fileAttente?: boolean | Patient$fileAttenteArgs<ExtArgs>
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    numero_patient?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    date_naissance?: boolean
    genre?: boolean
    medecin_id?: boolean
    condition_medicale?: boolean
    photo?: boolean
    consultation?: boolean
    consultation_specialisee?: boolean
    ct_sim?: boolean
    debut_traitement?: boolean
    fin_traitement?: boolean
    rdv_traitement?: boolean
    technique_irradiation?: boolean
    dose_totale?: boolean
    dose_fraction?: boolean
    cree_le?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    numero_patient?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    date_naissance?: boolean
    genre?: boolean
    medecin_id?: boolean
    condition_medicale?: boolean
    photo?: boolean
    consultation?: boolean
    consultation_specialisee?: boolean
    ct_sim?: boolean
    debut_traitement?: boolean
    fin_traitement?: boolean
    rdv_traitement?: boolean
    technique_irradiation?: boolean
    dose_totale?: boolean
    dose_fraction?: boolean
    cree_le?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    user_id?: boolean
    numero_patient?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    date_naissance?: boolean
    genre?: boolean
    medecin_id?: boolean
    condition_medicale?: boolean
    photo?: boolean
    consultation?: boolean
    consultation_specialisee?: boolean
    ct_sim?: boolean
    debut_traitement?: boolean
    fin_traitement?: boolean
    rdv_traitement?: boolean
    technique_irradiation?: boolean
    dose_totale?: boolean
    dose_fraction?: boolean
    cree_le?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "numero_patient" | "nom" | "prenom" | "telephone" | "date_naissance" | "genre" | "medecin_id" | "condition_medicale" | "photo" | "consultation" | "consultation_specialisee" | "ct_sim" | "debut_traitement" | "fin_traitement" | "rdv_traitement" | "technique_irradiation" | "dose_totale" | "dose_fraction" | "cree_le", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
    dossier?: boolean | Patient$dossierArgs<ExtArgs>
    rendezVous?: boolean | Patient$rendezVousArgs<ExtArgs>
    fileAttente?: boolean | Patient$fileAttenteArgs<ExtArgs>
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
  }
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
    medecin?: boolean | Patient$medecinArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      medecin: Prisma.$UserPayload<ExtArgs> | null
      dossier: Prisma.$DossierMedicalPayload<ExtArgs>[]
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
      fileAttente: Prisma.$FileAttentePayload<ExtArgs>[]
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number | null
      numero_patient: string
      nom: string
      prenom: string
      telephone: string | null
      date_naissance: Date
      genre: $Enums.Genre
      medecin_id: number | null
      condition_medicale: string
      photo: string | null
      consultation: Date | null
      consultation_specialisee: Date | null
      ct_sim: Date | null
      debut_traitement: Date | null
      fin_traitement: Date | null
      rdv_traitement: Date | null
      technique_irradiation: string | null
      dose_totale: number | null
      dose_fraction: number | null
      cree_le: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Patient$userArgs<ExtArgs> = {}>(args?: Subset<T, Patient$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    medecin<T extends Patient$medecinArgs<ExtArgs> = {}>(args?: Subset<T, Patient$medecinArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dossier<T extends Patient$dossierArgs<ExtArgs> = {}>(args?: Subset<T, Patient$dossierArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rendezVous<T extends Patient$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, Patient$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fileAttente<T extends Patient$fileAttenteArgs<ExtArgs> = {}>(args?: Subset<T, Patient$fileAttenteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultations<T extends Patient$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'Int'>
    readonly user_id: FieldRef<"Patient", 'Int'>
    readonly numero_patient: FieldRef<"Patient", 'String'>
    readonly nom: FieldRef<"Patient", 'String'>
    readonly prenom: FieldRef<"Patient", 'String'>
    readonly telephone: FieldRef<"Patient", 'String'>
    readonly date_naissance: FieldRef<"Patient", 'DateTime'>
    readonly genre: FieldRef<"Patient", 'Genre'>
    readonly medecin_id: FieldRef<"Patient", 'Int'>
    readonly condition_medicale: FieldRef<"Patient", 'String'>
    readonly photo: FieldRef<"Patient", 'String'>
    readonly consultation: FieldRef<"Patient", 'DateTime'>
    readonly consultation_specialisee: FieldRef<"Patient", 'DateTime'>
    readonly ct_sim: FieldRef<"Patient", 'DateTime'>
    readonly debut_traitement: FieldRef<"Patient", 'DateTime'>
    readonly fin_traitement: FieldRef<"Patient", 'DateTime'>
    readonly rdv_traitement: FieldRef<"Patient", 'DateTime'>
    readonly technique_irradiation: FieldRef<"Patient", 'String'>
    readonly dose_totale: FieldRef<"Patient", 'Float'>
    readonly dose_fraction: FieldRef<"Patient", 'Float'>
    readonly cree_le: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.user
   */
  export type Patient$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Patient.medecin
   */
  export type Patient$medecinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Patient.dossier
   */
  export type Patient$dossierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    where?: DossierMedicalWhereInput
    orderBy?: DossierMedicalOrderByWithRelationInput | DossierMedicalOrderByWithRelationInput[]
    cursor?: DossierMedicalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DossierMedicalScalarFieldEnum | DossierMedicalScalarFieldEnum[]
  }

  /**
   * Patient.rendezVous
   */
  export type Patient$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * Patient.fileAttente
   */
  export type Patient$fileAttenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    where?: FileAttenteWhereInput
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    cursor?: FileAttenteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileAttenteScalarFieldEnum | FileAttenteScalarFieldEnum[]
  }

  /**
   * Patient.consultations
   */
  export type Patient$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model DossierMedical
   */

  export type AggregateDossierMedical = {
    _count: DossierMedicalCountAggregateOutputType | null
    _avg: DossierMedicalAvgAggregateOutputType | null
    _sum: DossierMedicalSumAggregateOutputType | null
    _min: DossierMedicalMinAggregateOutputType | null
    _max: DossierMedicalMaxAggregateOutputType | null
  }

  export type DossierMedicalAvgAggregateOutputType = {
    id: number | null
    patient_id: number | null
  }

  export type DossierMedicalSumAggregateOutputType = {
    id: number | null
    patient_id: number | null
  }

  export type DossierMedicalMinAggregateOutputType = {
    id: number | null
    patient_id: number | null
    diagnostic: string | null
    traitement: string | null
    note_medecin: string | null
    date_maj: Date | null
  }

  export type DossierMedicalMaxAggregateOutputType = {
    id: number | null
    patient_id: number | null
    diagnostic: string | null
    traitement: string | null
    note_medecin: string | null
    date_maj: Date | null
  }

  export type DossierMedicalCountAggregateOutputType = {
    id: number
    patient_id: number
    diagnostic: number
    traitement: number
    note_medecin: number
    date_maj: number
    _all: number
  }


  export type DossierMedicalAvgAggregateInputType = {
    id?: true
    patient_id?: true
  }

  export type DossierMedicalSumAggregateInputType = {
    id?: true
    patient_id?: true
  }

  export type DossierMedicalMinAggregateInputType = {
    id?: true
    patient_id?: true
    diagnostic?: true
    traitement?: true
    note_medecin?: true
    date_maj?: true
  }

  export type DossierMedicalMaxAggregateInputType = {
    id?: true
    patient_id?: true
    diagnostic?: true
    traitement?: true
    note_medecin?: true
    date_maj?: true
  }

  export type DossierMedicalCountAggregateInputType = {
    id?: true
    patient_id?: true
    diagnostic?: true
    traitement?: true
    note_medecin?: true
    date_maj?: true
    _all?: true
  }

  export type DossierMedicalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DossierMedical to aggregate.
     */
    where?: DossierMedicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DossierMedicals to fetch.
     */
    orderBy?: DossierMedicalOrderByWithRelationInput | DossierMedicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DossierMedicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DossierMedicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DossierMedicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DossierMedicals
    **/
    _count?: true | DossierMedicalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DossierMedicalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DossierMedicalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DossierMedicalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DossierMedicalMaxAggregateInputType
  }

  export type GetDossierMedicalAggregateType<T extends DossierMedicalAggregateArgs> = {
        [P in keyof T & keyof AggregateDossierMedical]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDossierMedical[P]>
      : GetScalarType<T[P], AggregateDossierMedical[P]>
  }




  export type DossierMedicalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DossierMedicalWhereInput
    orderBy?: DossierMedicalOrderByWithAggregationInput | DossierMedicalOrderByWithAggregationInput[]
    by: DossierMedicalScalarFieldEnum[] | DossierMedicalScalarFieldEnum
    having?: DossierMedicalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DossierMedicalCountAggregateInputType | true
    _avg?: DossierMedicalAvgAggregateInputType
    _sum?: DossierMedicalSumAggregateInputType
    _min?: DossierMedicalMinAggregateInputType
    _max?: DossierMedicalMaxAggregateInputType
  }

  export type DossierMedicalGroupByOutputType = {
    id: number
    patient_id: number
    diagnostic: string
    traitement: string | null
    note_medecin: string | null
    date_maj: Date
    _count: DossierMedicalCountAggregateOutputType | null
    _avg: DossierMedicalAvgAggregateOutputType | null
    _sum: DossierMedicalSumAggregateOutputType | null
    _min: DossierMedicalMinAggregateOutputType | null
    _max: DossierMedicalMaxAggregateOutputType | null
  }

  type GetDossierMedicalGroupByPayload<T extends DossierMedicalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DossierMedicalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DossierMedicalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DossierMedicalGroupByOutputType[P]>
            : GetScalarType<T[P], DossierMedicalGroupByOutputType[P]>
        }
      >
    >


  export type DossierMedicalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    diagnostic?: boolean
    traitement?: boolean
    note_medecin?: boolean
    date_maj?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dossierMedical"]>

  export type DossierMedicalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    diagnostic?: boolean
    traitement?: boolean
    note_medecin?: boolean
    date_maj?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dossierMedical"]>

  export type DossierMedicalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    diagnostic?: boolean
    traitement?: boolean
    note_medecin?: boolean
    date_maj?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dossierMedical"]>

  export type DossierMedicalSelectScalar = {
    id?: boolean
    patient_id?: boolean
    diagnostic?: boolean
    traitement?: boolean
    note_medecin?: boolean
    date_maj?: boolean
  }

  export type DossierMedicalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patient_id" | "diagnostic" | "traitement" | "note_medecin" | "date_maj", ExtArgs["result"]["dossierMedical"]>
  export type DossierMedicalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type DossierMedicalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type DossierMedicalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $DossierMedicalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DossierMedical"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patient_id: number
      diagnostic: string
      traitement: string | null
      note_medecin: string | null
      date_maj: Date
    }, ExtArgs["result"]["dossierMedical"]>
    composites: {}
  }

  type DossierMedicalGetPayload<S extends boolean | null | undefined | DossierMedicalDefaultArgs> = $Result.GetResult<Prisma.$DossierMedicalPayload, S>

  type DossierMedicalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DossierMedicalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DossierMedicalCountAggregateInputType | true
    }

  export interface DossierMedicalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DossierMedical'], meta: { name: 'DossierMedical' } }
    /**
     * Find zero or one DossierMedical that matches the filter.
     * @param {DossierMedicalFindUniqueArgs} args - Arguments to find a DossierMedical
     * @example
     * // Get one DossierMedical
     * const dossierMedical = await prisma.dossierMedical.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DossierMedicalFindUniqueArgs>(args: SelectSubset<T, DossierMedicalFindUniqueArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DossierMedical that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DossierMedicalFindUniqueOrThrowArgs} args - Arguments to find a DossierMedical
     * @example
     * // Get one DossierMedical
     * const dossierMedical = await prisma.dossierMedical.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DossierMedicalFindUniqueOrThrowArgs>(args: SelectSubset<T, DossierMedicalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DossierMedical that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalFindFirstArgs} args - Arguments to find a DossierMedical
     * @example
     * // Get one DossierMedical
     * const dossierMedical = await prisma.dossierMedical.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DossierMedicalFindFirstArgs>(args?: SelectSubset<T, DossierMedicalFindFirstArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DossierMedical that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalFindFirstOrThrowArgs} args - Arguments to find a DossierMedical
     * @example
     * // Get one DossierMedical
     * const dossierMedical = await prisma.dossierMedical.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DossierMedicalFindFirstOrThrowArgs>(args?: SelectSubset<T, DossierMedicalFindFirstOrThrowArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DossierMedicals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DossierMedicals
     * const dossierMedicals = await prisma.dossierMedical.findMany()
     * 
     * // Get first 10 DossierMedicals
     * const dossierMedicals = await prisma.dossierMedical.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dossierMedicalWithIdOnly = await prisma.dossierMedical.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DossierMedicalFindManyArgs>(args?: SelectSubset<T, DossierMedicalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DossierMedical.
     * @param {DossierMedicalCreateArgs} args - Arguments to create a DossierMedical.
     * @example
     * // Create one DossierMedical
     * const DossierMedical = await prisma.dossierMedical.create({
     *   data: {
     *     // ... data to create a DossierMedical
     *   }
     * })
     * 
     */
    create<T extends DossierMedicalCreateArgs>(args: SelectSubset<T, DossierMedicalCreateArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DossierMedicals.
     * @param {DossierMedicalCreateManyArgs} args - Arguments to create many DossierMedicals.
     * @example
     * // Create many DossierMedicals
     * const dossierMedical = await prisma.dossierMedical.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DossierMedicalCreateManyArgs>(args?: SelectSubset<T, DossierMedicalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DossierMedicals and returns the data saved in the database.
     * @param {DossierMedicalCreateManyAndReturnArgs} args - Arguments to create many DossierMedicals.
     * @example
     * // Create many DossierMedicals
     * const dossierMedical = await prisma.dossierMedical.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DossierMedicals and only return the `id`
     * const dossierMedicalWithIdOnly = await prisma.dossierMedical.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DossierMedicalCreateManyAndReturnArgs>(args?: SelectSubset<T, DossierMedicalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DossierMedical.
     * @param {DossierMedicalDeleteArgs} args - Arguments to delete one DossierMedical.
     * @example
     * // Delete one DossierMedical
     * const DossierMedical = await prisma.dossierMedical.delete({
     *   where: {
     *     // ... filter to delete one DossierMedical
     *   }
     * })
     * 
     */
    delete<T extends DossierMedicalDeleteArgs>(args: SelectSubset<T, DossierMedicalDeleteArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DossierMedical.
     * @param {DossierMedicalUpdateArgs} args - Arguments to update one DossierMedical.
     * @example
     * // Update one DossierMedical
     * const dossierMedical = await prisma.dossierMedical.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DossierMedicalUpdateArgs>(args: SelectSubset<T, DossierMedicalUpdateArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DossierMedicals.
     * @param {DossierMedicalDeleteManyArgs} args - Arguments to filter DossierMedicals to delete.
     * @example
     * // Delete a few DossierMedicals
     * const { count } = await prisma.dossierMedical.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DossierMedicalDeleteManyArgs>(args?: SelectSubset<T, DossierMedicalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DossierMedicals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DossierMedicals
     * const dossierMedical = await prisma.dossierMedical.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DossierMedicalUpdateManyArgs>(args: SelectSubset<T, DossierMedicalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DossierMedicals and returns the data updated in the database.
     * @param {DossierMedicalUpdateManyAndReturnArgs} args - Arguments to update many DossierMedicals.
     * @example
     * // Update many DossierMedicals
     * const dossierMedical = await prisma.dossierMedical.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DossierMedicals and only return the `id`
     * const dossierMedicalWithIdOnly = await prisma.dossierMedical.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DossierMedicalUpdateManyAndReturnArgs>(args: SelectSubset<T, DossierMedicalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DossierMedical.
     * @param {DossierMedicalUpsertArgs} args - Arguments to update or create a DossierMedical.
     * @example
     * // Update or create a DossierMedical
     * const dossierMedical = await prisma.dossierMedical.upsert({
     *   create: {
     *     // ... data to create a DossierMedical
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DossierMedical we want to update
     *   }
     * })
     */
    upsert<T extends DossierMedicalUpsertArgs>(args: SelectSubset<T, DossierMedicalUpsertArgs<ExtArgs>>): Prisma__DossierMedicalClient<$Result.GetResult<Prisma.$DossierMedicalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DossierMedicals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalCountArgs} args - Arguments to filter DossierMedicals to count.
     * @example
     * // Count the number of DossierMedicals
     * const count = await prisma.dossierMedical.count({
     *   where: {
     *     // ... the filter for the DossierMedicals we want to count
     *   }
     * })
    **/
    count<T extends DossierMedicalCountArgs>(
      args?: Subset<T, DossierMedicalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DossierMedicalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DossierMedical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DossierMedicalAggregateArgs>(args: Subset<T, DossierMedicalAggregateArgs>): Prisma.PrismaPromise<GetDossierMedicalAggregateType<T>>

    /**
     * Group by DossierMedical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DossierMedicalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DossierMedicalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DossierMedicalGroupByArgs['orderBy'] }
        : { orderBy?: DossierMedicalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DossierMedicalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDossierMedicalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DossierMedical model
   */
  readonly fields: DossierMedicalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DossierMedical.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DossierMedicalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DossierMedical model
   */
  interface DossierMedicalFieldRefs {
    readonly id: FieldRef<"DossierMedical", 'Int'>
    readonly patient_id: FieldRef<"DossierMedical", 'Int'>
    readonly diagnostic: FieldRef<"DossierMedical", 'String'>
    readonly traitement: FieldRef<"DossierMedical", 'String'>
    readonly note_medecin: FieldRef<"DossierMedical", 'String'>
    readonly date_maj: FieldRef<"DossierMedical", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DossierMedical findUnique
   */
  export type DossierMedicalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter, which DossierMedical to fetch.
     */
    where: DossierMedicalWhereUniqueInput
  }

  /**
   * DossierMedical findUniqueOrThrow
   */
  export type DossierMedicalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter, which DossierMedical to fetch.
     */
    where: DossierMedicalWhereUniqueInput
  }

  /**
   * DossierMedical findFirst
   */
  export type DossierMedicalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter, which DossierMedical to fetch.
     */
    where?: DossierMedicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DossierMedicals to fetch.
     */
    orderBy?: DossierMedicalOrderByWithRelationInput | DossierMedicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DossierMedicals.
     */
    cursor?: DossierMedicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DossierMedicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DossierMedicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DossierMedicals.
     */
    distinct?: DossierMedicalScalarFieldEnum | DossierMedicalScalarFieldEnum[]
  }

  /**
   * DossierMedical findFirstOrThrow
   */
  export type DossierMedicalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter, which DossierMedical to fetch.
     */
    where?: DossierMedicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DossierMedicals to fetch.
     */
    orderBy?: DossierMedicalOrderByWithRelationInput | DossierMedicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DossierMedicals.
     */
    cursor?: DossierMedicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DossierMedicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DossierMedicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DossierMedicals.
     */
    distinct?: DossierMedicalScalarFieldEnum | DossierMedicalScalarFieldEnum[]
  }

  /**
   * DossierMedical findMany
   */
  export type DossierMedicalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter, which DossierMedicals to fetch.
     */
    where?: DossierMedicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DossierMedicals to fetch.
     */
    orderBy?: DossierMedicalOrderByWithRelationInput | DossierMedicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DossierMedicals.
     */
    cursor?: DossierMedicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DossierMedicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DossierMedicals.
     */
    skip?: number
    distinct?: DossierMedicalScalarFieldEnum | DossierMedicalScalarFieldEnum[]
  }

  /**
   * DossierMedical create
   */
  export type DossierMedicalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * The data needed to create a DossierMedical.
     */
    data: XOR<DossierMedicalCreateInput, DossierMedicalUncheckedCreateInput>
  }

  /**
   * DossierMedical createMany
   */
  export type DossierMedicalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DossierMedicals.
     */
    data: DossierMedicalCreateManyInput | DossierMedicalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DossierMedical createManyAndReturn
   */
  export type DossierMedicalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * The data used to create many DossierMedicals.
     */
    data: DossierMedicalCreateManyInput | DossierMedicalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DossierMedical update
   */
  export type DossierMedicalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * The data needed to update a DossierMedical.
     */
    data: XOR<DossierMedicalUpdateInput, DossierMedicalUncheckedUpdateInput>
    /**
     * Choose, which DossierMedical to update.
     */
    where: DossierMedicalWhereUniqueInput
  }

  /**
   * DossierMedical updateMany
   */
  export type DossierMedicalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DossierMedicals.
     */
    data: XOR<DossierMedicalUpdateManyMutationInput, DossierMedicalUncheckedUpdateManyInput>
    /**
     * Filter which DossierMedicals to update
     */
    where?: DossierMedicalWhereInput
    /**
     * Limit how many DossierMedicals to update.
     */
    limit?: number
  }

  /**
   * DossierMedical updateManyAndReturn
   */
  export type DossierMedicalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * The data used to update DossierMedicals.
     */
    data: XOR<DossierMedicalUpdateManyMutationInput, DossierMedicalUncheckedUpdateManyInput>
    /**
     * Filter which DossierMedicals to update
     */
    where?: DossierMedicalWhereInput
    /**
     * Limit how many DossierMedicals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DossierMedical upsert
   */
  export type DossierMedicalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * The filter to search for the DossierMedical to update in case it exists.
     */
    where: DossierMedicalWhereUniqueInput
    /**
     * In case the DossierMedical found by the `where` argument doesn't exist, create a new DossierMedical with this data.
     */
    create: XOR<DossierMedicalCreateInput, DossierMedicalUncheckedCreateInput>
    /**
     * In case the DossierMedical was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DossierMedicalUpdateInput, DossierMedicalUncheckedUpdateInput>
  }

  /**
   * DossierMedical delete
   */
  export type DossierMedicalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
    /**
     * Filter which DossierMedical to delete.
     */
    where: DossierMedicalWhereUniqueInput
  }

  /**
   * DossierMedical deleteMany
   */
  export type DossierMedicalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DossierMedicals to delete
     */
    where?: DossierMedicalWhereInput
    /**
     * Limit how many DossierMedicals to delete.
     */
    limit?: number
  }

  /**
   * DossierMedical without action
   */
  export type DossierMedicalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DossierMedical
     */
    select?: DossierMedicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DossierMedical
     */
    omit?: DossierMedicalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DossierMedicalInclude<ExtArgs> | null
  }


  /**
   * Model RendezVous
   */

  export type AggregateRendezVous = {
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  export type RendezVousAvgAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
  }

  export type RendezVousSumAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
  }

  export type RendezVousMinAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    type_rdv: $Enums.TypeRDV | null
    date_rdv: Date | null
  }

  export type RendezVousMaxAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    type_rdv: $Enums.TypeRDV | null
    date_rdv: Date | null
  }

  export type RendezVousCountAggregateOutputType = {
    id: number
    patient_id: number
    medecin_id: number
    type_rdv: number
    date_rdv: number
    _all: number
  }


  export type RendezVousAvgAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
  }

  export type RendezVousSumAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
  }

  export type RendezVousMinAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    type_rdv?: true
    date_rdv?: true
  }

  export type RendezVousMaxAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    type_rdv?: true
    date_rdv?: true
  }

  export type RendezVousCountAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    type_rdv?: true
    date_rdv?: true
    _all?: true
  }

  export type RendezVousAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to aggregate.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RendezVous
    **/
    _count?: true | RendezVousCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RendezVousAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RendezVousSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RendezVousMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RendezVousMaxAggregateInputType
  }

  export type GetRendezVousAggregateType<T extends RendezVousAggregateArgs> = {
        [P in keyof T & keyof AggregateRendezVous]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRendezVous[P]>
      : GetScalarType<T[P], AggregateRendezVous[P]>
  }




  export type RendezVousGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithAggregationInput | RendezVousOrderByWithAggregationInput[]
    by: RendezVousScalarFieldEnum[] | RendezVousScalarFieldEnum
    having?: RendezVousScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RendezVousCountAggregateInputType | true
    _avg?: RendezVousAvgAggregateInputType
    _sum?: RendezVousSumAggregateInputType
    _min?: RendezVousMinAggregateInputType
    _max?: RendezVousMaxAggregateInputType
  }

  export type RendezVousGroupByOutputType = {
    id: number
    patient_id: number
    medecin_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  type GetRendezVousGroupByPayload<T extends RendezVousGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RendezVousGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RendezVousGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
            : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
        }
      >
    >


  export type RendezVousSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    type_rdv?: boolean
    date_rdv?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    type_rdv?: boolean
    date_rdv?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    type_rdv?: boolean
    date_rdv?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectScalar = {
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    type_rdv?: boolean
    date_rdv?: boolean
  }

  export type RendezVousOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patient_id" | "medecin_id" | "type_rdv" | "date_rdv", ExtArgs["result"]["rendezVous"]>
  export type RendezVousInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RendezVousPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RendezVous"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      medecin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patient_id: number
      medecin_id: number
      type_rdv: $Enums.TypeRDV
      date_rdv: Date
    }, ExtArgs["result"]["rendezVous"]>
    composites: {}
  }

  type RendezVousGetPayload<S extends boolean | null | undefined | RendezVousDefaultArgs> = $Result.GetResult<Prisma.$RendezVousPayload, S>

  type RendezVousCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RendezVousFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RendezVousCountAggregateInputType | true
    }

  export interface RendezVousDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RendezVous'], meta: { name: 'RendezVous' } }
    /**
     * Find zero or one RendezVous that matches the filter.
     * @param {RendezVousFindUniqueArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RendezVousFindUniqueArgs>(args: SelectSubset<T, RendezVousFindUniqueArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RendezVous that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RendezVousFindUniqueOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RendezVousFindUniqueOrThrowArgs>(args: SelectSubset<T, RendezVousFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RendezVousFindFirstArgs>(args?: SelectSubset<T, RendezVousFindFirstArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RendezVousFindFirstOrThrowArgs>(args?: SelectSubset<T, RendezVousFindFirstOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RendezVous
     * const rendezVous = await prisma.rendezVous.findMany()
     * 
     * // Get first 10 RendezVous
     * const rendezVous = await prisma.rendezVous.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RendezVousFindManyArgs>(args?: SelectSubset<T, RendezVousFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RendezVous.
     * @param {RendezVousCreateArgs} args - Arguments to create a RendezVous.
     * @example
     * // Create one RendezVous
     * const RendezVous = await prisma.rendezVous.create({
     *   data: {
     *     // ... data to create a RendezVous
     *   }
     * })
     * 
     */
    create<T extends RendezVousCreateArgs>(args: SelectSubset<T, RendezVousCreateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RendezVous.
     * @param {RendezVousCreateManyArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RendezVousCreateManyArgs>(args?: SelectSubset<T, RendezVousCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RendezVous and returns the data saved in the database.
     * @param {RendezVousCreateManyAndReturnArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RendezVousCreateManyAndReturnArgs>(args?: SelectSubset<T, RendezVousCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RendezVous.
     * @param {RendezVousDeleteArgs} args - Arguments to delete one RendezVous.
     * @example
     * // Delete one RendezVous
     * const RendezVous = await prisma.rendezVous.delete({
     *   where: {
     *     // ... filter to delete one RendezVous
     *   }
     * })
     * 
     */
    delete<T extends RendezVousDeleteArgs>(args: SelectSubset<T, RendezVousDeleteArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RendezVous.
     * @param {RendezVousUpdateArgs} args - Arguments to update one RendezVous.
     * @example
     * // Update one RendezVous
     * const rendezVous = await prisma.rendezVous.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RendezVousUpdateArgs>(args: SelectSubset<T, RendezVousUpdateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RendezVous.
     * @param {RendezVousDeleteManyArgs} args - Arguments to filter RendezVous to delete.
     * @example
     * // Delete a few RendezVous
     * const { count } = await prisma.rendezVous.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RendezVousDeleteManyArgs>(args?: SelectSubset<T, RendezVousDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RendezVousUpdateManyArgs>(args: SelectSubset<T, RendezVousUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous and returns the data updated in the database.
     * @param {RendezVousUpdateManyAndReturnArgs} args - Arguments to update many RendezVous.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RendezVousUpdateManyAndReturnArgs>(args: SelectSubset<T, RendezVousUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RendezVous.
     * @param {RendezVousUpsertArgs} args - Arguments to update or create a RendezVous.
     * @example
     * // Update or create a RendezVous
     * const rendezVous = await prisma.rendezVous.upsert({
     *   create: {
     *     // ... data to create a RendezVous
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RendezVous we want to update
     *   }
     * })
     */
    upsert<T extends RendezVousUpsertArgs>(args: SelectSubset<T, RendezVousUpsertArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousCountArgs} args - Arguments to filter RendezVous to count.
     * @example
     * // Count the number of RendezVous
     * const count = await prisma.rendezVous.count({
     *   where: {
     *     // ... the filter for the RendezVous we want to count
     *   }
     * })
    **/
    count<T extends RendezVousCountArgs>(
      args?: Subset<T, RendezVousCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RendezVousCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RendezVousAggregateArgs>(args: Subset<T, RendezVousAggregateArgs>): Prisma.PrismaPromise<GetRendezVousAggregateType<T>>

    /**
     * Group by RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RendezVousGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RendezVousGroupByArgs['orderBy'] }
        : { orderBy?: RendezVousGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RendezVousGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRendezVousGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RendezVous model
   */
  readonly fields: RendezVousFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RendezVous.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RendezVousClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medecin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RendezVous model
   */
  interface RendezVousFieldRefs {
    readonly id: FieldRef<"RendezVous", 'Int'>
    readonly patient_id: FieldRef<"RendezVous", 'Int'>
    readonly medecin_id: FieldRef<"RendezVous", 'Int'>
    readonly type_rdv: FieldRef<"RendezVous", 'TypeRDV'>
    readonly date_rdv: FieldRef<"RendezVous", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RendezVous findUnique
   */
  export type RendezVousFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findUniqueOrThrow
   */
  export type RendezVousFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findFirst
   */
  export type RendezVousFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findFirstOrThrow
   */
  export type RendezVousFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findMany
   */
  export type RendezVousFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous create
   */
  export type RendezVousCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to create a RendezVous.
     */
    data: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
  }

  /**
   * RendezVous createMany
   */
  export type RendezVousCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RendezVous createManyAndReturn
   */
  export type RendezVousCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous update
   */
  export type RendezVousUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to update a RendezVous.
     */
    data: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
    /**
     * Choose, which RendezVous to update.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous updateMany
   */
  export type RendezVousUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
  }

  /**
   * RendezVous updateManyAndReturn
   */
  export type RendezVousUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous upsert
   */
  export type RendezVousUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The filter to search for the RendezVous to update in case it exists.
     */
    where: RendezVousWhereUniqueInput
    /**
     * In case the RendezVous found by the `where` argument doesn't exist, create a new RendezVous with this data.
     */
    create: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
    /**
     * In case the RendezVous was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
  }

  /**
   * RendezVous delete
   */
  export type RendezVousDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter which RendezVous to delete.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous deleteMany
   */
  export type RendezVousDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to delete
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to delete.
     */
    limit?: number
  }

  /**
   * RendezVous without action
   */
  export type RendezVousDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
  }


  /**
   * Model FileAttente
   */

  export type AggregateFileAttente = {
    _count: FileAttenteCountAggregateOutputType | null
    _avg: FileAttenteAvgAggregateOutputType | null
    _sum: FileAttenteSumAggregateOutputType | null
    _min: FileAttenteMinAggregateOutputType | null
    _max: FileAttenteMaxAggregateOutputType | null
  }

  export type FileAttenteAvgAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    ordre: number | null
  }

  export type FileAttenteSumAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    ordre: number | null
  }

  export type FileAttenteMinAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    statut: $Enums.StatutFileAttente | null
    ordre: number | null
    ajoute_le: Date | null
  }

  export type FileAttenteMaxAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    statut: $Enums.StatutFileAttente | null
    ordre: number | null
    ajoute_le: Date | null
  }

  export type FileAttenteCountAggregateOutputType = {
    id: number
    patient_id: number
    medecin_id: number
    statut: number
    ordre: number
    ajoute_le: number
    _all: number
  }


  export type FileAttenteAvgAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    ordre?: true
  }

  export type FileAttenteSumAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    ordre?: true
  }

  export type FileAttenteMinAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    statut?: true
    ordre?: true
    ajoute_le?: true
  }

  export type FileAttenteMaxAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    statut?: true
    ordre?: true
    ajoute_le?: true
  }

  export type FileAttenteCountAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    statut?: true
    ordre?: true
    ajoute_le?: true
    _all?: true
  }

  export type FileAttenteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileAttente to aggregate.
     */
    where?: FileAttenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttentes to fetch.
     */
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileAttenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileAttentes
    **/
    _count?: true | FileAttenteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAttenteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileAttenteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileAttenteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileAttenteMaxAggregateInputType
  }

  export type GetFileAttenteAggregateType<T extends FileAttenteAggregateArgs> = {
        [P in keyof T & keyof AggregateFileAttente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileAttente[P]>
      : GetScalarType<T[P], AggregateFileAttente[P]>
  }




  export type FileAttenteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileAttenteWhereInput
    orderBy?: FileAttenteOrderByWithAggregationInput | FileAttenteOrderByWithAggregationInput[]
    by: FileAttenteScalarFieldEnum[] | FileAttenteScalarFieldEnum
    having?: FileAttenteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileAttenteCountAggregateInputType | true
    _avg?: FileAttenteAvgAggregateInputType
    _sum?: FileAttenteSumAggregateInputType
    _min?: FileAttenteMinAggregateInputType
    _max?: FileAttenteMaxAggregateInputType
  }

  export type FileAttenteGroupByOutputType = {
    id: number
    patient_id: number
    medecin_id: number
    statut: $Enums.StatutFileAttente
    ordre: number
    ajoute_le: Date
    _count: FileAttenteCountAggregateOutputType | null
    _avg: FileAttenteAvgAggregateOutputType | null
    _sum: FileAttenteSumAggregateOutputType | null
    _min: FileAttenteMinAggregateOutputType | null
    _max: FileAttenteMaxAggregateOutputType | null
  }

  type GetFileAttenteGroupByPayload<T extends FileAttenteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileAttenteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileAttenteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileAttenteGroupByOutputType[P]>
            : GetScalarType<T[P], FileAttenteGroupByOutputType[P]>
        }
      >
    >


  export type FileAttenteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    statut?: boolean
    ordre?: boolean
    ajoute_le?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttente"]>

  export type FileAttenteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    statut?: boolean
    ordre?: boolean
    ajoute_le?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttente"]>

  export type FileAttenteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    statut?: boolean
    ordre?: boolean
    ajoute_le?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttente"]>

  export type FileAttenteSelectScalar = {
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    statut?: boolean
    ordre?: boolean
    ajoute_le?: boolean
  }

  export type FileAttenteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patient_id" | "medecin_id" | "statut" | "ordre" | "ajoute_le", ExtArgs["result"]["fileAttente"]>
  export type FileAttenteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileAttenteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileAttenteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FileAttentePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileAttente"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      medecin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patient_id: number
      medecin_id: number
      statut: $Enums.StatutFileAttente
      ordre: number
      ajoute_le: Date
    }, ExtArgs["result"]["fileAttente"]>
    composites: {}
  }

  type FileAttenteGetPayload<S extends boolean | null | undefined | FileAttenteDefaultArgs> = $Result.GetResult<Prisma.$FileAttentePayload, S>

  type FileAttenteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileAttenteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileAttenteCountAggregateInputType | true
    }

  export interface FileAttenteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileAttente'], meta: { name: 'FileAttente' } }
    /**
     * Find zero or one FileAttente that matches the filter.
     * @param {FileAttenteFindUniqueArgs} args - Arguments to find a FileAttente
     * @example
     * // Get one FileAttente
     * const fileAttente = await prisma.fileAttente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileAttenteFindUniqueArgs>(args: SelectSubset<T, FileAttenteFindUniqueArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FileAttente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileAttenteFindUniqueOrThrowArgs} args - Arguments to find a FileAttente
     * @example
     * // Get one FileAttente
     * const fileAttente = await prisma.fileAttente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileAttenteFindUniqueOrThrowArgs>(args: SelectSubset<T, FileAttenteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileAttente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteFindFirstArgs} args - Arguments to find a FileAttente
     * @example
     * // Get one FileAttente
     * const fileAttente = await prisma.fileAttente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileAttenteFindFirstArgs>(args?: SelectSubset<T, FileAttenteFindFirstArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileAttente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteFindFirstOrThrowArgs} args - Arguments to find a FileAttente
     * @example
     * // Get one FileAttente
     * const fileAttente = await prisma.fileAttente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileAttenteFindFirstOrThrowArgs>(args?: SelectSubset<T, FileAttenteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FileAttentes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileAttentes
     * const fileAttentes = await prisma.fileAttente.findMany()
     * 
     * // Get first 10 FileAttentes
     * const fileAttentes = await prisma.fileAttente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileAttenteWithIdOnly = await prisma.fileAttente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileAttenteFindManyArgs>(args?: SelectSubset<T, FileAttenteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FileAttente.
     * @param {FileAttenteCreateArgs} args - Arguments to create a FileAttente.
     * @example
     * // Create one FileAttente
     * const FileAttente = await prisma.fileAttente.create({
     *   data: {
     *     // ... data to create a FileAttente
     *   }
     * })
     * 
     */
    create<T extends FileAttenteCreateArgs>(args: SelectSubset<T, FileAttenteCreateArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FileAttentes.
     * @param {FileAttenteCreateManyArgs} args - Arguments to create many FileAttentes.
     * @example
     * // Create many FileAttentes
     * const fileAttente = await prisma.fileAttente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileAttenteCreateManyArgs>(args?: SelectSubset<T, FileAttenteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileAttentes and returns the data saved in the database.
     * @param {FileAttenteCreateManyAndReturnArgs} args - Arguments to create many FileAttentes.
     * @example
     * // Create many FileAttentes
     * const fileAttente = await prisma.fileAttente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileAttentes and only return the `id`
     * const fileAttenteWithIdOnly = await prisma.fileAttente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileAttenteCreateManyAndReturnArgs>(args?: SelectSubset<T, FileAttenteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FileAttente.
     * @param {FileAttenteDeleteArgs} args - Arguments to delete one FileAttente.
     * @example
     * // Delete one FileAttente
     * const FileAttente = await prisma.fileAttente.delete({
     *   where: {
     *     // ... filter to delete one FileAttente
     *   }
     * })
     * 
     */
    delete<T extends FileAttenteDeleteArgs>(args: SelectSubset<T, FileAttenteDeleteArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FileAttente.
     * @param {FileAttenteUpdateArgs} args - Arguments to update one FileAttente.
     * @example
     * // Update one FileAttente
     * const fileAttente = await prisma.fileAttente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileAttenteUpdateArgs>(args: SelectSubset<T, FileAttenteUpdateArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FileAttentes.
     * @param {FileAttenteDeleteManyArgs} args - Arguments to filter FileAttentes to delete.
     * @example
     * // Delete a few FileAttentes
     * const { count } = await prisma.fileAttente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileAttenteDeleteManyArgs>(args?: SelectSubset<T, FileAttenteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileAttentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileAttentes
     * const fileAttente = await prisma.fileAttente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileAttenteUpdateManyArgs>(args: SelectSubset<T, FileAttenteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileAttentes and returns the data updated in the database.
     * @param {FileAttenteUpdateManyAndReturnArgs} args - Arguments to update many FileAttentes.
     * @example
     * // Update many FileAttentes
     * const fileAttente = await prisma.fileAttente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FileAttentes and only return the `id`
     * const fileAttenteWithIdOnly = await prisma.fileAttente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FileAttenteUpdateManyAndReturnArgs>(args: SelectSubset<T, FileAttenteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FileAttente.
     * @param {FileAttenteUpsertArgs} args - Arguments to update or create a FileAttente.
     * @example
     * // Update or create a FileAttente
     * const fileAttente = await prisma.fileAttente.upsert({
     *   create: {
     *     // ... data to create a FileAttente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileAttente we want to update
     *   }
     * })
     */
    upsert<T extends FileAttenteUpsertArgs>(args: SelectSubset<T, FileAttenteUpsertArgs<ExtArgs>>): Prisma__FileAttenteClient<$Result.GetResult<Prisma.$FileAttentePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FileAttentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteCountArgs} args - Arguments to filter FileAttentes to count.
     * @example
     * // Count the number of FileAttentes
     * const count = await prisma.fileAttente.count({
     *   where: {
     *     // ... the filter for the FileAttentes we want to count
     *   }
     * })
    **/
    count<T extends FileAttenteCountArgs>(
      args?: Subset<T, FileAttenteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileAttenteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileAttente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAttenteAggregateArgs>(args: Subset<T, FileAttenteAggregateArgs>): Prisma.PrismaPromise<GetFileAttenteAggregateType<T>>

    /**
     * Group by FileAttente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttenteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileAttenteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileAttenteGroupByArgs['orderBy'] }
        : { orderBy?: FileAttenteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileAttenteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileAttenteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileAttente model
   */
  readonly fields: FileAttenteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileAttente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileAttenteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medecin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FileAttente model
   */
  interface FileAttenteFieldRefs {
    readonly id: FieldRef<"FileAttente", 'Int'>
    readonly patient_id: FieldRef<"FileAttente", 'Int'>
    readonly medecin_id: FieldRef<"FileAttente", 'Int'>
    readonly statut: FieldRef<"FileAttente", 'StatutFileAttente'>
    readonly ordre: FieldRef<"FileAttente", 'Int'>
    readonly ajoute_le: FieldRef<"FileAttente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FileAttente findUnique
   */
  export type FileAttenteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter, which FileAttente to fetch.
     */
    where: FileAttenteWhereUniqueInput
  }

  /**
   * FileAttente findUniqueOrThrow
   */
  export type FileAttenteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter, which FileAttente to fetch.
     */
    where: FileAttenteWhereUniqueInput
  }

  /**
   * FileAttente findFirst
   */
  export type FileAttenteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter, which FileAttente to fetch.
     */
    where?: FileAttenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttentes to fetch.
     */
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileAttentes.
     */
    cursor?: FileAttenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileAttentes.
     */
    distinct?: FileAttenteScalarFieldEnum | FileAttenteScalarFieldEnum[]
  }

  /**
   * FileAttente findFirstOrThrow
   */
  export type FileAttenteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter, which FileAttente to fetch.
     */
    where?: FileAttenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttentes to fetch.
     */
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileAttentes.
     */
    cursor?: FileAttenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileAttentes.
     */
    distinct?: FileAttenteScalarFieldEnum | FileAttenteScalarFieldEnum[]
  }

  /**
   * FileAttente findMany
   */
  export type FileAttenteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter, which FileAttentes to fetch.
     */
    where?: FileAttenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttentes to fetch.
     */
    orderBy?: FileAttenteOrderByWithRelationInput | FileAttenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileAttentes.
     */
    cursor?: FileAttenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttentes.
     */
    skip?: number
    distinct?: FileAttenteScalarFieldEnum | FileAttenteScalarFieldEnum[]
  }

  /**
   * FileAttente create
   */
  export type FileAttenteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * The data needed to create a FileAttente.
     */
    data: XOR<FileAttenteCreateInput, FileAttenteUncheckedCreateInput>
  }

  /**
   * FileAttente createMany
   */
  export type FileAttenteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileAttentes.
     */
    data: FileAttenteCreateManyInput | FileAttenteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FileAttente createManyAndReturn
   */
  export type FileAttenteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * The data used to create many FileAttentes.
     */
    data: FileAttenteCreateManyInput | FileAttenteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileAttente update
   */
  export type FileAttenteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * The data needed to update a FileAttente.
     */
    data: XOR<FileAttenteUpdateInput, FileAttenteUncheckedUpdateInput>
    /**
     * Choose, which FileAttente to update.
     */
    where: FileAttenteWhereUniqueInput
  }

  /**
   * FileAttente updateMany
   */
  export type FileAttenteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileAttentes.
     */
    data: XOR<FileAttenteUpdateManyMutationInput, FileAttenteUncheckedUpdateManyInput>
    /**
     * Filter which FileAttentes to update
     */
    where?: FileAttenteWhereInput
    /**
     * Limit how many FileAttentes to update.
     */
    limit?: number
  }

  /**
   * FileAttente updateManyAndReturn
   */
  export type FileAttenteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * The data used to update FileAttentes.
     */
    data: XOR<FileAttenteUpdateManyMutationInput, FileAttenteUncheckedUpdateManyInput>
    /**
     * Filter which FileAttentes to update
     */
    where?: FileAttenteWhereInput
    /**
     * Limit how many FileAttentes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileAttente upsert
   */
  export type FileAttenteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * The filter to search for the FileAttente to update in case it exists.
     */
    where: FileAttenteWhereUniqueInput
    /**
     * In case the FileAttente found by the `where` argument doesn't exist, create a new FileAttente with this data.
     */
    create: XOR<FileAttenteCreateInput, FileAttenteUncheckedCreateInput>
    /**
     * In case the FileAttente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileAttenteUpdateInput, FileAttenteUncheckedUpdateInput>
  }

  /**
   * FileAttente delete
   */
  export type FileAttenteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
    /**
     * Filter which FileAttente to delete.
     */
    where: FileAttenteWhereUniqueInput
  }

  /**
   * FileAttente deleteMany
   */
  export type FileAttenteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileAttentes to delete
     */
    where?: FileAttenteWhereInput
    /**
     * Limit how many FileAttentes to delete.
     */
    limit?: number
  }

  /**
   * FileAttente without action
   */
  export type FileAttenteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttente
     */
    select?: FileAttenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttente
     */
    omit?: FileAttenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttenteInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationAvgAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
  }

  export type ConsultationSumAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
  }

  export type ConsultationMinAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    note: string | null
    date_consultation: Date | null
  }

  export type ConsultationMaxAggregateOutputType = {
    id: number | null
    patient_id: number | null
    medecin_id: number | null
    note: string | null
    date_consultation: Date | null
  }

  export type ConsultationCountAggregateOutputType = {
    id: number
    patient_id: number
    medecin_id: number
    note: number
    date_consultation: number
    _all: number
  }


  export type ConsultationAvgAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
  }

  export type ConsultationSumAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
  }

  export type ConsultationMinAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    note?: true
    date_consultation?: true
  }

  export type ConsultationMaxAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    note?: true
    date_consultation?: true
  }

  export type ConsultationCountAggregateInputType = {
    id?: true
    patient_id?: true
    medecin_id?: true
    note?: true
    date_consultation?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _avg?: ConsultationAvgAggregateInputType
    _sum?: ConsultationSumAggregateInputType
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    id: number
    patient_id: number
    medecin_id: number | null
    note: string | null
    date_consultation: Date
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    note?: boolean
    date_consultation?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    note?: boolean
    date_consultation?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    note?: boolean
    date_consultation?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectScalar = {
    id?: boolean
    patient_id?: boolean
    medecin_id?: boolean
    note?: boolean
    date_consultation?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patient_id" | "medecin_id" | "note" | "date_consultation", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }
  export type ConsultationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }
  export type ConsultationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    medecin?: boolean | Consultation$medecinArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      medecin: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patient_id: number
      medecin_id: number | null
      note: string | null
      date_consultation: Date
    }, ExtArgs["result"]["consultation"]>
    composites: {}
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationWithIdOnly = await prisma.consultation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultations and returns the data saved in the database.
     * @param {ConsultationCreateManyAndReturnArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations and returns the data updated in the database.
     * @param {ConsultationUpdateManyAndReturnArgs} args - Arguments to update many Consultations.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsultationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medecin<T extends Consultation$medecinArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$medecinArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly id: FieldRef<"Consultation", 'Int'>
    readonly patient_id: FieldRef<"Consultation", 'Int'>
    readonly medecin_id: FieldRef<"Consultation", 'Int'>
    readonly note: FieldRef<"Consultation", 'String'>
    readonly date_consultation: FieldRef<"Consultation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consultation createManyAndReturn
   */
  export type ConsultationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation updateManyAndReturn
   */
  export type ConsultationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation.medecin
   */
  export type Consultation$medecinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    expediteur_id: number | null
    destinataire_id: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    expediteur_id: number | null
    destinataire_id: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    expediteur_id: number | null
    destinataire_id: number | null
    message: string | null
    vu: boolean | null
    envoye_le: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    expediteur_id: number | null
    destinataire_id: number | null
    message: string | null
    vu: boolean | null
    envoye_le: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    expediteur_id: number
    destinataire_id: number
    message: number
    vu: number
    envoye_le: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    expediteur_id?: true
    destinataire_id?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    expediteur_id?: true
    destinataire_id?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    expediteur_id?: true
    destinataire_id?: true
    message?: true
    vu?: true
    envoye_le?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    expediteur_id?: true
    destinataire_id?: true
    message?: true
    vu?: true
    envoye_le?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    expediteur_id?: true
    destinataire_id?: true
    message?: true
    vu?: true
    envoye_le?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    expediteur_id: number
    destinataire_id: number
    message: string
    vu: boolean
    envoye_le: Date
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteur_id?: boolean
    destinataire_id?: boolean
    message?: boolean
    vu?: boolean
    envoye_le?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteur_id?: boolean
    destinataire_id?: boolean
    message?: boolean
    vu?: boolean
    envoye_le?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteur_id?: boolean
    destinataire_id?: boolean
    message?: boolean
    vu?: boolean
    envoye_le?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    expediteur_id?: boolean
    destinataire_id?: boolean
    message?: boolean
    vu?: boolean
    envoye_le?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expediteur_id" | "destinataire_id" | "message" | "vu" | "envoye_le", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataire?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      expediteur: Prisma.$UserPayload<ExtArgs>
      destinataire: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      expediteur_id: number
      destinataire_id: number
      message: string
      vu: boolean
      envoye_le: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expediteur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    destinataire<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly expediteur_id: FieldRef<"Message", 'Int'>
    readonly destinataire_id: FieldRef<"Message", 'Int'>
    readonly message: FieldRef<"Message", 'String'>
    readonly vu: FieldRef<"Message", 'Boolean'>
    readonly envoye_le: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
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

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const DossierMedicalScalarFieldEnum: {
    id: 'id',
    patient_id: 'patient_id',
    diagnostic: 'diagnostic',
    traitement: 'traitement',
    note_medecin: 'note_medecin',
    date_maj: 'date_maj'
  };

  export type DossierMedicalScalarFieldEnum = (typeof DossierMedicalScalarFieldEnum)[keyof typeof DossierMedicalScalarFieldEnum]


  export const RendezVousScalarFieldEnum: {
    id: 'id',
    patient_id: 'patient_id',
    medecin_id: 'medecin_id',
    type_rdv: 'type_rdv',
    date_rdv: 'date_rdv'
  };

  export type RendezVousScalarFieldEnum = (typeof RendezVousScalarFieldEnum)[keyof typeof RendezVousScalarFieldEnum]


  export const FileAttenteScalarFieldEnum: {
    id: 'id',
    patient_id: 'patient_id',
    medecin_id: 'medecin_id',
    statut: 'statut',
    ordre: 'ordre',
    ajoute_le: 'ajoute_le'
  };

  export type FileAttenteScalarFieldEnum = (typeof FileAttenteScalarFieldEnum)[keyof typeof FileAttenteScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    id: 'id',
    patient_id: 'patient_id',
    medecin_id: 'medecin_id',
    note: 'note',
    date_consultation: 'date_consultation'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    expediteur_id: 'expediteur_id',
    destinataire_id: 'destinataire_id',
    message: 'message',
    vu: 'vu',
    envoye_le: 'envoye_le'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Genre'
   */
  export type EnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre'>
    


  /**
   * Reference to a field of type 'Genre[]'
   */
  export type ListEnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TypeRDV'
   */
  export type EnumTypeRDVFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeRDV'>
    


  /**
   * Reference to a field of type 'TypeRDV[]'
   */
  export type ListEnumTypeRDVFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeRDV[]'>
    


  /**
   * Reference to a field of type 'StatutFileAttente'
   */
  export type EnumStatutFileAttenteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutFileAttente'>
    


  /**
   * Reference to a field of type 'StatutFileAttente[]'
   */
  export type ListEnumStatutFileAttenteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutFileAttente[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    mot_de_passe?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    specialite?: StringNullableFilter<"User"> | string | null
    telephone?: StringNullableFilter<"User"> | string | null
    photo?: StringNullableFilter<"User"> | string | null
    cree_le?: DateTimeFilter<"User"> | Date | string
    patientProfil?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    patients?: PatientListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    fileAttente?: FileAttenteListRelationFilter
    consultations?: ConsultationListRelationFilter
    messagesEnvoyes?: MessageListRelationFilter
    messagesRecus?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    mot_de_passe?: SortOrder
    role?: SortOrder
    specialite?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    cree_le?: SortOrder
    patientProfil?: PatientOrderByWithRelationInput
    patients?: PatientOrderByRelationAggregateInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
    fileAttente?: FileAttenteOrderByRelationAggregateInput
    consultations?: ConsultationOrderByRelationAggregateInput
    messagesEnvoyes?: MessageOrderByRelationAggregateInput
    messagesRecus?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    telephone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    mot_de_passe?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    specialite?: StringNullableFilter<"User"> | string | null
    photo?: StringNullableFilter<"User"> | string | null
    cree_le?: DateTimeFilter<"User"> | Date | string
    patientProfil?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    patients?: PatientListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    fileAttente?: FileAttenteListRelationFilter
    consultations?: ConsultationListRelationFilter
    messagesEnvoyes?: MessageListRelationFilter
    messagesRecus?: MessageListRelationFilter
  }, "id" | "email" | "telephone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    mot_de_passe?: SortOrder
    role?: SortOrder
    specialite?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    cree_le?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    mot_de_passe?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    specialite?: StringNullableWithAggregatesFilter<"User"> | string | null
    telephone?: StringNullableWithAggregatesFilter<"User"> | string | null
    photo?: StringNullableWithAggregatesFilter<"User"> | string | null
    cree_le?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: IntFilter<"Patient"> | number
    user_id?: IntNullableFilter<"Patient"> | number | null
    numero_patient?: StringFilter<"Patient"> | string
    nom?: StringFilter<"Patient"> | string
    prenom?: StringFilter<"Patient"> | string
    telephone?: StringNullableFilter<"Patient"> | string | null
    date_naissance?: DateTimeFilter<"Patient"> | Date | string
    genre?: EnumGenreFilter<"Patient"> | $Enums.Genre
    medecin_id?: IntNullableFilter<"Patient"> | number | null
    condition_medicale?: StringFilter<"Patient"> | string
    photo?: StringNullableFilter<"Patient"> | string | null
    consultation?: DateTimeNullableFilter<"Patient"> | Date | string | null
    consultation_specialisee?: DateTimeNullableFilter<"Patient"> | Date | string | null
    ct_sim?: DateTimeNullableFilter<"Patient"> | Date | string | null
    debut_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    fin_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    rdv_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    technique_irradiation?: StringNullableFilter<"Patient"> | string | null
    dose_totale?: FloatNullableFilter<"Patient"> | number | null
    dose_fraction?: FloatNullableFilter<"Patient"> | number | null
    cree_le?: DateTimeFilter<"Patient"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    medecin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dossier?: DossierMedicalListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    fileAttente?: FileAttenteListRelationFilter
    consultations?: ConsultationListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    numero_patient?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrderInput | SortOrder
    date_naissance?: SortOrder
    genre?: SortOrder
    medecin_id?: SortOrderInput | SortOrder
    condition_medicale?: SortOrder
    photo?: SortOrderInput | SortOrder
    consultation?: SortOrderInput | SortOrder
    consultation_specialisee?: SortOrderInput | SortOrder
    ct_sim?: SortOrderInput | SortOrder
    debut_traitement?: SortOrderInput | SortOrder
    fin_traitement?: SortOrderInput | SortOrder
    rdv_traitement?: SortOrderInput | SortOrder
    technique_irradiation?: SortOrderInput | SortOrder
    dose_totale?: SortOrderInput | SortOrder
    dose_fraction?: SortOrderInput | SortOrder
    cree_le?: SortOrder
    user?: UserOrderByWithRelationInput
    medecin?: UserOrderByWithRelationInput
    dossier?: DossierMedicalOrderByRelationAggregateInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
    fileAttente?: FileAttenteOrderByRelationAggregateInput
    consultations?: ConsultationOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id?: number
    numero_patient?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    nom?: StringFilter<"Patient"> | string
    prenom?: StringFilter<"Patient"> | string
    telephone?: StringNullableFilter<"Patient"> | string | null
    date_naissance?: DateTimeFilter<"Patient"> | Date | string
    genre?: EnumGenreFilter<"Patient"> | $Enums.Genre
    medecin_id?: IntNullableFilter<"Patient"> | number | null
    condition_medicale?: StringFilter<"Patient"> | string
    photo?: StringNullableFilter<"Patient"> | string | null
    consultation?: DateTimeNullableFilter<"Patient"> | Date | string | null
    consultation_specialisee?: DateTimeNullableFilter<"Patient"> | Date | string | null
    ct_sim?: DateTimeNullableFilter<"Patient"> | Date | string | null
    debut_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    fin_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    rdv_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    technique_irradiation?: StringNullableFilter<"Patient"> | string | null
    dose_totale?: FloatNullableFilter<"Patient"> | number | null
    dose_fraction?: FloatNullableFilter<"Patient"> | number | null
    cree_le?: DateTimeFilter<"Patient"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    medecin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dossier?: DossierMedicalListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    fileAttente?: FileAttenteListRelationFilter
    consultations?: ConsultationListRelationFilter
  }, "id" | "user_id" | "numero_patient">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    numero_patient?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrderInput | SortOrder
    date_naissance?: SortOrder
    genre?: SortOrder
    medecin_id?: SortOrderInput | SortOrder
    condition_medicale?: SortOrder
    photo?: SortOrderInput | SortOrder
    consultation?: SortOrderInput | SortOrder
    consultation_specialisee?: SortOrderInput | SortOrder
    ct_sim?: SortOrderInput | SortOrder
    debut_traitement?: SortOrderInput | SortOrder
    fin_traitement?: SortOrderInput | SortOrder
    rdv_traitement?: SortOrderInput | SortOrder
    technique_irradiation?: SortOrderInput | SortOrder
    dose_totale?: SortOrderInput | SortOrder
    dose_fraction?: SortOrderInput | SortOrder
    cree_le?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Patient"> | number
    user_id?: IntNullableWithAggregatesFilter<"Patient"> | number | null
    numero_patient?: StringWithAggregatesFilter<"Patient"> | string
    nom?: StringWithAggregatesFilter<"Patient"> | string
    prenom?: StringWithAggregatesFilter<"Patient"> | string
    telephone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    date_naissance?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    genre?: EnumGenreWithAggregatesFilter<"Patient"> | $Enums.Genre
    medecin_id?: IntNullableWithAggregatesFilter<"Patient"> | number | null
    condition_medicale?: StringWithAggregatesFilter<"Patient"> | string
    photo?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    consultation?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    consultation_specialisee?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    ct_sim?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    debut_traitement?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    fin_traitement?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    rdv_traitement?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    technique_irradiation?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    dose_totale?: FloatNullableWithAggregatesFilter<"Patient"> | number | null
    dose_fraction?: FloatNullableWithAggregatesFilter<"Patient"> | number | null
    cree_le?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type DossierMedicalWhereInput = {
    AND?: DossierMedicalWhereInput | DossierMedicalWhereInput[]
    OR?: DossierMedicalWhereInput[]
    NOT?: DossierMedicalWhereInput | DossierMedicalWhereInput[]
    id?: IntFilter<"DossierMedical"> | number
    patient_id?: IntFilter<"DossierMedical"> | number
    diagnostic?: StringFilter<"DossierMedical"> | string
    traitement?: StringNullableFilter<"DossierMedical"> | string | null
    note_medecin?: StringNullableFilter<"DossierMedical"> | string | null
    date_maj?: DateTimeFilter<"DossierMedical"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type DossierMedicalOrderByWithRelationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    diagnostic?: SortOrder
    traitement?: SortOrderInput | SortOrder
    note_medecin?: SortOrderInput | SortOrder
    date_maj?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type DossierMedicalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DossierMedicalWhereInput | DossierMedicalWhereInput[]
    OR?: DossierMedicalWhereInput[]
    NOT?: DossierMedicalWhereInput | DossierMedicalWhereInput[]
    patient_id?: IntFilter<"DossierMedical"> | number
    diagnostic?: StringFilter<"DossierMedical"> | string
    traitement?: StringNullableFilter<"DossierMedical"> | string | null
    note_medecin?: StringNullableFilter<"DossierMedical"> | string | null
    date_maj?: DateTimeFilter<"DossierMedical"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type DossierMedicalOrderByWithAggregationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    diagnostic?: SortOrder
    traitement?: SortOrderInput | SortOrder
    note_medecin?: SortOrderInput | SortOrder
    date_maj?: SortOrder
    _count?: DossierMedicalCountOrderByAggregateInput
    _avg?: DossierMedicalAvgOrderByAggregateInput
    _max?: DossierMedicalMaxOrderByAggregateInput
    _min?: DossierMedicalMinOrderByAggregateInput
    _sum?: DossierMedicalSumOrderByAggregateInput
  }

  export type DossierMedicalScalarWhereWithAggregatesInput = {
    AND?: DossierMedicalScalarWhereWithAggregatesInput | DossierMedicalScalarWhereWithAggregatesInput[]
    OR?: DossierMedicalScalarWhereWithAggregatesInput[]
    NOT?: DossierMedicalScalarWhereWithAggregatesInput | DossierMedicalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DossierMedical"> | number
    patient_id?: IntWithAggregatesFilter<"DossierMedical"> | number
    diagnostic?: StringWithAggregatesFilter<"DossierMedical"> | string
    traitement?: StringNullableWithAggregatesFilter<"DossierMedical"> | string | null
    note_medecin?: StringNullableWithAggregatesFilter<"DossierMedical"> | string | null
    date_maj?: DateTimeWithAggregatesFilter<"DossierMedical"> | Date | string
  }

  export type RendezVousWhereInput = {
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    id?: IntFilter<"RendezVous"> | number
    patient_id?: IntFilter<"RendezVous"> | number
    medecin_id?: IntFilter<"RendezVous"> | number
    type_rdv?: EnumTypeRDVFilter<"RendezVous"> | $Enums.TypeRDV
    date_rdv?: DateTimeFilter<"RendezVous"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RendezVousOrderByWithRelationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    type_rdv?: SortOrder
    date_rdv?: SortOrder
    patient?: PatientOrderByWithRelationInput
    medecin?: UserOrderByWithRelationInput
  }

  export type RendezVousWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    patient_id?: IntFilter<"RendezVous"> | number
    medecin_id?: IntFilter<"RendezVous"> | number
    type_rdv?: EnumTypeRDVFilter<"RendezVous"> | $Enums.TypeRDV
    date_rdv?: DateTimeFilter<"RendezVous"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RendezVousOrderByWithAggregationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    type_rdv?: SortOrder
    date_rdv?: SortOrder
    _count?: RendezVousCountOrderByAggregateInput
    _avg?: RendezVousAvgOrderByAggregateInput
    _max?: RendezVousMaxOrderByAggregateInput
    _min?: RendezVousMinOrderByAggregateInput
    _sum?: RendezVousSumOrderByAggregateInput
  }

  export type RendezVousScalarWhereWithAggregatesInput = {
    AND?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    OR?: RendezVousScalarWhereWithAggregatesInput[]
    NOT?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RendezVous"> | number
    patient_id?: IntWithAggregatesFilter<"RendezVous"> | number
    medecin_id?: IntWithAggregatesFilter<"RendezVous"> | number
    type_rdv?: EnumTypeRDVWithAggregatesFilter<"RendezVous"> | $Enums.TypeRDV
    date_rdv?: DateTimeWithAggregatesFilter<"RendezVous"> | Date | string
  }

  export type FileAttenteWhereInput = {
    AND?: FileAttenteWhereInput | FileAttenteWhereInput[]
    OR?: FileAttenteWhereInput[]
    NOT?: FileAttenteWhereInput | FileAttenteWhereInput[]
    id?: IntFilter<"FileAttente"> | number
    patient_id?: IntFilter<"FileAttente"> | number
    medecin_id?: IntFilter<"FileAttente"> | number
    statut?: EnumStatutFileAttenteFilter<"FileAttente"> | $Enums.StatutFileAttente
    ordre?: IntFilter<"FileAttente"> | number
    ajoute_le?: DateTimeFilter<"FileAttente"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FileAttenteOrderByWithRelationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    statut?: SortOrder
    ordre?: SortOrder
    ajoute_le?: SortOrder
    patient?: PatientOrderByWithRelationInput
    medecin?: UserOrderByWithRelationInput
  }

  export type FileAttenteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FileAttenteWhereInput | FileAttenteWhereInput[]
    OR?: FileAttenteWhereInput[]
    NOT?: FileAttenteWhereInput | FileAttenteWhereInput[]
    patient_id?: IntFilter<"FileAttente"> | number
    medecin_id?: IntFilter<"FileAttente"> | number
    statut?: EnumStatutFileAttenteFilter<"FileAttente"> | $Enums.StatutFileAttente
    ordre?: IntFilter<"FileAttente"> | number
    ajoute_le?: DateTimeFilter<"FileAttente"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FileAttenteOrderByWithAggregationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    statut?: SortOrder
    ordre?: SortOrder
    ajoute_le?: SortOrder
    _count?: FileAttenteCountOrderByAggregateInput
    _avg?: FileAttenteAvgOrderByAggregateInput
    _max?: FileAttenteMaxOrderByAggregateInput
    _min?: FileAttenteMinOrderByAggregateInput
    _sum?: FileAttenteSumOrderByAggregateInput
  }

  export type FileAttenteScalarWhereWithAggregatesInput = {
    AND?: FileAttenteScalarWhereWithAggregatesInput | FileAttenteScalarWhereWithAggregatesInput[]
    OR?: FileAttenteScalarWhereWithAggregatesInput[]
    NOT?: FileAttenteScalarWhereWithAggregatesInput | FileAttenteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FileAttente"> | number
    patient_id?: IntWithAggregatesFilter<"FileAttente"> | number
    medecin_id?: IntWithAggregatesFilter<"FileAttente"> | number
    statut?: EnumStatutFileAttenteWithAggregatesFilter<"FileAttente"> | $Enums.StatutFileAttente
    ordre?: IntWithAggregatesFilter<"FileAttente"> | number
    ajoute_le?: DateTimeWithAggregatesFilter<"FileAttente"> | Date | string
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    id?: IntFilter<"Consultation"> | number
    patient_id?: IntFilter<"Consultation"> | number
    medecin_id?: IntNullableFilter<"Consultation"> | number | null
    note?: StringNullableFilter<"Consultation"> | string | null
    date_consultation?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ConsultationOrderByWithRelationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    date_consultation?: SortOrder
    patient?: PatientOrderByWithRelationInput
    medecin?: UserOrderByWithRelationInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    patient_id?: IntFilter<"Consultation"> | number
    medecin_id?: IntNullableFilter<"Consultation"> | number | null
    note?: StringNullableFilter<"Consultation"> | string | null
    date_consultation?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    medecin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ConsultationOrderByWithAggregationInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    date_consultation?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _avg?: ConsultationAvgOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
    _sum?: ConsultationSumOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Consultation"> | number
    patient_id?: IntWithAggregatesFilter<"Consultation"> | number
    medecin_id?: IntNullableWithAggregatesFilter<"Consultation"> | number | null
    note?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    date_consultation?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    expediteur_id?: IntFilter<"Message"> | number
    destinataire_id?: IntFilter<"Message"> | number
    message?: StringFilter<"Message"> | string
    vu?: BoolFilter<"Message"> | boolean
    envoye_le?: DateTimeFilter<"Message"> | Date | string
    expediteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    destinataire?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
    message?: SortOrder
    vu?: SortOrder
    envoye_le?: SortOrder
    expediteur?: UserOrderByWithRelationInput
    destinataire?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    expediteur_id?: IntFilter<"Message"> | number
    destinataire_id?: IntFilter<"Message"> | number
    message?: StringFilter<"Message"> | string
    vu?: BoolFilter<"Message"> | boolean
    envoye_le?: DateTimeFilter<"Message"> | Date | string
    expediteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    destinataire?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
    message?: SortOrder
    vu?: SortOrder
    envoye_le?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    expediteur_id?: IntWithAggregatesFilter<"Message"> | number
    destinataire_id?: IntWithAggregatesFilter<"Message"> | number
    message?: StringWithAggregatesFilter<"Message"> | string
    vu?: BoolWithAggregatesFilter<"Message"> | boolean
    envoye_le?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserCreateInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    medecin?: UserCreateNestedOneWithoutPatientsInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalCreateInput = {
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
    patient: PatientCreateNestedOneWithoutDossierInput
  }

  export type DossierMedicalUncheckedCreateInput = {
    id?: number
    patient_id: number
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
  }

  export type DossierMedicalUpdateInput = {
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutDossierNestedInput
  }

  export type DossierMedicalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalCreateManyInput = {
    id?: number
    patient_id: number
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
  }

  export type DossierMedicalUpdateManyMutationInput = {
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousCreateInput = {
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
    patient: PatientCreateNestedOneWithoutRendezVousInput
    medecin: UserCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateInput = {
    id?: number
    patient_id: number
    medecin_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type RendezVousUpdateInput = {
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
    medecin?: UserUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousCreateManyInput = {
    id?: number
    patient_id: number
    medecin_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type RendezVousUpdateManyMutationInput = {
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteCreateInput = {
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
    patient: PatientCreateNestedOneWithoutFileAttenteInput
    medecin: UserCreateNestedOneWithoutFileAttenteInput
  }

  export type FileAttenteUncheckedCreateInput = {
    id?: number
    patient_id: number
    medecin_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type FileAttenteUpdateInput = {
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutFileAttenteNestedInput
    medecin?: UserUpdateOneRequiredWithoutFileAttenteNestedInput
  }

  export type FileAttenteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteCreateManyInput = {
    id?: number
    patient_id: number
    medecin_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type FileAttenteUpdateManyMutationInput = {
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateInput = {
    note?: string | null
    date_consultation?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    medecin?: UserCreateNestedOneWithoutConsultationsInput
  }

  export type ConsultationUncheckedCreateInput = {
    id?: number
    patient_id: number
    medecin_id?: number | null
    note?: string | null
    date_consultation?: Date | string
  }

  export type ConsultationUpdateInput = {
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    medecin?: UserUpdateOneWithoutConsultationsNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateManyInput = {
    id?: number
    patient_id: number
    medecin_id?: number | null
    note?: string | null
    date_consultation?: Date | string
  }

  export type ConsultationUpdateManyMutationInput = {
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    message: string
    vu?: boolean
    envoye_le?: Date | string
    expediteur: UserCreateNestedOneWithoutMessagesEnvoyesInput
    destinataire: UserCreateNestedOneWithoutMessagesRecusInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    expediteur_id: number
    destinataire_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type MessageUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput
    destinataire?: UserUpdateOneRequiredWithoutMessagesRecusNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    expediteur_id?: IntFieldUpdateOperationsInput | number
    destinataire_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: number
    expediteur_id: number
    destinataire_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    expediteur_id?: IntFieldUpdateOperationsInput | number
    destinataire_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PatientNullableScalarRelationFilter = {
    is?: PatientWhereInput | null
    isNot?: PatientWhereInput | null
  }

  export type PatientListRelationFilter = {
    every?: PatientWhereInput
    some?: PatientWhereInput
    none?: PatientWhereInput
  }

  export type RendezVousListRelationFilter = {
    every?: RendezVousWhereInput
    some?: RendezVousWhereInput
    none?: RendezVousWhereInput
  }

  export type FileAttenteListRelationFilter = {
    every?: FileAttenteWhereInput
    some?: FileAttenteWhereInput
    none?: FileAttenteWhereInput
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RendezVousOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileAttenteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    mot_de_passe?: SortOrder
    role?: SortOrder
    specialite?: SortOrder
    telephone?: SortOrder
    photo?: SortOrder
    cree_le?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    mot_de_passe?: SortOrder
    role?: SortOrder
    specialite?: SortOrder
    telephone?: SortOrder
    photo?: SortOrder
    cree_le?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    mot_de_passe?: SortOrder
    role?: SortOrder
    specialite?: SortOrder
    telephone?: SortOrder
    photo?: SortOrder
    cree_le?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumGenreFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel>
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    not?: NestedEnumGenreFilter<$PrismaModel> | $Enums.Genre
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DossierMedicalListRelationFilter = {
    every?: DossierMedicalWhereInput
    some?: DossierMedicalWhereInput
    none?: DossierMedicalWhereInput
  }

  export type DossierMedicalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    numero_patient?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    date_naissance?: SortOrder
    genre?: SortOrder
    medecin_id?: SortOrder
    condition_medicale?: SortOrder
    photo?: SortOrder
    consultation?: SortOrder
    consultation_specialisee?: SortOrder
    ct_sim?: SortOrder
    debut_traitement?: SortOrder
    fin_traitement?: SortOrder
    rdv_traitement?: SortOrder
    technique_irradiation?: SortOrder
    dose_totale?: SortOrder
    dose_fraction?: SortOrder
    cree_le?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    medecin_id?: SortOrder
    dose_totale?: SortOrder
    dose_fraction?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    numero_patient?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    date_naissance?: SortOrder
    genre?: SortOrder
    medecin_id?: SortOrder
    condition_medicale?: SortOrder
    photo?: SortOrder
    consultation?: SortOrder
    consultation_specialisee?: SortOrder
    ct_sim?: SortOrder
    debut_traitement?: SortOrder
    fin_traitement?: SortOrder
    rdv_traitement?: SortOrder
    technique_irradiation?: SortOrder
    dose_totale?: SortOrder
    dose_fraction?: SortOrder
    cree_le?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    numero_patient?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    date_naissance?: SortOrder
    genre?: SortOrder
    medecin_id?: SortOrder
    condition_medicale?: SortOrder
    photo?: SortOrder
    consultation?: SortOrder
    consultation_specialisee?: SortOrder
    ct_sim?: SortOrder
    debut_traitement?: SortOrder
    fin_traitement?: SortOrder
    rdv_traitement?: SortOrder
    technique_irradiation?: SortOrder
    dose_totale?: SortOrder
    dose_fraction?: SortOrder
    cree_le?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    medecin_id?: SortOrder
    dose_totale?: SortOrder
    dose_fraction?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumGenreWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel>
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    not?: NestedEnumGenreWithAggregatesFilter<$PrismaModel> | $Enums.Genre
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenreFilter<$PrismaModel>
    _max?: NestedEnumGenreFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type DossierMedicalCountOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    diagnostic?: SortOrder
    traitement?: SortOrder
    note_medecin?: SortOrder
    date_maj?: SortOrder
  }

  export type DossierMedicalAvgOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
  }

  export type DossierMedicalMaxOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    diagnostic?: SortOrder
    traitement?: SortOrder
    note_medecin?: SortOrder
    date_maj?: SortOrder
  }

  export type DossierMedicalMinOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    diagnostic?: SortOrder
    traitement?: SortOrder
    note_medecin?: SortOrder
    date_maj?: SortOrder
  }

  export type DossierMedicalSumOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
  }

  export type EnumTypeRDVFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeRDV | EnumTypeRDVFieldRefInput<$PrismaModel>
    in?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeRDVFilter<$PrismaModel> | $Enums.TypeRDV
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RendezVousCountOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    type_rdv?: SortOrder
    date_rdv?: SortOrder
  }

  export type RendezVousAvgOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
  }

  export type RendezVousMaxOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    type_rdv?: SortOrder
    date_rdv?: SortOrder
  }

  export type RendezVousMinOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    type_rdv?: SortOrder
    date_rdv?: SortOrder
  }

  export type RendezVousSumOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
  }

  export type EnumTypeRDVWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeRDV | EnumTypeRDVFieldRefInput<$PrismaModel>
    in?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeRDVWithAggregatesFilter<$PrismaModel> | $Enums.TypeRDV
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeRDVFilter<$PrismaModel>
    _max?: NestedEnumTypeRDVFilter<$PrismaModel>
  }

  export type EnumStatutFileAttenteFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFileAttente | EnumStatutFileAttenteFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFileAttenteFilter<$PrismaModel> | $Enums.StatutFileAttente
  }

  export type FileAttenteCountOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    statut?: SortOrder
    ordre?: SortOrder
    ajoute_le?: SortOrder
  }

  export type FileAttenteAvgOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    ordre?: SortOrder
  }

  export type FileAttenteMaxOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    statut?: SortOrder
    ordre?: SortOrder
    ajoute_le?: SortOrder
  }

  export type FileAttenteMinOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    statut?: SortOrder
    ordre?: SortOrder
    ajoute_le?: SortOrder
  }

  export type FileAttenteSumOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    ordre?: SortOrder
  }

  export type EnumStatutFileAttenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFileAttente | EnumStatutFileAttenteFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFileAttenteWithAggregatesFilter<$PrismaModel> | $Enums.StatutFileAttente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutFileAttenteFilter<$PrismaModel>
    _max?: NestedEnumStatutFileAttenteFilter<$PrismaModel>
  }

  export type ConsultationCountOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    note?: SortOrder
    date_consultation?: SortOrder
  }

  export type ConsultationAvgOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    note?: SortOrder
    date_consultation?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
    note?: SortOrder
    date_consultation?: SortOrder
  }

  export type ConsultationSumOrderByAggregateInput = {
    id?: SortOrder
    patient_id?: SortOrder
    medecin_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
    message?: SortOrder
    vu?: SortOrder
    envoye_le?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
    message?: SortOrder
    vu?: SortOrder
    envoye_le?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
    message?: SortOrder
    vu?: SortOrder
    envoye_le?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    expediteur_id?: SortOrder
    destinataire_id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PatientCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientCreateNestedManyWithoutMedecinInput = {
    create?: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput> | PatientCreateWithoutMedecinInput[] | PatientUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutMedecinInput | PatientCreateOrConnectWithoutMedecinInput[]
    createMany?: PatientCreateManyMedecinInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type RendezVousCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type FileAttenteCreateNestedManyWithoutMedecinInput = {
    create?: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput> | FileAttenteCreateWithoutMedecinInput[] | FileAttenteUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutMedecinInput | FileAttenteCreateOrConnectWithoutMedecinInput[]
    createMany?: FileAttenteCreateManyMedecinInputEnvelope
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
  }

  export type ConsultationCreateNestedManyWithoutMedecinInput = {
    create?: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput> | ConsultationCreateWithoutMedecinInput[] | ConsultationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedecinInput | ConsultationCreateOrConnectWithoutMedecinInput[]
    createMany?: ConsultationCreateManyMedecinInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutDestinataireInput = {
    create?: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput> | MessageCreateWithoutDestinataireInput[] | MessageUncheckedCreateWithoutDestinataireInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutDestinataireInput | MessageCreateOrConnectWithoutDestinataireInput[]
    createMany?: MessageCreateManyDestinataireInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type PatientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput> | PatientCreateWithoutMedecinInput[] | PatientUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutMedecinInput | PatientCreateOrConnectWithoutMedecinInput[]
    createMany?: PatientCreateManyMedecinInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type FileAttenteUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput> | FileAttenteCreateWithoutMedecinInput[] | FileAttenteUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutMedecinInput | FileAttenteCreateOrConnectWithoutMedecinInput[]
    createMany?: FileAttenteCreateManyMedecinInputEnvelope
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutMedecinInput = {
    create?: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput> | ConsultationCreateWithoutMedecinInput[] | ConsultationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedecinInput | ConsultationCreateOrConnectWithoutMedecinInput[]
    createMany?: ConsultationCreateManyMedecinInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutDestinataireInput = {
    create?: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput> | MessageCreateWithoutDestinataireInput[] | MessageUncheckedCreateWithoutDestinataireInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutDestinataireInput | MessageCreateOrConnectWithoutDestinataireInput[]
    createMany?: MessageCreateManyDestinataireInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PatientUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput> | PatientCreateWithoutMedecinInput[] | PatientUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutMedecinInput | PatientCreateOrConnectWithoutMedecinInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutMedecinInput | PatientUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: PatientCreateManyMedecinInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutMedecinInput | PatientUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutMedecinInput | PatientUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type RendezVousUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutMedecinInput | RendezVousUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutMedecinInput | RendezVousUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutMedecinInput | RendezVousUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type FileAttenteUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput> | FileAttenteCreateWithoutMedecinInput[] | FileAttenteUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutMedecinInput | FileAttenteCreateOrConnectWithoutMedecinInput[]
    upsert?: FileAttenteUpsertWithWhereUniqueWithoutMedecinInput | FileAttenteUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: FileAttenteCreateManyMedecinInputEnvelope
    set?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    disconnect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    delete?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    update?: FileAttenteUpdateWithWhereUniqueWithoutMedecinInput | FileAttenteUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: FileAttenteUpdateManyWithWhereWithoutMedecinInput | FileAttenteUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
  }

  export type ConsultationUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput> | ConsultationCreateWithoutMedecinInput[] | ConsultationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedecinInput | ConsultationCreateOrConnectWithoutMedecinInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutMedecinInput | ConsultationUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: ConsultationCreateManyMedecinInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutMedecinInput | ConsultationUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutMedecinInput | ConsultationUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutExpediteurInput | MessageUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutExpediteurInput | MessageUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutExpediteurInput | MessageUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutDestinataireNestedInput = {
    create?: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput> | MessageCreateWithoutDestinataireInput[] | MessageUncheckedCreateWithoutDestinataireInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutDestinataireInput | MessageCreateOrConnectWithoutDestinataireInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutDestinataireInput | MessageUpsertWithWhereUniqueWithoutDestinataireInput[]
    createMany?: MessageCreateManyDestinataireInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutDestinataireInput | MessageUpdateWithWhereUniqueWithoutDestinataireInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutDestinataireInput | MessageUpdateManyWithWhereWithoutDestinataireInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput> | PatientCreateWithoutMedecinInput[] | PatientUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutMedecinInput | PatientCreateOrConnectWithoutMedecinInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutMedecinInput | PatientUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: PatientCreateManyMedecinInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutMedecinInput | PatientUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutMedecinInput | PatientUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput> | RendezVousCreateWithoutMedecinInput[] | RendezVousUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutMedecinInput | RendezVousCreateOrConnectWithoutMedecinInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutMedecinInput | RendezVousUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: RendezVousCreateManyMedecinInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutMedecinInput | RendezVousUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutMedecinInput | RendezVousUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput> | FileAttenteCreateWithoutMedecinInput[] | FileAttenteUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutMedecinInput | FileAttenteCreateOrConnectWithoutMedecinInput[]
    upsert?: FileAttenteUpsertWithWhereUniqueWithoutMedecinInput | FileAttenteUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: FileAttenteCreateManyMedecinInputEnvelope
    set?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    disconnect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    delete?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    update?: FileAttenteUpdateWithWhereUniqueWithoutMedecinInput | FileAttenteUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: FileAttenteUpdateManyWithWhereWithoutMedecinInput | FileAttenteUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutMedecinNestedInput = {
    create?: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput> | ConsultationCreateWithoutMedecinInput[] | ConsultationUncheckedCreateWithoutMedecinInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedecinInput | ConsultationCreateOrConnectWithoutMedecinInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutMedecinInput | ConsultationUpsertWithWhereUniqueWithoutMedecinInput[]
    createMany?: ConsultationCreateManyMedecinInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutMedecinInput | ConsultationUpdateWithWhereUniqueWithoutMedecinInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutMedecinInput | ConsultationUpdateManyWithWhereWithoutMedecinInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutExpediteurInput | MessageUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutExpediteurInput | MessageUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutExpediteurInput | MessageUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutDestinataireNestedInput = {
    create?: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput> | MessageCreateWithoutDestinataireInput[] | MessageUncheckedCreateWithoutDestinataireInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutDestinataireInput | MessageCreateOrConnectWithoutDestinataireInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutDestinataireInput | MessageUpsertWithWhereUniqueWithoutDestinataireInput[]
    createMany?: MessageCreateManyDestinataireInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutDestinataireInput | MessageUpdateWithWhereUniqueWithoutDestinataireInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutDestinataireInput | MessageUpdateManyWithWhereWithoutDestinataireInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPatientProfilInput = {
    create?: XOR<UserCreateWithoutPatientProfilInput, UserUncheckedCreateWithoutPatientProfilInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientProfilInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPatientsInput = {
    create?: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientsInput
    connect?: UserWhereUniqueInput
  }

  export type DossierMedicalCreateNestedManyWithoutPatientInput = {
    create?: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput> | DossierMedicalCreateWithoutPatientInput[] | DossierMedicalUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DossierMedicalCreateOrConnectWithoutPatientInput | DossierMedicalCreateOrConnectWithoutPatientInput[]
    createMany?: DossierMedicalCreateManyPatientInputEnvelope
    connect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
  }

  export type RendezVousCreateNestedManyWithoutPatientInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type FileAttenteCreateNestedManyWithoutPatientInput = {
    create?: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput> | FileAttenteCreateWithoutPatientInput[] | FileAttenteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutPatientInput | FileAttenteCreateOrConnectWithoutPatientInput[]
    createMany?: FileAttenteCreateManyPatientInputEnvelope
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
  }

  export type ConsultationCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type DossierMedicalUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput> | DossierMedicalCreateWithoutPatientInput[] | DossierMedicalUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DossierMedicalCreateOrConnectWithoutPatientInput | DossierMedicalCreateOrConnectWithoutPatientInput[]
    createMany?: DossierMedicalCreateManyPatientInputEnvelope
    connect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type FileAttenteUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput> | FileAttenteCreateWithoutPatientInput[] | FileAttenteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutPatientInput | FileAttenteCreateOrConnectWithoutPatientInput[]
    createMany?: FileAttenteCreateManyPatientInputEnvelope
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type EnumGenreFieldUpdateOperationsInput = {
    set?: $Enums.Genre
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutPatientProfilNestedInput = {
    create?: XOR<UserCreateWithoutPatientProfilInput, UserUncheckedCreateWithoutPatientProfilInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientProfilInput
    upsert?: UserUpsertWithoutPatientProfilInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientProfilInput, UserUpdateWithoutPatientProfilInput>, UserUncheckedUpdateWithoutPatientProfilInput>
  }

  export type UserUpdateOneWithoutPatientsNestedInput = {
    create?: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientsInput
    upsert?: UserUpsertWithoutPatientsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientsInput, UserUpdateWithoutPatientsInput>, UserUncheckedUpdateWithoutPatientsInput>
  }

  export type DossierMedicalUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput> | DossierMedicalCreateWithoutPatientInput[] | DossierMedicalUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DossierMedicalCreateOrConnectWithoutPatientInput | DossierMedicalCreateOrConnectWithoutPatientInput[]
    upsert?: DossierMedicalUpsertWithWhereUniqueWithoutPatientInput | DossierMedicalUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DossierMedicalCreateManyPatientInputEnvelope
    set?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    disconnect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    delete?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    connect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    update?: DossierMedicalUpdateWithWhereUniqueWithoutPatientInput | DossierMedicalUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DossierMedicalUpdateManyWithWhereWithoutPatientInput | DossierMedicalUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DossierMedicalScalarWhereInput | DossierMedicalScalarWhereInput[]
  }

  export type RendezVousUpdateManyWithoutPatientNestedInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutPatientInput | RendezVousUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutPatientInput | RendezVousUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutPatientInput | RendezVousUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type FileAttenteUpdateManyWithoutPatientNestedInput = {
    create?: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput> | FileAttenteCreateWithoutPatientInput[] | FileAttenteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutPatientInput | FileAttenteCreateOrConnectWithoutPatientInput[]
    upsert?: FileAttenteUpsertWithWhereUniqueWithoutPatientInput | FileAttenteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: FileAttenteCreateManyPatientInputEnvelope
    set?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    disconnect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    delete?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    update?: FileAttenteUpdateWithWhereUniqueWithoutPatientInput | FileAttenteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: FileAttenteUpdateManyWithWhereWithoutPatientInput | FileAttenteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
  }

  export type ConsultationUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput> | DossierMedicalCreateWithoutPatientInput[] | DossierMedicalUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DossierMedicalCreateOrConnectWithoutPatientInput | DossierMedicalCreateOrConnectWithoutPatientInput[]
    upsert?: DossierMedicalUpsertWithWhereUniqueWithoutPatientInput | DossierMedicalUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DossierMedicalCreateManyPatientInputEnvelope
    set?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    disconnect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    delete?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    connect?: DossierMedicalWhereUniqueInput | DossierMedicalWhereUniqueInput[]
    update?: DossierMedicalUpdateWithWhereUniqueWithoutPatientInput | DossierMedicalUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DossierMedicalUpdateManyWithWhereWithoutPatientInput | DossierMedicalUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DossierMedicalScalarWhereInput | DossierMedicalScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput> | RendezVousCreateWithoutPatientInput[] | RendezVousUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutPatientInput | RendezVousCreateOrConnectWithoutPatientInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutPatientInput | RendezVousUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: RendezVousCreateManyPatientInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutPatientInput | RendezVousUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutPatientInput | RendezVousUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type FileAttenteUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput> | FileAttenteCreateWithoutPatientInput[] | FileAttenteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: FileAttenteCreateOrConnectWithoutPatientInput | FileAttenteCreateOrConnectWithoutPatientInput[]
    upsert?: FileAttenteUpsertWithWhereUniqueWithoutPatientInput | FileAttenteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: FileAttenteCreateManyPatientInputEnvelope
    set?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    disconnect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    delete?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    connect?: FileAttenteWhereUniqueInput | FileAttenteWhereUniqueInput[]
    update?: FileAttenteUpdateWithWhereUniqueWithoutPatientInput | FileAttenteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: FileAttenteUpdateManyWithWhereWithoutPatientInput | FileAttenteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutDossierInput = {
    create?: XOR<PatientCreateWithoutDossierInput, PatientUncheckedCreateWithoutDossierInput>
    connectOrCreate?: PatientCreateOrConnectWithoutDossierInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutDossierNestedInput = {
    create?: XOR<PatientCreateWithoutDossierInput, PatientUncheckedCreateWithoutDossierInput>
    connectOrCreate?: PatientCreateOrConnectWithoutDossierInput
    upsert?: PatientUpsertWithoutDossierInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutDossierInput, PatientUpdateWithoutDossierInput>, PatientUncheckedUpdateWithoutDossierInput>
  }

  export type PatientCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRendezVousInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UserCreateOrConnectWithoutRendezVousInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTypeRDVFieldUpdateOperationsInput = {
    set?: $Enums.TypeRDV
  }

  export type PatientUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRendezVousInput
    upsert?: PatientUpsertWithoutRendezVousInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutRendezVousInput, PatientUpdateWithoutRendezVousInput>, PatientUncheckedUpdateWithoutRendezVousInput>
  }

  export type UserUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UserCreateOrConnectWithoutRendezVousInput
    upsert?: UserUpsertWithoutRendezVousInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRendezVousInput, UserUpdateWithoutRendezVousInput>, UserUncheckedUpdateWithoutRendezVousInput>
  }

  export type PatientCreateNestedOneWithoutFileAttenteInput = {
    create?: XOR<PatientCreateWithoutFileAttenteInput, PatientUncheckedCreateWithoutFileAttenteInput>
    connectOrCreate?: PatientCreateOrConnectWithoutFileAttenteInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFileAttenteInput = {
    create?: XOR<UserCreateWithoutFileAttenteInput, UserUncheckedCreateWithoutFileAttenteInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileAttenteInput
    connect?: UserWhereUniqueInput
  }

  export type EnumStatutFileAttenteFieldUpdateOperationsInput = {
    set?: $Enums.StatutFileAttente
  }

  export type PatientUpdateOneRequiredWithoutFileAttenteNestedInput = {
    create?: XOR<PatientCreateWithoutFileAttenteInput, PatientUncheckedCreateWithoutFileAttenteInput>
    connectOrCreate?: PatientCreateOrConnectWithoutFileAttenteInput
    upsert?: PatientUpsertWithoutFileAttenteInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutFileAttenteInput, PatientUpdateWithoutFileAttenteInput>, PatientUncheckedUpdateWithoutFileAttenteInput>
  }

  export type UserUpdateOneRequiredWithoutFileAttenteNestedInput = {
    create?: XOR<UserCreateWithoutFileAttenteInput, UserUncheckedCreateWithoutFileAttenteInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileAttenteInput
    upsert?: UserUpsertWithoutFileAttenteInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileAttenteInput, UserUpdateWithoutFileAttenteInput>, UserUncheckedUpdateWithoutFileAttenteInput>
  }

  export type PatientCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    upsert?: PatientUpsertWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutConsultationsInput, PatientUpdateWithoutConsultationsInput>, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserUpdateOneWithoutConsultationsNestedInput = {
    create?: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsInput
    upsert?: UserUpsertWithoutConsultationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsultationsInput, UserUpdateWithoutConsultationsInput>, UserUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserCreateNestedOneWithoutMessagesEnvoyesInput = {
    create?: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesEnvoyesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesRecusInput = {
    create?: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesRecusInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesEnvoyesInput
    upsert?: UserUpsertWithoutMessagesEnvoyesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesEnvoyesInput, UserUpdateWithoutMessagesEnvoyesInput>, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesRecusNestedInput = {
    create?: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesRecusInput
    upsert?: UserUpsertWithoutMessagesRecusInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesRecusInput, UserUpdateWithoutMessagesRecusInput>, UserUncheckedUpdateWithoutMessagesRecusInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGenreFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel>
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    not?: NestedEnumGenreFilter<$PrismaModel> | $Enums.Genre
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenreWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel>
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel>
    not?: NestedEnumGenreWithAggregatesFilter<$PrismaModel> | $Enums.Genre
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenreFilter<$PrismaModel>
    _max?: NestedEnumGenreFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumTypeRDVFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeRDV | EnumTypeRDVFieldRefInput<$PrismaModel>
    in?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeRDVFilter<$PrismaModel> | $Enums.TypeRDV
  }

  export type NestedEnumTypeRDVWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeRDV | EnumTypeRDVFieldRefInput<$PrismaModel>
    in?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeRDV[] | ListEnumTypeRDVFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeRDVWithAggregatesFilter<$PrismaModel> | $Enums.TypeRDV
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeRDVFilter<$PrismaModel>
    _max?: NestedEnumTypeRDVFilter<$PrismaModel>
  }

  export type NestedEnumStatutFileAttenteFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFileAttente | EnumStatutFileAttenteFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFileAttenteFilter<$PrismaModel> | $Enums.StatutFileAttente
  }

  export type NestedEnumStatutFileAttenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFileAttente | EnumStatutFileAttenteFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFileAttente[] | ListEnumStatutFileAttenteFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFileAttenteWithAggregatesFilter<$PrismaModel> | $Enums.StatutFileAttente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutFileAttenteFilter<$PrismaModel>
    _max?: NestedEnumStatutFileAttenteFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PatientCreateWithoutUserInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    medecin?: UserCreateNestedOneWithoutPatientsInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUserInput = {
    id?: number
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUserInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type PatientCreateWithoutMedecinInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutMedecinInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutMedecinInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput>
  }

  export type PatientCreateManyMedecinInputEnvelope = {
    data: PatientCreateManyMedecinInput | PatientCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousCreateWithoutMedecinInput = {
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
    patient: PatientCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateWithoutMedecinInput = {
    id?: number
    patient_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type RendezVousCreateOrConnectWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput>
  }

  export type RendezVousCreateManyMedecinInputEnvelope = {
    data: RendezVousCreateManyMedecinInput | RendezVousCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type FileAttenteCreateWithoutMedecinInput = {
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
    patient: PatientCreateNestedOneWithoutFileAttenteInput
  }

  export type FileAttenteUncheckedCreateWithoutMedecinInput = {
    id?: number
    patient_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type FileAttenteCreateOrConnectWithoutMedecinInput = {
    where: FileAttenteWhereUniqueInput
    create: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput>
  }

  export type FileAttenteCreateManyMedecinInputEnvelope = {
    data: FileAttenteCreateManyMedecinInput | FileAttenteCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationCreateWithoutMedecinInput = {
    note?: string | null
    date_consultation?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
  }

  export type ConsultationUncheckedCreateWithoutMedecinInput = {
    id?: number
    patient_id: number
    note?: string | null
    date_consultation?: Date | string
  }

  export type ConsultationCreateOrConnectWithoutMedecinInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput>
  }

  export type ConsultationCreateManyMedecinInputEnvelope = {
    data: ConsultationCreateManyMedecinInput | ConsultationCreateManyMedecinInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutExpediteurInput = {
    message: string
    vu?: boolean
    envoye_le?: Date | string
    destinataire: UserCreateNestedOneWithoutMessagesRecusInput
  }

  export type MessageUncheckedCreateWithoutExpediteurInput = {
    id?: number
    destinataire_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type MessageCreateOrConnectWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput>
  }

  export type MessageCreateManyExpediteurInputEnvelope = {
    data: MessageCreateManyExpediteurInput | MessageCreateManyExpediteurInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutDestinataireInput = {
    message: string
    vu?: boolean
    envoye_le?: Date | string
    expediteur: UserCreateNestedOneWithoutMessagesEnvoyesInput
  }

  export type MessageUncheckedCreateWithoutDestinataireInput = {
    id?: number
    expediteur_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type MessageCreateOrConnectWithoutDestinataireInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput>
  }

  export type MessageCreateManyDestinataireInputEnvelope = {
    data: MessageCreateManyDestinataireInput | MessageCreateManyDestinataireInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutUserInput = {
    update: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutUserInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateWithoutUserInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientUpsertWithWhereUniqueWithoutMedecinInput = {
    where: PatientWhereUniqueInput
    update: XOR<PatientUpdateWithoutMedecinInput, PatientUncheckedUpdateWithoutMedecinInput>
    create: XOR<PatientCreateWithoutMedecinInput, PatientUncheckedCreateWithoutMedecinInput>
  }

  export type PatientUpdateWithWhereUniqueWithoutMedecinInput = {
    where: PatientWhereUniqueInput
    data: XOR<PatientUpdateWithoutMedecinInput, PatientUncheckedUpdateWithoutMedecinInput>
  }

  export type PatientUpdateManyWithWhereWithoutMedecinInput = {
    where: PatientScalarWhereInput
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyWithoutMedecinInput>
  }

  export type PatientScalarWhereInput = {
    AND?: PatientScalarWhereInput | PatientScalarWhereInput[]
    OR?: PatientScalarWhereInput[]
    NOT?: PatientScalarWhereInput | PatientScalarWhereInput[]
    id?: IntFilter<"Patient"> | number
    user_id?: IntNullableFilter<"Patient"> | number | null
    numero_patient?: StringFilter<"Patient"> | string
    nom?: StringFilter<"Patient"> | string
    prenom?: StringFilter<"Patient"> | string
    telephone?: StringNullableFilter<"Patient"> | string | null
    date_naissance?: DateTimeFilter<"Patient"> | Date | string
    genre?: EnumGenreFilter<"Patient"> | $Enums.Genre
    medecin_id?: IntNullableFilter<"Patient"> | number | null
    condition_medicale?: StringFilter<"Patient"> | string
    photo?: StringNullableFilter<"Patient"> | string | null
    consultation?: DateTimeNullableFilter<"Patient"> | Date | string | null
    consultation_specialisee?: DateTimeNullableFilter<"Patient"> | Date | string | null
    ct_sim?: DateTimeNullableFilter<"Patient"> | Date | string | null
    debut_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    fin_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    rdv_traitement?: DateTimeNullableFilter<"Patient"> | Date | string | null
    technique_irradiation?: StringNullableFilter<"Patient"> | string | null
    dose_totale?: FloatNullableFilter<"Patient"> | number | null
    dose_fraction?: FloatNullableFilter<"Patient"> | number | null
    cree_le?: DateTimeFilter<"Patient"> | Date | string
  }

  export type RendezVousUpsertWithWhereUniqueWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutMedecinInput, RendezVousUncheckedUpdateWithoutMedecinInput>
    create: XOR<RendezVousCreateWithoutMedecinInput, RendezVousUncheckedCreateWithoutMedecinInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutMedecinInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutMedecinInput, RendezVousUncheckedUpdateWithoutMedecinInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutMedecinInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutMedecinInput>
  }

  export type RendezVousScalarWhereInput = {
    AND?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    OR?: RendezVousScalarWhereInput[]
    NOT?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    id?: IntFilter<"RendezVous"> | number
    patient_id?: IntFilter<"RendezVous"> | number
    medecin_id?: IntFilter<"RendezVous"> | number
    type_rdv?: EnumTypeRDVFilter<"RendezVous"> | $Enums.TypeRDV
    date_rdv?: DateTimeFilter<"RendezVous"> | Date | string
  }

  export type FileAttenteUpsertWithWhereUniqueWithoutMedecinInput = {
    where: FileAttenteWhereUniqueInput
    update: XOR<FileAttenteUpdateWithoutMedecinInput, FileAttenteUncheckedUpdateWithoutMedecinInput>
    create: XOR<FileAttenteCreateWithoutMedecinInput, FileAttenteUncheckedCreateWithoutMedecinInput>
  }

  export type FileAttenteUpdateWithWhereUniqueWithoutMedecinInput = {
    where: FileAttenteWhereUniqueInput
    data: XOR<FileAttenteUpdateWithoutMedecinInput, FileAttenteUncheckedUpdateWithoutMedecinInput>
  }

  export type FileAttenteUpdateManyWithWhereWithoutMedecinInput = {
    where: FileAttenteScalarWhereInput
    data: XOR<FileAttenteUpdateManyMutationInput, FileAttenteUncheckedUpdateManyWithoutMedecinInput>
  }

  export type FileAttenteScalarWhereInput = {
    AND?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
    OR?: FileAttenteScalarWhereInput[]
    NOT?: FileAttenteScalarWhereInput | FileAttenteScalarWhereInput[]
    id?: IntFilter<"FileAttente"> | number
    patient_id?: IntFilter<"FileAttente"> | number
    medecin_id?: IntFilter<"FileAttente"> | number
    statut?: EnumStatutFileAttenteFilter<"FileAttente"> | $Enums.StatutFileAttente
    ordre?: IntFilter<"FileAttente"> | number
    ajoute_le?: DateTimeFilter<"FileAttente"> | Date | string
  }

  export type ConsultationUpsertWithWhereUniqueWithoutMedecinInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutMedecinInput, ConsultationUncheckedUpdateWithoutMedecinInput>
    create: XOR<ConsultationCreateWithoutMedecinInput, ConsultationUncheckedCreateWithoutMedecinInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutMedecinInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutMedecinInput, ConsultationUncheckedUpdateWithoutMedecinInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutMedecinInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutMedecinInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    id?: IntFilter<"Consultation"> | number
    patient_id?: IntFilter<"Consultation"> | number
    medecin_id?: IntNullableFilter<"Consultation"> | number | null
    note?: StringNullableFilter<"Consultation"> | string | null
    date_consultation?: DateTimeFilter<"Consultation"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutExpediteurInput, MessageUncheckedUpdateWithoutExpediteurInput>
    create: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutExpediteurInput, MessageUncheckedUpdateWithoutExpediteurInput>
  }

  export type MessageUpdateManyWithWhereWithoutExpediteurInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutExpediteurInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    expediteur_id?: IntFilter<"Message"> | number
    destinataire_id?: IntFilter<"Message"> | number
    message?: StringFilter<"Message"> | string
    vu?: BoolFilter<"Message"> | boolean
    envoye_le?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutDestinataireInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutDestinataireInput, MessageUncheckedUpdateWithoutDestinataireInput>
    create: XOR<MessageCreateWithoutDestinataireInput, MessageUncheckedCreateWithoutDestinataireInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutDestinataireInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutDestinataireInput, MessageUncheckedUpdateWithoutDestinataireInput>
  }

  export type MessageUpdateManyWithWhereWithoutDestinataireInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutDestinataireInput>
  }

  export type UserCreateWithoutPatientProfilInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutPatientProfilInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutPatientProfilInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientProfilInput, UserUncheckedCreateWithoutPatientProfilInput>
  }

  export type UserCreateWithoutPatientsInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutPatientsInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutPatientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
  }

  export type DossierMedicalCreateWithoutPatientInput = {
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
  }

  export type DossierMedicalUncheckedCreateWithoutPatientInput = {
    id?: number
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
  }

  export type DossierMedicalCreateOrConnectWithoutPatientInput = {
    where: DossierMedicalWhereUniqueInput
    create: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput>
  }

  export type DossierMedicalCreateManyPatientInputEnvelope = {
    data: DossierMedicalCreateManyPatientInput | DossierMedicalCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousCreateWithoutPatientInput = {
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
    medecin: UserCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateWithoutPatientInput = {
    id?: number
    medecin_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type RendezVousCreateOrConnectWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput>
  }

  export type RendezVousCreateManyPatientInputEnvelope = {
    data: RendezVousCreateManyPatientInput | RendezVousCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type FileAttenteCreateWithoutPatientInput = {
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
    medecin: UserCreateNestedOneWithoutFileAttenteInput
  }

  export type FileAttenteUncheckedCreateWithoutPatientInput = {
    id?: number
    medecin_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type FileAttenteCreateOrConnectWithoutPatientInput = {
    where: FileAttenteWhereUniqueInput
    create: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput>
  }

  export type FileAttenteCreateManyPatientInputEnvelope = {
    data: FileAttenteCreateManyPatientInput | FileAttenteCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationCreateWithoutPatientInput = {
    note?: string | null
    date_consultation?: Date | string
    medecin?: UserCreateNestedOneWithoutConsultationsInput
  }

  export type ConsultationUncheckedCreateWithoutPatientInput = {
    id?: number
    medecin_id?: number | null
    note?: string | null
    date_consultation?: Date | string
  }

  export type ConsultationCreateOrConnectWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationCreateManyPatientInputEnvelope = {
    data: ConsultationCreateManyPatientInput | ConsultationCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientProfilInput = {
    update: XOR<UserUpdateWithoutPatientProfilInput, UserUncheckedUpdateWithoutPatientProfilInput>
    create: XOR<UserCreateWithoutPatientProfilInput, UserUncheckedCreateWithoutPatientProfilInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientProfilInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientProfilInput, UserUncheckedUpdateWithoutPatientProfilInput>
  }

  export type UserUpdateWithoutPatientProfilInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientProfilInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUpsertWithoutPatientsInput = {
    update: XOR<UserUpdateWithoutPatientsInput, UserUncheckedUpdateWithoutPatientsInput>
    create: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientsInput, UserUncheckedUpdateWithoutPatientsInput>
  }

  export type UserUpdateWithoutPatientsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type DossierMedicalUpsertWithWhereUniqueWithoutPatientInput = {
    where: DossierMedicalWhereUniqueInput
    update: XOR<DossierMedicalUpdateWithoutPatientInput, DossierMedicalUncheckedUpdateWithoutPatientInput>
    create: XOR<DossierMedicalCreateWithoutPatientInput, DossierMedicalUncheckedCreateWithoutPatientInput>
  }

  export type DossierMedicalUpdateWithWhereUniqueWithoutPatientInput = {
    where: DossierMedicalWhereUniqueInput
    data: XOR<DossierMedicalUpdateWithoutPatientInput, DossierMedicalUncheckedUpdateWithoutPatientInput>
  }

  export type DossierMedicalUpdateManyWithWhereWithoutPatientInput = {
    where: DossierMedicalScalarWhereInput
    data: XOR<DossierMedicalUpdateManyMutationInput, DossierMedicalUncheckedUpdateManyWithoutPatientInput>
  }

  export type DossierMedicalScalarWhereInput = {
    AND?: DossierMedicalScalarWhereInput | DossierMedicalScalarWhereInput[]
    OR?: DossierMedicalScalarWhereInput[]
    NOT?: DossierMedicalScalarWhereInput | DossierMedicalScalarWhereInput[]
    id?: IntFilter<"DossierMedical"> | number
    patient_id?: IntFilter<"DossierMedical"> | number
    diagnostic?: StringFilter<"DossierMedical"> | string
    traitement?: StringNullableFilter<"DossierMedical"> | string | null
    note_medecin?: StringNullableFilter<"DossierMedical"> | string | null
    date_maj?: DateTimeFilter<"DossierMedical"> | Date | string
  }

  export type RendezVousUpsertWithWhereUniqueWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutPatientInput, RendezVousUncheckedUpdateWithoutPatientInput>
    create: XOR<RendezVousCreateWithoutPatientInput, RendezVousUncheckedCreateWithoutPatientInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutPatientInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutPatientInput, RendezVousUncheckedUpdateWithoutPatientInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutPatientInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutPatientInput>
  }

  export type FileAttenteUpsertWithWhereUniqueWithoutPatientInput = {
    where: FileAttenteWhereUniqueInput
    update: XOR<FileAttenteUpdateWithoutPatientInput, FileAttenteUncheckedUpdateWithoutPatientInput>
    create: XOR<FileAttenteCreateWithoutPatientInput, FileAttenteUncheckedCreateWithoutPatientInput>
  }

  export type FileAttenteUpdateWithWhereUniqueWithoutPatientInput = {
    where: FileAttenteWhereUniqueInput
    data: XOR<FileAttenteUpdateWithoutPatientInput, FileAttenteUncheckedUpdateWithoutPatientInput>
  }

  export type FileAttenteUpdateManyWithWhereWithoutPatientInput = {
    where: FileAttenteScalarWhereInput
    data: XOR<FileAttenteUpdateManyMutationInput, FileAttenteUncheckedUpdateManyWithoutPatientInput>
  }

  export type ConsultationUpsertWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutPatientInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutDossierInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    medecin?: UserCreateNestedOneWithoutPatientsInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutDossierInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutDossierInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutDossierInput, PatientUncheckedCreateWithoutDossierInput>
  }

  export type PatientUpsertWithoutDossierInput = {
    update: XOR<PatientUpdateWithoutDossierInput, PatientUncheckedUpdateWithoutDossierInput>
    create: XOR<PatientCreateWithoutDossierInput, PatientUncheckedCreateWithoutDossierInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutDossierInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutDossierInput, PatientUncheckedUpdateWithoutDossierInput>
  }

  export type PatientUpdateWithoutDossierInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutDossierInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutRendezVousInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    medecin?: UserCreateNestedOneWithoutPatientsInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutRendezVousInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutRendezVousInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
  }

  export type UserCreateWithoutRendezVousInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutRendezVousInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutRendezVousInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
  }

  export type PatientUpsertWithoutRendezVousInput = {
    update: XOR<PatientUpdateWithoutRendezVousInput, PatientUncheckedUpdateWithoutRendezVousInput>
    create: XOR<PatientCreateWithoutRendezVousInput, PatientUncheckedCreateWithoutRendezVousInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutRendezVousInput, PatientUncheckedUpdateWithoutRendezVousInput>
  }

  export type PatientUpdateWithoutRendezVousInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutRendezVousInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutRendezVousInput = {
    update: XOR<UserUpdateWithoutRendezVousInput, UserUncheckedUpdateWithoutRendezVousInput>
    create: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRendezVousInput, UserUncheckedUpdateWithoutRendezVousInput>
  }

  export type UserUpdateWithoutRendezVousInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutRendezVousInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type PatientCreateWithoutFileAttenteInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    medecin?: UserCreateNestedOneWithoutPatientsInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutFileAttenteInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutFileAttenteInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutFileAttenteInput, PatientUncheckedCreateWithoutFileAttenteInput>
  }

  export type UserCreateWithoutFileAttenteInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutFileAttenteInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutFileAttenteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileAttenteInput, UserUncheckedCreateWithoutFileAttenteInput>
  }

  export type PatientUpsertWithoutFileAttenteInput = {
    update: XOR<PatientUpdateWithoutFileAttenteInput, PatientUncheckedUpdateWithoutFileAttenteInput>
    create: XOR<PatientCreateWithoutFileAttenteInput, PatientUncheckedCreateWithoutFileAttenteInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutFileAttenteInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutFileAttenteInput, PatientUncheckedUpdateWithoutFileAttenteInput>
  }

  export type PatientUpdateWithoutFileAttenteInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutFileAttenteInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutFileAttenteInput = {
    update: XOR<UserUpdateWithoutFileAttenteInput, UserUncheckedUpdateWithoutFileAttenteInput>
    create: XOR<UserCreateWithoutFileAttenteInput, UserUncheckedCreateWithoutFileAttenteInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileAttenteInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileAttenteInput, UserUncheckedUpdateWithoutFileAttenteInput>
  }

  export type UserUpdateWithoutFileAttenteInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutFileAttenteInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type PatientCreateWithoutConsultationsInput = {
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    user?: UserCreateNestedOneWithoutPatientProfilInput
    medecin?: UserCreateNestedOneWithoutPatientsInput
    dossier?: DossierMedicalCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutConsultationsInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    medecin_id?: number | null
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
    dossier?: DossierMedicalUncheckedCreateNestedManyWithoutPatientInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutPatientInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutConsultationsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
  }

  export type UserCreateWithoutConsultationsInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutConsultationsInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutConsultationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
  }

  export type PatientUpsertWithoutConsultationsInput = {
    update: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type PatientUpdateWithoutConsultationsInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    medecin?: UserUpdateOneWithoutPatientsNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutConsultationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutConsultationsInput = {
    update: XOR<UserUpdateWithoutConsultationsInput, UserUncheckedUpdateWithoutConsultationsInput>
    create: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsultationsInput, UserUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserUpdateWithoutConsultationsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutConsultationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type UserCreateWithoutMessagesEnvoyesInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesRecus?: MessageCreateNestedManyWithoutDestinataireInput
  }

  export type UserUncheckedCreateWithoutMessagesEnvoyesInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesRecus?: MessageUncheckedCreateNestedManyWithoutDestinataireInput
  }

  export type UserCreateOrConnectWithoutMessagesEnvoyesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
  }

  export type UserCreateWithoutMessagesRecusInput = {
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientCreateNestedOneWithoutUserInput
    patients?: PatientCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
  }

  export type UserUncheckedCreateWithoutMessagesRecusInput = {
    id?: number
    nom: string
    prenom: string
    email: string
    mot_de_passe: string
    role: $Enums.Role
    specialite?: string | null
    telephone?: string | null
    photo?: string | null
    cree_le?: Date | string
    patientProfil?: PatientUncheckedCreateNestedOneWithoutUserInput
    patients?: PatientUncheckedCreateNestedManyWithoutMedecinInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutMedecinInput
    fileAttente?: FileAttenteUncheckedCreateNestedManyWithoutMedecinInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutMedecinInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
  }

  export type UserCreateOrConnectWithoutMessagesRecusInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
  }

  export type UserUpsertWithoutMessagesEnvoyesInput = {
    update: XOR<UserUpdateWithoutMessagesEnvoyesInput, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
    create: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesEnvoyesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesEnvoyesInput, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
  }

  export type UserUpdateWithoutMessagesEnvoyesInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesRecus?: MessageUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesEnvoyesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesRecus?: MessageUncheckedUpdateManyWithoutDestinataireNestedInput
  }

  export type UserUpsertWithoutMessagesRecusInput = {
    update: XOR<UserUpdateWithoutMessagesRecusInput, UserUncheckedUpdateWithoutMessagesRecusInput>
    create: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesRecusInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesRecusInput, UserUncheckedUpdateWithoutMessagesRecusInput>
  }

  export type UserUpdateWithoutMessagesRecusInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUpdateOneWithoutUserNestedInput
    patients?: PatientUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesRecusInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mot_de_passe?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfil?: PatientUncheckedUpdateOneWithoutUserNestedInput
    patients?: PatientUncheckedUpdateManyWithoutMedecinNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutMedecinNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutMedecinNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutMedecinNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
  }

  export type PatientCreateManyMedecinInput = {
    id?: number
    user_id?: number | null
    numero_patient: string
    nom: string
    prenom: string
    telephone?: string | null
    date_naissance: Date | string
    genre: $Enums.Genre
    condition_medicale: string
    photo?: string | null
    consultation?: Date | string | null
    consultation_specialisee?: Date | string | null
    ct_sim?: Date | string | null
    debut_traitement?: Date | string | null
    fin_traitement?: Date | string | null
    rdv_traitement?: Date | string | null
    technique_irradiation?: string | null
    dose_totale?: number | null
    dose_fraction?: number | null
    cree_le?: Date | string
  }

  export type RendezVousCreateManyMedecinInput = {
    id?: number
    patient_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type FileAttenteCreateManyMedecinInput = {
    id?: number
    patient_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type ConsultationCreateManyMedecinInput = {
    id?: number
    patient_id: number
    note?: string | null
    date_consultation?: Date | string
  }

  export type MessageCreateManyExpediteurInput = {
    id?: number
    destinataire_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type MessageCreateManyDestinataireInput = {
    id?: number
    expediteur_id: number
    message: string
    vu?: boolean
    envoye_le?: Date | string
  }

  export type PatientUpdateWithoutMedecinInput = {
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPatientProfilNestedInput
    dossier?: DossierMedicalUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
    dossier?: DossierMedicalUncheckedUpdateManyWithoutPatientNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutPatientNestedInput
    fileAttente?: FileAttenteUncheckedUpdateManyWithoutPatientNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateManyWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    numero_patient?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    date_naissance?: DateTimeFieldUpdateOperationsInput | Date | string
    genre?: EnumGenreFieldUpdateOperationsInput | $Enums.Genre
    condition_medicale?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultation_specialisee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ct_sim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    debut_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fin_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rdv_traitement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    technique_irradiation?: NullableStringFieldUpdateOperationsInput | string | null
    dose_totale?: NullableFloatFieldUpdateOperationsInput | number | null
    dose_fraction?: NullableFloatFieldUpdateOperationsInput | number | null
    cree_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUpdateWithoutMedecinInput = {
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteUpdateWithoutMedecinInput = {
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutFileAttenteNestedInput
  }

  export type FileAttenteUncheckedUpdateWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteUncheckedUpdateManyWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUpdateWithoutMedecinInput = {
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyWithoutMedecinInput = {
    id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutExpediteurInput = {
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
    destinataire?: UserUpdateOneRequiredWithoutMessagesRecusNestedInput
  }

  export type MessageUncheckedUpdateWithoutExpediteurInput = {
    id?: IntFieldUpdateOperationsInput | number
    destinataire_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutExpediteurInput = {
    id?: IntFieldUpdateOperationsInput | number
    destinataire_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutDestinataireInput = {
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput
  }

  export type MessageUncheckedUpdateWithoutDestinataireInput = {
    id?: IntFieldUpdateOperationsInput | number
    expediteur_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutDestinataireInput = {
    id?: IntFieldUpdateOperationsInput | number
    expediteur_id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    vu?: BoolFieldUpdateOperationsInput | boolean
    envoye_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalCreateManyPatientInput = {
    id?: number
    diagnostic: string
    traitement?: string | null
    note_medecin?: string | null
    date_maj?: Date | string
  }

  export type RendezVousCreateManyPatientInput = {
    id?: number
    medecin_id: number
    type_rdv: $Enums.TypeRDV
    date_rdv: Date | string
  }

  export type FileAttenteCreateManyPatientInput = {
    id?: number
    medecin_id: number
    statut?: $Enums.StatutFileAttente
    ordre: number
    ajoute_le?: Date | string
  }

  export type ConsultationCreateManyPatientInput = {
    id?: number
    medecin_id?: number | null
    note?: string | null
    date_consultation?: Date | string
  }

  export type DossierMedicalUpdateWithoutPatientInput = {
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DossierMedicalUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    diagnostic?: StringFieldUpdateOperationsInput | string
    traitement?: NullableStringFieldUpdateOperationsInput | string | null
    note_medecin?: NullableStringFieldUpdateOperationsInput | string | null
    date_maj?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUpdateWithoutPatientInput = {
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
    medecin?: UserUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    type_rdv?: EnumTypeRDVFieldUpdateOperationsInput | $Enums.TypeRDV
    date_rdv?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteUpdateWithoutPatientInput = {
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
    medecin?: UserUpdateOneRequiredWithoutFileAttenteNestedInput
  }

  export type FileAttenteUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttenteUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutFileAttenteFieldUpdateOperationsInput | $Enums.StatutFileAttente
    ordre?: IntFieldUpdateOperationsInput | number
    ajoute_le?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUpdateWithoutPatientInput = {
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
    medecin?: UserUpdateOneWithoutConsultationsNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    medecin_id?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    date_consultation?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}