import { Component } from '@angular/core';
import { FormFieldComponent } from "../../molecules/form-field/form-field.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormFieldComponent, ButtonComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  form: FormGroup;

  //Constructor del formulario
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

   onSubmit() {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    }
  }

  get f() { return this.form.controls as any; }
}
