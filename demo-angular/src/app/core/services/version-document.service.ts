import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentRequest, CreateDocumentVersion, DocumentVersion, ResponseDocument } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class VersionService {
  private url = 'http://localhost:8080/versiones';

  constructor(private http: HttpClient) {}

  getAllversionsDoc(): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(this.url);
  }

  postVersion(document: CreateDocumentVersion): Observable<DocumentVersion> {
    return this.http.post<DocumentVersion>(`${this.url}/crear`, document);
  }
}