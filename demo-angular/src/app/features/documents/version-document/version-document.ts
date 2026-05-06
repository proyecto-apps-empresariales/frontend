import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import {
  CreateDocumentVersion,
  DocumentVersion,
  ResponseDocument,
} from '../../../core/models/document.model';
import { FileField } from '../../../shared/atoms/file-field/file-field';
import { DropdownFieldLabel } from '../../../shared/molecules/dropdown-field-label/dropdown-field-label';
import { DocumentService } from '../../../core/services/document.service';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  DocumentsTableComponent,
  TableColumn,
} from '../../../shared/organisms/documents-table/documents-table.component';
import { VersionService } from '../../../core/services/version-document.service';
import { Router } from '@angular/router';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-version-document',
  imports: [
    DashboardLayoutComponent,
    ButtonComponent,
    FileField,
    DropdownFieldLabel,
    DocumentsTableComponent,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
  templateUrl: './version-document.html',
  styleUrl: './version-document.css',
})
export class VersionDocument implements OnInit {
  @Input() document?: ResponseDocument;
  documents: ResponseDocument[] = [];
  versions: DocumentVersion[] = [];
  labels: DropdownOption[] = [];
  selectedFile?: File;
  isUploading = false;

  documentControl = new FormControl('');
  descripcionControl = new FormControl('');

  tabs: { label: string; path: string }[] = [];

  versionColumns: TableColumn<DocumentVersion>[] = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
    { header: 'Actualizador', field: 'usuarioActualizador' },
    {
      header: 'Fecha',
      field: 'fechaActualizacion',
      transform: (v) => new Date(v).toLocaleDateString('es-CO'),
    },
    { header: 'Archivo', field: 'archivoUrl' },
  ];

  constructor(
    private docService: DocumentService,
    private versionService: VersionService,
    private uploadService: UploadService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit() {
  const state = history.state;
  if (state?.document) this.document = state.document;

  this.docService.getAllRecentDocuments().subscribe({
    next: (data) => {
      this.documents = data;
      this.labels = data.map((doc) => ({
        label: doc.nombre,
        value: String(doc.id),
      }));

      if (this.document) {
        this.versions = this.document.versiones || [];
        this.documentControl.setValue(String(this.document!.id), { emitEvent: false });
        this.cdr.detectChanges();
      }

      this.documentControl.valueChanges.subscribe((id) => {
        this.document = this.documents.find((d) => String(d.id) === id);
        this.versions = this.document?.versiones || [];
        this.cdr.detectChanges();
      });
    },
  });

  this.tabs = [
    { label: 'docuCMB',   path: '/docucmb' },
    { label: 'Explorar',  path: '/documents' },
    { label: 'Crear',     path: '/createdocuments' },
    { label: 'Versiones', path: '/versiondocuments' },
  ];
}

  onFileSelected(files: File[]) {
    this.selectedFile = files[0];
  }

  //Agregar version al documento seleccionado
  submit() {
    if (!this.document) {
      console.error('Selecciona un documento');
      return;
    }
    if (!this.selectedFile) {
      console.error('Selecciona un archivo');
      return;
    }

    this.isUploading = true;

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: (archivoUrl) => {
        const payload: CreateDocumentVersion = {
          usuarioActualizador: 'camila@correo.com',
          documento: this.document!.nombre,
          descripcion: this.descripcionControl.value ?? '',
          fechaActualizacion: new Date().toISOString().split('T')[0],
          archivoUrl,
        };

        this.versionService.postVersion(payload).subscribe({
          next: () => {
            this.isUploading = false;
            this.router.navigate(['/documents']);
          },
          error: (err) => {
            this.isUploading = false;
            console.error('Error al crear version:', err);
          },
        });
      },
      error: (err) => {
        this.isUploading = false;
        console.error('Error al subir archivo:', err);
      },
    });
  }
}
