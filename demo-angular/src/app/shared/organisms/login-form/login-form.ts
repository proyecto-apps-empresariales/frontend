import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/yellow button/button.component';
import { UserService } from '../../../core/services/users.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormFieldComponent, ButtonComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {
  form: FormGroup;
  loading  = false;
  errorMsg = '';

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get f() {
    return this.form.controls as any;
  }

  ngOnInit() {
    if (this.isBrowser && this.authService.isAuthenticated()) {
      this.router.navigate(['/documents']);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const { email, password } = this.form.value;

    this.userService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/documents']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMsg = 'Contraseña incorrecta. Inténtalo de nuevo.';
        } else if (err.status === 403) {
          this.errorMsg = 'Usuario inactivo o sin permisos.';
        } else if (err.status === 404) {
          this.errorMsg = 'No existe una cuenta con ese correo.';
        } else {
          this.errorMsg = 'Error al iniciar sesión. Inténtalo más tarde.';
        }
      },
    });
  }
}