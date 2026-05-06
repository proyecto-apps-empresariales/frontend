import {
  Component,
  forwardRef,
  Input,
  HostListener,
  ElementRef,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  label: string;
  value: number | string;
}

@Component({
  selector: 'app-dropdown-field',
  imports: [CommonModule],
  templateUrl: './dropdown-field.html',
  styleUrl: './dropdown-field.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownField),
      multi: true,
    },
  ],
})
export class DropdownField implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() icon: string = '';

  selected: DropdownOption | null = null;
  isOpen = false;
  isDisabled = false;
  pendingValue: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private elRef: ElementRef) {}

  // Cierra el dropdown si el click fue fuera del componente
  @HostListener('document:click', ['$event'])
  onClickOutside(e: MouseEvent) {
    if (!this.elRef.nativeElement.contains(e.target)) {
      this.isOpen = false;
    }
  }

  toggle() {
    if (!this.isDisabled) this.isOpen = !this.isOpen;
  }

  select(option: DropdownOption) {
    this.selected = option;
    this.isOpen = false;
    this.onChange(option.value);
    this.onTouched();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.pendingValue) {
      this.selected = this.options.find((o) => o.value === this.pendingValue) ?? null;
    }
  }

  writeValue(val: string) {
    this.pendingValue = val ?? '';
    this.selected = this.options.find((o) => o.value === val) ?? null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }
}
