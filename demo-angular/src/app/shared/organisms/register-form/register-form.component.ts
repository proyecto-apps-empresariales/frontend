import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';

@Component({
  selector: 'app-register-form',
  imports: [ButtonComponent, FormFieldComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  form: FormGroup;

  //Constructor del formulario
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm:  ['', Validators.required],
    });
  }

   onSubmit() {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    }
  }

  get f() { return this.form.controls as any; }

}
