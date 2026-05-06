import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownField, DropdownOption } from "../../atoms/dropdown-field/dropdown-field";

@Component({
  selector: 'app-dropdown-field-label',
  imports: [CommonModule, ReactiveFormsModule, DropdownField],
  templateUrl: './dropdown-field-label.html',
  styleUrl: './dropdown-field-label.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFieldLabel),
      multi: true,
    },
  ],
})
export class DropdownFieldLabel implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() options: DropdownOption[] = [];
  @Input() endpoint: string = '';
  @Input() labelKey: string = 'name';
  @Input() valueKey: string = 'id';

  internalControl = new FormControl('');
  isLoading = false;
  hasError = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.endpoint) this.loadOptions();

    this.internalControl.valueChanges.subscribe(val => {
      console.log('MOLECULE recibe:', val);
      this.onChange(val);
      this.onTouched();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['options'] && changes['options'].currentValue?.length > 0) {
    const current = this.internalControl.value;
    if (current) {
      // Re-aplica el valor para que el atom lo resuelva con las opciones ya cargadas
        this.internalControl.setValue('', { emitEvent: false });
        this.internalControl.setValue(current, { emitEvent: false });
    }
  }
}

  writeValue(val: string) { 
    this.internalControl.setValue(val, { emitEvent: false }); 
  }

  registerOnChange(fn: (val: any) => void) { 
    this.onChange = fn; 
  }

  registerOnTouched(fn: () => void) { 
    this.onTouched = fn; 
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.internalControl.disable() : this.internalControl.enable();
  }

  private loadOptions() {
    this.isLoading = true;
    this.hasError = false;

    this.http.get<any[]>(this.endpoint).subscribe({
      next: (data) => {
        this.options = data.map(item => ({
          label: item[this.labelKey],
          value: (item[this.valueKey]),
        }));
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  retry() { this.loadOptions(); }
}