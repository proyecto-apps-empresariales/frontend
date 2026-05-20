import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { User } from '../../../core/models/admin.model';
import { UserService } from '../../../core/services/users.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardLayoutComponent,
    FormFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
  /** Usuario activo cargado desde history.state o localStorage */
  user?: User;

  // ── Pestaña activa: 'profile' | 'password' ──────────────────────────────────
  activeTab: 'profile' | 'password' = 'profile';

  // ── Controles — datos básicos ────────────────────────────────────────────────
  nombreControl = new FormControl('');
  apellidoControl = new FormControl('');
  celularControl = new FormControl('');

  // ── Controles — cambiar contraseña ──────────────────────────────────────────
  contrasenaActualControl = new FormControl('');
  contrasenaNuevaControl = new FormControl('');
  contrasenaConfirmacionControl = new FormControl('');

  // ── Mensajes de feedback ─────────────────────────────────────────────────────
  profileSuccess = false;
  profileError = '';
  passwordSuccess = false;
  passwordError = '';

  tabs = [
    { label: 'Mi Perfil', path: '/editprofile' },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) this.user = JSON.parse(stored);

    if (this.user) {
      this.nombreControl.setValue(this.user.nombre ?? '');
      this.apellidoControl.setValue(this.user.apellido ?? '');
      this.celularControl.setValue(this.user.celular ?? '');
    }
  }

  // ── Guardar datos básicos ────────────────────────────────────────────────────
  submitProfile(): void {
    if (!this.user) return;

    this.profileSuccess = false;
    this.profileError = '';

    const payload = {
      nombre: this.nombreControl.value ?? '',
      apellido: this.apellidoControl.value ?? '',
      celular: this.celularControl.value ?? '',
    };

    this.userService.patch(this.user.idUsuario, payload).subscribe({
      next: (updated) => {
        this.profileSuccess = true;
        // Persiste el usuario actualizado
        const merged = { ...this.user, ...updated };
        localStorage.setItem('currentUser', JSON.stringify(merged));
        this.user = merged;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.profileError = 'Ocurrió un error al actualizar el perfil.';
        console.error('Error al actualizar perfil:', err);
        this.cdr.detectChanges();
      },
    });
  }

  // ── Cambiar contraseña ───────────────────────────────────────────────────────
  submitPassword(): void {
    if (!this.user) return;

    this.passwordSuccess = false;
    this.passwordError = '';

    const nueva = this.contrasenaNuevaControl.value ?? '';
    const confirmacion = this.contrasenaConfirmacionControl.value ?? '';

    if (nueva !== confirmacion) {
      this.passwordError = 'La nueva contraseña y su confirmación no coinciden.';
      return;
    }

    if (nueva.length < 3) {
      this.passwordError = 'La contraseña debe tener al menos 3 caracteres.';
      return;
    }

    const payload = {
      idUsuario: this.user.idUsuario,
      contrasenaActual: this.contrasenaActualControl.value ?? '',
      contrasenaNueva: nueva,
      contrasenaConfirmacion: confirmacion,
    };

    this.userService.updateContrasena(payload).subscribe({
      next: () => {
        this.passwordSuccess = true;
        this.contrasenaActualControl.setValue('');
        this.contrasenaNuevaControl.setValue('');
        this.contrasenaConfirmacionControl.setValue('');
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          this.passwordError = 'La contraseña actual es incorrecta.';
        } else if (err.status === 400) {
          this.passwordError = 'Datos inválidos. Revisa los campos e intenta de nuevo.';
        } else {
          this.passwordError = 'Ocurrió un error al cambiar la contraseña.';
        }
        console.error('Error al cambiar contraseña:', err);
        this.cdr.detectChanges();
      },
    });
  }

  setTab(tab: 'profile' | 'password'): void {
    this.activeTab = tab;
    this.profileSuccess = false;
    this.profileError = '';
    this.passwordSuccess = false;
    this.passwordError = '';
  }
}
