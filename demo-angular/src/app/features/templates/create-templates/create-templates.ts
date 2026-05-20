import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { DropdownFieldLabel } from '../../../shared/molecules/dropdown-field-label/dropdown-field-label';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { FileField } from '../../../shared/atoms/file-field/file-field';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { CreateTemplateInterface, DocumentType, TemplateInterface } from '../../../core/models/admin.model';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DocumentTypeService } from '../../../core/services/document-type.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../core/services/upload.service';
import { TemplateService } from '../../../core/services/template.service';

@Component({
  selector: 'app-create-templates',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    DropdownFieldLabel,
    FormFieldComponent,
    FileField,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-templates.html',
})
export class CreateTemplates implements OnInit {
  @Input() type?: DocumentType;

  types: DocumentType[] = [];
  templates: TemplateInterface[] = [];
  labels: DropdownOption[] = [];
  selectedType?: DocumentType;
  selectedFile?: File;
  isUploading = false;

  typeControl = new FormControl('');
  descripcionControl = new FormControl('');

  tabs: { label: string; path: string }[] = [
      { label: 'Explorar', path: '/templates' },
      { label: 'Crear/Editar', path: '/createtemplates' }
  ];

  constructor(
    private docTypeService: DocumentTypeService,
    private uploadService: UploadService,
    private templateService: TemplateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) this.type = state.document;

    this.templateService.getAllTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;

        this.docTypeService.getAllTypeDocuments().subscribe({
          next: (types) => {
            this.types = types;
            this.labels = types.map((t) => ({
              label: t.nombre,
              value: String(t.id),
            }));

            if (this.type) {
              this.selectedType = this.type;
              this.typeControl.setValue(String(this.type.id), { emitEvent: false });

              const existing = this.findExistingTemplate(this.type.nombre);
              if (existing) this.descripcionControl.setValue(existing.descripcion);

              this.cdr.detectChanges();
            }

            this.typeControl.valueChanges.subscribe((id) => {
              this.selectedType = this.types.find((t) => String(t.id) === id);
              const existing = this.findExistingTemplate(this.selectedType?.nombre ?? '');
              if (existing) this.descripcionControl.setValue(existing.descripcion);
              else this.descripcionControl.setValue('');
              this.cdr.detectChanges();
            });
          },
        });
      },
    });
  }

  private findExistingTemplate(tipoDocumento: string): TemplateInterface | undefined {
    return this.templates.find((t) => t.tipoDocumento === tipoDocumento);
  }

  onFileSelected(files: File[]) {
    this.selectedFile = files[0];
  }

  submit() {
    if (!this.selectedType) {
      console.error('Selecciona un tipo de documento');
      return;
    }
    if (!this.selectedFile) {
      console.error('Selecciona un archivo');
      return;
    }

    this.isUploading = true;

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: (archivoUrl) => {
        const payload: CreateTemplateInterface = {
          tipoDocumento: this.selectedType!.nombre,
          descripcion: this.descripcionControl.value ?? '',
          archivoUrl,
        };

        const existing = this.findExistingTemplate(this.selectedType!.nombre);
        const request$ = existing
          ? this.templateService.patchTemplate(payload, Number(existing.id))
          : this.templateService.postTemplate(payload);

        request$.subscribe({
          next: () => {
            this.isUploading = false;
            this.router.navigate(['/templates']);
          },
          error: (err) => {
            this.isUploading = false;
            console.error('Error al guardar template:', err);
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