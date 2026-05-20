import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { DocumentsTableComponent, TableColumn } from '../../../shared/organisms/documents-table/documents-table.component';
import { FirmaPeticionFlujo, HistorialPeticionFlujo, PeticionFlujo } from '../../../core/models/admin.model';
import { RequestTypeService } from '../../../core/services/flow-request-extras.service';
import { FlowRequestService } from '../../../core/services/flow-request.service';


@Component({
  selector: 'app-detail-proceso',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutComponent,
    ButtonComponent,
    FormFieldComponent,
    DocumentsTableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './detail-process.html',
})
export class DetailProcesoComponent implements OnInit {
  proceso?: PeticionFlujo;
  historial: HistorialPeticionFlujo[] = [];
  firmas: FirmaPeticionFlujo[] = [];
  observacionControl = new FormControl('');
  isFirming = false;

  tabs = [
    { label: 'Procesos',      path: '/process' },
    { label: 'Crear',         path: '/createprocess' },
    { label: 'Tipos',         path: '/typeprocess' },
    { label: 'Estados',       path: '/stateprocess' },
  ];

  historialColumns: TableColumn<HistorialPeticionFlujo>[] = [
    { header: 'Editor',      field: 'usuarioEditor' },
    { header: 'Fecha',       field: 'fecha', transform: (v) => new Date(v).toLocaleDateString('es-CO') },
    { header: 'Descripción', field: 'descripcion' },
  ];

  firmasColumns: TableColumn<FirmaPeticionFlujo>[] = [
    { header: 'Firmador',    field: 'usuarioFirmador' },
    { header: 'Fecha',       field: 'fechaFirma', transform: (v) => new Date(v).toLocaleDateString('es-CO') },
    { header: 'Observación', field: 'observacion' },
  ];

  constructor(
    private peticionService: FlowRequestService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) {
      this.proceso = state.document;
      this.loadHistorial();
      this.loadFirmas();
    } else {
      this.router.navigate(['/process']);
    }
  }

  private loadHistorial() {
    if (!this.proceso) return;
    this.peticionService.getHistorial(this.proceso.id).subscribe({
      next: (data) => { this.historial = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Error cargando historial:', err),
    });
  }

  private loadFirmas() {
    if (!this.proceso) return;
    this.peticionService.getFirmas(this.proceso.id).subscribe({
      next: (data) => { this.firmas = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Error cargando firmas:', err),
    });
  }

  firmar() {
    if (!this.proceso || !this.observacionControl.value) return;
    this.isFirming = true;

    this.peticionService.firmar({
      usuarioFirmador: 1, // TODO: reemplazar con usuario autenticado
      peticion: this.proceso.id,
      observacion: this.observacionControl.value,
    }).subscribe({
      next: () => {
        this.isFirming = false;
        this.observacionControl.setValue('');
        this.loadFirmas();
        this.loadHistorial();
      },
      error: (err) => {
        this.isFirming = false;
        console.error('Error al firmar:', err);
      },
    });
  }

  goToEdit() {
    this.router.navigate(['/createprocess'], { state: { document: this.proceso } });
  }
}