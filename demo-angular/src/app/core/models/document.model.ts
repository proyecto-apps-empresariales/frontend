export type DocTag = 'CONTRATOS' | 'LEGAL' | 'FINANZAS' | 'RRHH' | 'OTROS';
export type DocType = 'pdf' | 'docx' | 'xlsx';

export interface Document {
  id: string;
  name: string;
  type: DocType;
  size: string;
  date: string;
  tag: DocTag;
  responsible: string;
}

export interface DashboardStats {
  total: number;
  growth: number;
  thisMonth: number;
  shared: number;
  toReview: number;
  signed: number;
}
