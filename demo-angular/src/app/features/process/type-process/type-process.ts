import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { CheckboxComponent } from '../../../shared/atoms/checkbox/checkbox';
import { DocumentsTableComponent, TableColumn } from '../../../shared/organisms/documents-table/documents-table.component';

import { FileField } from '../../../shared/atoms/file-field/file-field';
import { UploadService } from '../../../core/services/upload.service';
import { RequerimientoPeticion, TipoPeticionFlujo } from '../../../core/models/admin.model';
import { RequestRequirementService, RequestTypeService } from '../../../core/services/flow-request-extras.service';

@Component({
  selector: 'app-tipos-proceso',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    FormFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DocumentsTableComponent,
    FileField,
    ReactiveFormsModule,
  ],
  templateUrl: './type-process.html',
})
export class TiposProcesoComponent implements OnInit {
  existing?: TipoPeticionFlujo;
  tipos: TipoPeticionFlujo[] = [];
  requerimientos: RequerimientoPeticion[] = [];
  requerimientosForm = new FormGroup({});
  selectedFile?: File;
  isUploading = false;

  nombreControl      = new FormControl('');
  descripcionControl = new FormControl('');

  tabs = [
    { label: 'Procesos',      path: '/process' },
    { label: 'Crear',         path: '/createprocess' },
    { label: 'Tipos',         path: '/typeprocess' },
    { label: 'Estados',       path: '/stateprocess' },
  ];

  columns: TableColumn<TipoPeticionFlujo>[] = [
    { header: 'Nombre',      field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
  ];

  constructor(
    private tipoService: RequestTypeService,
    private requerimientoService: RequestRequirementService,
    private uploadService: UploadService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) {
      this.existing = state.document;
      this.nombreControl.setValue(state.document.nombre ?? '');
      this.descripcionControl.setValue(state.document.descripcion ?? '');
    }

    this.tipoService.getAll().subscribe({
      next: (data) => { this.tipos = data; this.cdr.detectChanges(); },
    });

    this.requerimientoService.getAll().subscribe({
      next: (data) => {
        this.requerimientos = data;
        data.forEach((req) => {
          const isChecked = this.existing?.requerimientos?.includes(req.nombre) ?? false;
          this.requerimientosForm.addControl(req.nombre, new FormControl(isChecked));
        });
        this.cdr.detectChanges();
      },
    });
  }

  getSelectedRequerimientos(): string[] {
    return Object.entries(this.requerimientosForm.value)
      .filter(([_, checked]) => checked)
      .map(([nombre]) => nombre);
  }

  onFileSelected(files: File[]) {
    this.selectedFile = files[0];
  }

  goToEdit(tipo: TipoPeticionFlujo) {
    this.router.navigate(['/tiposproceso'], { state: { document: tipo } });
  }

    setValues = (doc:any): void => {
    if (doc) {
      this.existing = doc;
      this.nombreControl.setValue(doc.nombre ?? '');
      this.descripcionControl.setValue(doc.descripcion ?? '');
    }
  };

  submit() {
    const doSubmit = (instruccionesPdf?: string) => {
      const payload = {
        nombre:          this.nombreControl.value ?? '',
        descripcion:     this.descripcionControl.value ?? '',
        instruccionesPdf: instruccionesPdf ?? this.existing?.instruccionesPdf ?? '',
        requerimientos:  this.getSelectedRequerimientos(),
      };

      const request$ = this.existing
        ? this.tipoService.patch(this.existing.id, payload)
        : this.tipoService.post(payload);

      request$.subscribe({
        next: () => {
          this.isUploading = false;
          this.tipoService.getAll().subscribe({ next: (data) => { this.tipos = data; this.cdr.detectChanges(); } });
          this.existing = undefined;
          this.nombreControl.setValue('');
          this.descripcionControl.setValue('');
        },
        error: (err) => { this.isUploading = false; console.error('Error:', err); },
      });
    };

    if (this.selectedFile) {
      this.isUploading = true;
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (url) => doSubmit(url),
        error: (err) => { this.isUploading = false; console.error('Error subiendo archivo:', err); },
      });
    } else {
      doSubmit();
    }
  }
}