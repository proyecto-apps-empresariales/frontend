import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/admin.model';
import { TableColumn, DocumentsTableComponent } from '../../shared/organisms/documents-table/documents-table.component';
import { UserService } from '../../core/services/users.service';
import { ButtonComponent } from "../../shared/atoms/yellow button/button.component";
import { DashboardLayoutComponent } from "../../shared/templates/dashboard-layout/dashboard-layout.component";


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [DocumentsTableComponent, ButtonComponent, DashboardLayoutComponent],
  templateUrl: './users.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  tabs = [
    { label: 'Explorar', path: '/users' },
    { label: 'Crear',    path: '/createuser' },
  ];

  columns: TableColumn<User>[] = [
    { header: 'Nombre',       field: 'nombre' },
    { header: 'Apellido',     field: 'apellido' },
    { header: 'Correo',       field: 'correo' },
    { header: 'Celular',      field: 'celular' },
    { header: 'Organización', field: 'nombreOrganizacion' },
    { header: 'Rol',          field: 'nombreRol' },
    { header: 'Activo',       field: 'estaActivo', transform: (v) => v ? 'Sí' : 'No' },
    { header: 'Creación',     field: 'fechaCreacion', transform: (v) => new Date(v).toLocaleDateString('es-CO') },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error cargando users:', err),
    });
    console.log(this.users)
  }

  goToCreate() {
    this.router.navigate(['/createuser']);
  }

  goToEdit(user: User) {
    this.router.navigate(['/createuser'], { state: { document: user } });
  }
}