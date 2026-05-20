import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../../core/models/admin.model';
import { OrganizationService } from '../../core/services/oganizations.service';
import { TableColumn, DocumentsTableComponent } from '../../shared/organisms/documents-table/documents-table.component';
import { DashboardLayoutComponent } from "../../shared/templates/dashboard-layout/dashboard-layout.component";
import { ButtonComponent } from "../../shared/atoms/yellow button/button.component";


@Component({
  selector: 'app-organizaciones',
  standalone: true,
  imports: [DashboardLayoutComponent, DocumentsTableComponent, ButtonComponent],
  templateUrl: './organization.html',
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];

  tabs = [
    { label: 'Explorar', path: '/organizations' },
    { label: 'Crear',          path: '/createorganization' },
  ];

  columns: TableColumn<Organization>[] = [
    { header: 'Nombre',      field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
    { header: 'Creación',    field: 'fechaCreacion', transform: (v) => new Date(v).toLocaleDateString('es-CO') },
  ];

  constructor(
    private OrganizationService: OrganizationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.OrganizationService.getAll().subscribe({
      next: (data) => (this.organizations = data),
      error: (err) => console.error('Error cargando Organizationes:', err),
    });
    console.log(this.organizations);
  }

  goToCreate() {
    this.router.navigate(['/createorganization']);
  }

  goToEdit(org: Organization) {
    this.router.navigate(['/createorganization'], { state: { document: org } });
  }
}