import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionFlujo } from '../../core/models/admin.model';
import {
  TableColumn,
  DocumentsTableComponent,
} from '../../shared/organisms/documents-table/documents-table.component';
import { FlowRequestService } from '../../core/services/flow-request.service';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [DocumentsTableComponent, ButtonComponent, DashboardLayoutComponent],
  templateUrl: './process.html',
})
export class ProcesosComponent implements OnInit {
  procesos: PeticionFlujo[] = [];
  private authService = inject(AuthService);
  isAdmin = this.authService.isAdmin();
  isViewer = this.authService.isViewer();
  user = this.authService.getCurrentUser();

  tabs = [
    { label: 'Procesos', path: '/process' },
    ...(!this.isViewer ? [{ label: 'Crear/Editar', path: '/createprocess' }] : []),
    ...(this.isAdmin? [{ label: 'Tipos', path: '/typeprocess' }] : []),
    ...(!this.isViewer ? [{ label: 'Estados', path: '/stateprocess' }] : []),
  ];

  columns: TableColumn<PeticionFlujo>[] = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Remitente', field: 'remitente' },
    { header: 'Destinatario', field: 'destinatario' },
    { header: 'Tipo', field: 'tipoPeticion' },
    { header: 'Estado', field: 'estado' },
    { header: 'Documento', field: 'nombreDocumento' },
    {
      header: 'Inicio',
      field: 'fechaInicio',
      transform: (v) => new Date(v).toLocaleDateString('es-CO'),
    },
    {
      header: 'Vigencia',
      field: 'fechaFin',
      transform: (v) => new Date(v).toLocaleDateString('es-CO'),
    },
  ];

  constructor(
    private peticionService: FlowRequestService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.peticionService.getAll().subscribe({
      next: (data) => (this.procesos = data),
      error: (err) => console.error('Error cargando procesos:', err),
    });
    console.log(this.procesos);
  }

  goToCreate() {
    this.router.navigate(['/createprocess']);
  }

  goToDetail(proceso: PeticionFlujo) {
    this.router.navigate(['/process'], { state: { document: proceso } });
  }
}
