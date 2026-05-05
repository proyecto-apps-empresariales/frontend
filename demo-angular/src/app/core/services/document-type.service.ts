import { Injectable } from '@angular/core';
import { CreateDocumentRequest, DashboardStats, DocumentType, ResponseDocument } from '../models/document.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {

  private url = 'http://localhost:8080/tipoDocumento';

  constructor(private http: HttpClient) {}

  // GET/api/tipoDocuments
  getAllTypeDocuments(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(this.url);
  }

  //Create type document
  postTypeDocument(document: CreateDocumentRequest): Observable<ResponseDocument> {
    return this.http.post<ResponseDocument>(`${this.url}/crear`, document);
  }

}
