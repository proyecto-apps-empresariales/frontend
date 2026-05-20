import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import {
  DocumentsTableComponent,
  TableColumn,
} from '../../../shared/organisms/documents-table/documents-table.component';
import { EstadoPeticionFlujo } from '../../../core/models/admin.model';
import { RequestStateService } from '../../../core/services/flow-request-extras.service';

@Component({
  selector: 'app-estados-proceso',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    FormFieldComponent,
    ButtonComponent,
    DocumentsTableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './state-process.html',
})
export class EstadosProcesoComponent implements OnInit {
  existing?: EstadoPeticionFlujo;
  estados: EstadoPeticionFlujo[] = [];

  nombreControl = new FormControl('');
  descripcionControl = new FormControl('');

  tabs = [
    { label: 'Procesos', path: '/process' },
    { label: 'Crear', path: '/createprocess' },
    { label: 'Tipos', path: '/typeprocess' },
    { label: 'Estados', path: '/stateprocess' },
  ];

  columns: TableColumn<EstadoPeticionFlujo>[] = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
  ];

  constructor(
    private estadoService: RequestStateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadEstados();
  }

  setValues = (doc:any): void => {
    if (doc) {
      this.existing = doc;
      this.nombreControl.setValue(doc.nombre ?? '');
      this.descripcionControl.setValue(doc.descripcion ?? '');
    }
  };

  private loadEstados() {
    this.estadoService.getAll().subscribe({
      next: (data) => {
        this.estados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando estados:', err),
    });
  }

  goToEdit(estado: EstadoPeticionFlujo) {
    this.existing = estado;
    this.nombreControl.setValue(estado.nombre);
    this.descripcionControl.setValue(estado.descripcion);
  }

  cancel() {
    this.existing = undefined;
    this.nombreControl.setValue('');
    this.descripcionControl.setValue('');
  }

  submit() {
    const payload = {
      nombre: this.nombreControl.value ?? '',
      descripcion: this.descripcionControl.value ?? '',
    };

    const request$ = this.existing
      ? this.estadoService.patch(this.existing.id, payload)
      : this.estadoService.post(payload);

    request$.subscribe({
      next: () => {
        this.cancel();
        this.loadEstados();
      },
      error: (err) => console.error('Error al guardar estado:', err),
    });
  }
}
