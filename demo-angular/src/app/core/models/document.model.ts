
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

export interface DocumentType {
  id:number;
  nombre:string;
  descripcion:string;
  requerimientos: DocumentRequirements[];
}

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

export interface DocumentRequirements {
  id:number;
  nombre:string;
  descripcion:string;
}

export interface DashboardStats {
  total: number;
  growth: number;
  thisMonth: number;
  shared: number;
  toReview: number;
  signed: number;
}
