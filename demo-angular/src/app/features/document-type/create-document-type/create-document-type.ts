import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import {
  CreateDocumentTypeInterface,
  DocumentRequirements,
  DocumentType,
} from '../../../core/models/admin.model';
import { DocumentTypeService } from '../../../core/services/document-type.service';
import { RequirementDocsService } from '../../../core/services/requirement-doc.service';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { DropdownFieldLabel } from '../../../shared/molecules/dropdown-field-label/dropdown-field-label';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { CheckboxComponent } from '../../../shared/atoms/checkbox/checkbox';

@Component({
  selector: 'app-create-document-type',
  imports: [
    DashboardLayoutComponent,
    FormFieldComponent,
    DropdownFieldLabel,
    ButtonComponent,
    CheckboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-document-type.html',
  styleUrl: './create-document-type.css',
})
export class CreateDocumentType implements OnInit {
  requirementsForm = new FormGroup({}); // 👈 arriba del todo
  nombreControl = new FormControl('');
  descripcionControl = new FormControl('');
  requirements: DocumentRequirements[] = [];
  labels: DropdownOption[] = [];
  tabs: { label: string; path: string }[] = [];
  existingType?: DocumentType;

  constructor(
    private requirementsService: RequirementDocsService,
    private router: Router,
    private typeService: DocumentTypeService,
    private cdr: ChangeDetectorRef, // 👈
  ) {}

  ngOnInit() {
    const state = history.state;
    this.existingType = state?.document ?? undefined;
    this.nombreControl.setValue(state?.document?.nombre ?? '');
    this.descripcionControl.setValue(state?.document?.descripcion ?? '');

    this.requirementsService.getAllRequirements().subscribe({
      next: (data) => {
        this.requirements = data;
        data.forEach((req) => {
          const isChecked = this.existingType?.requerimientos?.some(
            (r) => r.nombre === req.nombre
          ) ?? false;
          this.requirementsForm.addControl(req.nombre, new FormControl(isChecked));
        });
        this.cdr.detectChanges();
      },
    });

    this.tabs = [
      { label: 'Explorar', path: '/templates' },
      { label: 'Crear/Editar', path: '/createtemplates' },
    ];
  }

  getSelectedRequirements(): string[] {
    return Object.entries(this.requirementsForm.value)
      .filter(([_, checked]) => checked)
      .map(([nombre]) => nombre);
  }

  submit() {
     const payload: CreateDocumentTypeInterface = {
      nombre: this.nombreControl.value ?? '',
      descripcion: this.descripcionControl.value ?? '',
      requerimientos: this.getSelectedRequirements(),
    };

    const request$ = this.existingType
      ? this.typeService.patchTypeDocument(this.existingType.id, payload)
      : this.typeService.postTypeDocument(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/documentstypes']),
      error: (err) => console.error('Error al guardar tipo de documento:', err),
    });
  }
}
