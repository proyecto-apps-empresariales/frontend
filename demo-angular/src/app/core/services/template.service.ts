import { Injectable } from '@angular/core';
import { CreateDocumentRequest, CreateDocumentTypeInterface, CreateTemplateInterface, DocumentType, ResponseDocument, TemplateInterface } from '../models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateService {

  private url = 'http://localhost:8080/plantillaDocumento';

  constructor(private http: HttpClient) {}

  // GET/api/plantillas
  getAllTemplates(): Observable<TemplateInterface[]> {
    return this.http.get<TemplateInterface[]>(this.url);
  }

  //Create template
  postTemplate(document: CreateTemplateInterface): Observable<TemplateInterface> {
    return this.http.post<TemplateInterface>(`${this.url}/crear`, document);
  }

   //Create template
  patchTemplate(document: CreateTemplateInterface, id:number): Observable<TemplateInterface> {
    return this.http.patch<TemplateInterface>(`${this.url}/update/${id}`, document);
  }

}
