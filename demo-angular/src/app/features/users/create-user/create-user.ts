import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import { Organization, Role, User } from '../../../core/models/admin.model';
import { UserService } from '../../../core/services/users.service';
import { OrganizationService } from '../../../core/services/oganizations.service';
import { RoleService } from '../../../core/services/roles.service';
import { ButtonComponent } from "../../../shared/atoms/yellow button/button.component";
import { DropdownFieldLabel } from "../../../shared/molecules/dropdown-field-label/dropdown-field-label";

@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DashboardLayoutComponent,
    FormFieldComponent,
    ButtonComponent,
    DropdownFieldLabel
],
  templateUrl: './create-user.html',
})
export class CreateUserComponent implements OnInit {
  existing?: User;

  nombreControl       = new FormControl('');
  apellidoControl     = new FormControl('');
  correoControl       = new FormControl('');
  contrasenaControl   = new FormControl('');
  celularControl      = new FormControl('');
  organizacionControl = new FormControl('');
  rolControl          = new FormControl('');
  estaActivoControl   = new FormControl(true); // true = activo por defecto

  organizations: Organization[] = [];
  roles: Role[] = [];
  orgLabels: DropdownOption[] = [];
  rolLabels: DropdownOption[] = [];

  tabs = [
    { label: 'Explorar', path: '/users' },
    { label: 'Crear',    path: '/createuser' },
  ];

  constructor(
    private usersService: UserService,
    private organizacionService: OrganizationService,
    private rolService: RoleService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) {
      this.existing = state.document;
      this.nombreControl.setValue(state.document.nombre ?? '');
      this.apellidoControl.setValue(state.document.apellido ?? '');
      this.correoControl.setValue(state.document.correo ?? '');
      this.celularControl.setValue(state.document.celular ?? '');
      // Inicializar estaActivo: el modelo lo guarda como number (1/0)
      this.estaActivoControl.setValue(state.document.estaActivo);
    }

    this.organizacionService.getAll().subscribe({
      next: (data) => {
        this.organizations = data;
        this.orgLabels = data.map((o) => ({
          label: o.nombre,
          value: String(o.idOrganizacion),
        }));
        if (this.existing) {
          this.organizacionControl.setValue(String(this.existing.idOrganizacion), { emitEvent: false });
        }
        this.cdr.detectChanges();
      },
    });

    this.rolService.getAll().subscribe({
      next: (data) => {
        this.roles = data;
        this.rolLabels = data.map((r) => ({
          label: r.nombre,
          value: String(r.idRol),
        }));
        if (this.existing) {
          this.rolControl.setValue(String(this.existing.idRol), { emitEvent: false });
        }
        this.cdr.detectChanges();
      },
    });
  }

  submit() {
    if (this.existing) {
      const payload = {
        nombre:          this.nombreControl.value ?? '',
        apellido:        this.apellidoControl.value ?? '',
        celular:         this.celularControl.value ?? '',
        estaActivo:      this.estaActivoControl.value ?? true,
        idOrganizacion:  Number(this.organizacionControl.value),
        idRol:           Number(this.rolControl.value),
      };
      this.usersService.patch(this.existing.idUsuario, payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error('Error al actualizar usuario:', err),
      });
    } else {
      const payload = {
        nombre:         this.nombreControl.value ?? '',
        apellido:       this.apellidoControl.value ?? '',
        correo:         this.correoControl.value ?? '',
        contrasena:     this.contrasenaControl.value ?? '',
        celular:        this.celularControl.value ?? '',
        idOrganizacion: Number(this.organizacionControl.value),
        idRol:          Number(this.rolControl.value),
      };

      console.log('payload:', payload);

      this.usersService.post(payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error('Error al crear usuario:', err),
      });
    }
  }
}