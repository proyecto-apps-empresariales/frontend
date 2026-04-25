import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule,InputComponent, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
})

export class FormFieldComponent {
  //Parametros
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() showToggle: boolean = false;
  @Input() control!: FormControl;
}
