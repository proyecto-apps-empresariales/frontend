import { Injectable } from '@angular/core';
import { Document, DashboardStats } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  getStats(): DashboardStats {
    return {
      total: 1240,
      growth: 12,
      thisMonth: 145,
      shared: 892,
      toReview: 12,
      signed: 458,
    };
  }

  getRecentDocuments(): Document[] {
    return [
      {
        id: '1',
        name: 'Contrato_Servicios_Q3_2024.pdf',
        type: 'pdf',
        size: '2.4 MB',
        date: '24 Oct, 2024',
        tag: 'CONTRATOS',
        responsible: 'Luis Marcano',
      },
      {
        id: '2',
        name: 'Acta_Constitutiva_vFinal.docx',
        type: 'docx',
        size: '850 KB',
        date: '20 Oct, 2024',
        tag: 'LEGAL',
        responsible: 'María Gómez',
      },
      {
        id: '3',
        name: 'Balance_General_2023.xlsx',
        type: 'xlsx',
        size: '1.1 MB',
        date: '15 Oct, 2024',
        tag: 'FINANZAS',
        responsible: 'Carlos Ruiz',
      },
      {
        id: '4',
        name: 'Balance_General_2023.xlsx',
        type: 'xlsx',
        size: '1.1 MB',
        date: '15 Oct, 2024',
        tag: 'FINANZAS',
        responsible: 'Carlos Ruiz',
      },
      {
        id: '4',
        name: 'Balance_General_2023.xlsx',
        type: 'xlsx',
        size: '1.1 MB',
        date: '15 Oct, 2024',
        tag: 'FINANZAS',
        responsible: 'Carlos Ruiz',
      }
    ];
  }
}
