import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../core/models/admin.model';
import { TableColumn, DocumentsTableComponent } from '../../shared/organisms/documents-table/documents-table.component';
import { RoleService } from '../../core/services/roles.service';
import { ButtonComponent } from "../../shared/atoms/yellow button/button.component";
import { DashboardLayoutComponent } from "../../shared/templates/dashboard-layout/dashboard-layout.component";


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ButtonComponent, DocumentsTableComponent, DashboardLayoutComponent],
  templateUrl: './roles.html',
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  tabs = [
    { label: 'Explorar', path: '/roles' }
  ];

  columns: TableColumn<Role>[] = [
    { header: 'Nombre',      field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
  ];

  constructor(
    private roleService: RoleService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error cargando rolees:', err),
    });
    console.log(this.roles)
  }

  goToEdit(role: Role) {
    this.router.navigate(['/createrol'], { state: { document: role } });
  }
}