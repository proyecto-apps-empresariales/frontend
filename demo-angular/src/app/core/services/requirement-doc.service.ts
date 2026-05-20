import { Injectable } from '@angular/core';
import { CreateDocumentRequest, DocumentRequirements, DocumentType, ResponseDocument } from '../models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequirementDocsService {

  private url = 'http://localhost:8080/requerimientoDocumento';

  constructor(private http: HttpClient) {}

  // GET/api/requirementsDoc
  getAllRequirements(): Observable<DocumentRequirements[]> {
    return this.http.get<DocumentRequirements[]>(this.url);
  }

}
