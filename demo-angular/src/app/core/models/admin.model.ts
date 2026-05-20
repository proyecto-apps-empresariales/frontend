
// Documents  
export interface ResponseDocument {
  id: number;
  usuarioCreador:string;
  tipoDocumento: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  versiones: DocumentVersion[] ;
}

export interface CreateDocumentRequest {
  usuarioCreador: string;
  tipoDocumento: string;
  nombre: string;
  descripcion: string;
}

// Document Types
export interface DocumentType {
  id:number;
  nombre:string;
  descripcion:string;
  requerimientos: DocumentRequirements[];
}

export interface CreateDocumentTypeInterface {
  nombre:string;
  descripcion:string;
  requerimientos: string[];
}

// Document Versions
export interface DocumentVersion {
  id:number;
  documento:string;
  usuarioActualizador:string;
  nombre:string;
  archivoUrl:string;
  descripcion:string;
  fechaActualizacion:string;
}

export interface CreateDocumentVersion {
  documento:string;
  usuarioActualizador:string;
  archivoUrl:string;
  descripcion:string;
  fechaActualizacion:string;
}

// Document Requirements
export interface DocumentRequirements {
  id:number;
  nombre:string;
  descripcion:string;
}

export interface CreateDocumentRequirements {
  nombre:string;
}

//Templates
export interface TemplateInterface {
  id: number;
  tipoDocumento: string;
  descripcion: string;
  archivoUrl: string;
}

export interface CreateTemplateInterface {
  tipoDocumento: string;
  descripcion: string;
  archivoUrl: string;
}
// Organizations
export interface Organization {
  idOrganizacion: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
}

export interface CreateOrganization {
  nombre: string;
  descripcion: string;
}

export interface UpdateOrganization {
  nombre?: string;
  descripcion?: string;
}

// Roles
export interface Role {
  idRol: number;
  nombre: string;
  descripcion: string;
}

export interface CreateRole {
  nombre: string;
  descripcion: string;
}

export interface UpdateRole {
  nombre?: string;
  descripcion?: string;
}

// users
export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  fechaCreacion: string;
  estaActivo: number;
  idOrganizacion: number;
  nombreOrganizacion: string;
  idRol: number;
  nombreRol: string;
}

export interface CreateUser {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  idOrganizacion: number;
  idRol: number;
}

export interface UpdateUser {
  nombre?: string;
  apellido?: string;
  celular?: string;
  estaActivo?: boolean;
  idOrganizacion?: number;
  idRol?: number;
}

export interface UpdatePassword {
  idUsuario: number;
  contrasenaActual: string;
  contrasenaNueva: string;
  contrasenaConfirmacion: string;
}

// ─── Estado Petición Flujo ────────────────────────────────────────
export interface EstadoPeticionFlujo {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CreateUpdateEstadoPeticion {
  nombre: string;
  descripcion: string;
}

// ─── Tipo Petición Flujo ──────────────────────────────────────────
export interface TipoPeticionFlujo {
  id: number;
  nombre: string;
  descripcion: string;
  instruccionesPdf?: string;
  requerimientos: string[];
}

export interface CreateUpdateTipoPeticion {
  nombre: string;
  descripcion: string;
  instruccionesPdf?: string;
  requerimientos: string[];
}

// ─── Requerimiento Petición ───────────────────────────────────────
export interface RequerimientoPeticion {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CreateUpdateRequerimientoPeticion {
  nombre: string;
  descripcion: string;
}

// ─── Petición Flujo ───────────────────────────────────────────────
export interface PeticionFlujo {
  id: number;
  remitente: string;
  destinatario: string;
  nombreDocumento: string;
  tipoPeticion: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  nombre: string;
}

export interface CreatePeticionFlujo {
  remitente: number;
  destinatario: number;
  documento: number;
  tipoPeticion: number;
  fechaFin: string;
  descripcion: string;
  nombre: string;
}

export interface UpdatePeticionFlujo {
  destinatario: number;
  documento: number;
  tipoPeticion: number;
  fechaFin: string;
  descripcion: string;
  nombre: string;
}

// ─── Firma Petición Flujo ─────────────────────────────────────────
export interface FirmaPeticionFlujo {
  id: number;
  usuarioFirmador: string;
  peticion: string;
  fechaFirma: string;
  observacion: string;
}

export interface CreateFirmaPeticion {
  usuarioFirmador: number;
  peticion: number;
  observacion: string;
}

// ─── Firma Usuario ────────────────────────────────────────────────
export interface FirmaUsuario {
  idFirma: number;
  archivoFirma: string;
  fecha: string;
  descripcion: string;
  idUsuario: number;
  nombreUsuario: string;
  correoUsuario: string;
}

export interface CreateFirmaUsuario {
  archivoFirma: string;
  descripcion: string;
  idUsuario: number;
}

export interface UpdateFirmaUsuario {
  archivoFirma?: string;
  descripcion?: string;
  idUsuario?: number;
}

//  Historial Petición Flujo 
export interface HistorialPeticionFlujo {
  id: number;
  peticion: number;
  usuarioEditor: string;
  fecha: string;
  descripcion: string;
}

export interface CreateFlowRequest {
  remitente: number;
  destinatario: number;
  documento: number;
  tipoPeticion: number;
  fechaFin: string;
  descripcion: string;
  nombre: string;
}

export interface UpdateFlowRequest {
  destinatario: number;
  documento: number;
  tipoPeticion: number;
  fechaFin: string;
  descripcion: string;
  nombre: string;
}

//  Flow Request Signature 
export interface FlowRequestSignature {
  id: number;
  signingUser: string;
  request: string;
  signatureDate: string;
  observation: string;
}

export interface CreateFlowRequestSignature {
  usuarioFirmador: number;
  peticion: number;
  observacion: string;
}

//  User Signature 
export interface UserSignature {
  idFirma: number;
  signatureFile: string;
  date: string;
  description: string;
  userId: number;
  userName: string;
  userEmail: string;
}

export interface CreateUserSignature {
  archivoFirma: string;
  descripcion: string;
  idUsuario: number;
}

export interface UpdateUserSignature {
  archivoFirma?: string;
  descripcion?: string;
  idUsuario?: number;
}

//  Flow Request History 
export interface FlowRequestHistory {
  id: number;
  request: number;
  editorUser: string;
  date: string;
  description: string;
}