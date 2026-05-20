import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/yellow button/button.component';
import { UserService } from '../../../core/services/users.service';

/** Validador personalizado: confirmar contraseña */
const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pass    = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pass && confirm && pass !== confirm ? { passwordMismatch: true } : null;
};

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormFieldComponent, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form: FormGroup;
  loading  = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        nombre:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email:    ['', [Validators.required, Validators.email]],
        celular:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirm:  ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
  }

  get f() { return this.form.controls as any; }
  get passwordMismatch() {
    return this.form.hasError('passwordMismatch') && this.form.get('confirm')?.touched;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading    = true;
    this.errorMsg   = '';
    this.successMsg = '';

    // La API requiere idOrganizacion e idRol; se usa 1 como valor por defecto.
    // Ajusta este valor o agrégalo como campo oculto / lógica de negocio según corresponda.
    const payload = {
      nombre:         this.form.value.nombre,
      apellido:       this.form.value.apellido,
      correo:         this.form.value.email,
      contrasena:     this.form.value.password,
      celular:        this.form.value.celular,
      idOrganizacion: 1,
      idRol:          5,
    };

    this.userService.post(payload).subscribe({
      next: () => {
        this.loading    = false;
        this.successMsg = '¡Cuenta creada! Redirigiendo al inicio de sesión...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.errorMsg = 'Ya existe una cuenta con ese correo electrónico.';
        } else if (err.status === 400) {
          this.errorMsg = 'Datos inválidos. Revisa los campos e intenta de nuevo.';
        } else {
          this.errorMsg = 'Error al crear la cuenta. Inténtalo más tarde.';
        }
      },
    });
  }
}