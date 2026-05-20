import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../../core/services/document.service';
import { Router } from '@angular/router';
import { CreateDocumentRequest, DocumentType } from '../../../core/models/admin.model';
import { DocumentTypeService } from '../../../core/services/document-type.service';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import { DropdownFieldLabel } from "../../../shared/molecules/dropdown-field-label/dropdown-field-label";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-create-document',
  imports: [DashboardLayoutComponent, ButtonComponent, FormFieldComponent, ReactiveFormsModule, DropdownFieldLabel],
  templateUrl: './create-document.html',
  styleUrl: './create-document.css',
})
export class CreateDocument {
  nombreControl = new FormControl('');
  tipoControl = new FormControl('');
  descripcionControl = new FormControl('');
  types: DocumentType[] = [];
  labels: DropdownOption[] = [];
  tabs: { label: string; path: string }[] = [];

  private authService = inject(AuthService);

  constructor(
    private docService: DocumentService,
    private router: Router,
    private typeService: DocumentTypeService,
    
  ) {}

  ngOnInit() {
    this.typeService.getAllTypeDocuments().subscribe({
      next: (data) => {
        this.types = data;
        this.labels = data.map((type) => ({
          label: type.nombre,
          value: type.nombre,
        }));
      },
    });

    this.tabs = [
      { label: 'Explorar', path: `/documents` },
      { label: 'Crear', path: `/createdocuments` },
      { label: 'Versiones', path: `/versiondocuments` },
    ];
  }

  
  submit() {
    const user= this.authService.getCurrentUser();
    const payload: CreateDocumentRequest = {
      usuarioCreador: user!.correo,
      tipoDocumento: this.tipoControl.value ?? '',
      nombre: this.nombreControl.value ?? '',
      descripcion: this.descripcionControl.value ?? '',
    };

    this.docService.postDocument(payload).subscribe({
      next: () => this.router.navigate(['/documents']),
      error: (err) => console.error('Error al crear documento:', err),
    });
  }
}
