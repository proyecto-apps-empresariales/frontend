import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import {
  DocumentsTableComponent,
  TableColumn,
} from '../../../shared/organisms/documents-table/documents-table.component';
import {
  FirmaPeticionFlujo,
  HistorialPeticionFlujo,
  PeticionFlujo,
} from '../../../core/models/admin.model';
import { FlowRequestService } from '../../../core/services/flow-request.service';
import { AuthService } from '../../../core/services/auth.service';

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
  isChangingEstado = false;
  private authService = inject(AuthService);

  tabs = [
    { label: 'Procesos', path: '/process' },
    { label: 'Crear', path: '/createprocess' },
    { label: 'Tipos', path: '/typeprocess' },
    { label: 'Estados', path: '/stateprocess' },
  ];

  historialColumns: TableColumn<HistorialPeticionFlujo>[] = [
    { header: 'Editor', field: 'usuarioEditor' },
    { header: 'Fecha', field: 'fecha', transform: (v) => new Date(v).toLocaleDateString('es-CO') },
    { header: 'Descripción', field: 'descripcion' },
  ];

  firmasColumns: TableColumn<FirmaPeticionFlujo>[] = [
    { header: 'Firmador', field: 'usuarioFirmador' },
    {
      header: 'Fecha',
      field: 'fechaFirma',
      transform: (v) => new Date(v).toLocaleDateString('es-CO'),
    },
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
      next: (data) => {
        this.historial = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.historial = [];
      },
    });
  }

  private loadFirmas() {
    if (!this.proceso) return;
    this.peticionService.getFirmas(this.proceso.id).subscribe({
      next: (data) => {
        this.firmas = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
        console.log('Firmas cargadas:', this.firmas);
      },
      error: () => {
        this.firmas = [];
      },
    });
  }

  enviarRevision() {
    if (!this.proceso) return;
    this.isChangingEstado = true;
    this.peticionService.enviarRevision(this.proceso.id).subscribe({
      next: (updated) => {
        this.proceso = updated;
        this.isChangingEstado = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isChangingEstado = false;
        console.error(err);
      },
    });
  }

  aprobar() {
    if (!this.proceso) return;
    this.isChangingEstado = true;
    this.peticionService.aprobar(this.proceso.id).subscribe({
      next: (updated) => {
        this.proceso = updated;
        this.isChangingEstado = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isChangingEstado = false;
        console.error(err);
      },
    });
  }

  rechazar() {
    if (!this.proceso) return;
    this.isChangingEstado = true;
    this.peticionService.rechazar(this.proceso.id).subscribe({
      next: (updated) => {
        this.proceso = updated;
        this.isChangingEstado = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isChangingEstado = false;
        console.error(err);
      },
    });
  }

  firmar() {
    if (!this.proceso || !this.observacionControl.value) return;
    this.isFirming = true;
    const user = this.authService.getCurrentUser();

    this.peticionService
      .firmar({
        usuarioFirmador: user!.idUsuario,
        peticion: this.proceso.id,
        observacion: this.observacionControl.value,
      })
      .subscribe({
        next: () => {
          this.peticionService.firmarEstado(this.proceso!.id).subscribe({
            next: (updated) => {
              this.peticionService.finalizar(this.proceso!.id).subscribe({
                next: (finalizado) => {
                  this.proceso = finalizado;
                  this.isFirming = false;
                  this.observacionControl.setValue('');
                  this.loadFirmas();
                  this.loadHistorial();
                  this.cdr.detectChanges();
                },
                error: (err) => {
                  this.isFirming = false;
                  console.error('Error al finalizar:', err);
                },
              });
            },
            error: (err) => {
              this.isFirming = false;
              console.error('Error al cambiar estado a firmado:', err);
            },
          });
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
