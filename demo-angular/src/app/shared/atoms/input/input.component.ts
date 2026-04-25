import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent), // 👈 registra el componente como value accessor
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  //Parametros

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = ''; // emoji o texto SVG
  @Input() showToggle: boolean = false; // para contraseñas

  value: string = '';
  showPassword: boolean = false;

  //Funcionar que determina el type
  get inputType(): string {
    if (this.type === 'password')
      return this.showPassword ? 'text' : 'password';
    return this.type;
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  //Metodos del contrato para que el input sea parte de angular forms
  writeValue(val: string) { this.value = val || ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  onInput(event: Event) {
  this.value = (event.target as HTMLInputElement).value;
  this.onChange(this.value);
}
}
