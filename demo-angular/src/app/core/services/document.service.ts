import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentRequest, ResponseDocument } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private url = 'http://localhost:8080/documentos';

  constructor(private http: HttpClient) {}

  getAllRecentDocuments(): Observable<ResponseDocument[]> {
    return this.http.get<ResponseDocument[]>(this.url);
  }

  postDocument(document: CreateDocumentRequest): Observable<ResponseDocument> {
    return this.http.post<ResponseDocument>(`${this.url}/crear`, document);
  }
  
  getDocumentsByUsuario(correo: string): Observable<ResponseDocument[]> {
  return this.http.get<ResponseDocument[]>(`${this.url}/creado`, {
    params: { usuario: correo },
  });
}
}