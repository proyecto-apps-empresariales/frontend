import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentRequest, DashboardStats, ResponseDocument } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private url = 'http://localhost:8080/documentos';

  constructor(private http: HttpClient) {}

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

  getAllRecentDocuments(): Observable<ResponseDocument[]> {
    return this.http.get<ResponseDocument[]>(this.url);
  }

  postDocument(document: CreateDocumentRequest): Observable<ResponseDocument> {
    return this.http.post<ResponseDocument>(`${this.url}/crear`, document);
  }
}