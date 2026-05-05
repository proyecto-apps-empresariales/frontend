import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnChanges {

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() val: string = '';

  value: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  // ← Cuando @Input() val cambia desde el padre, actualiza el value
  ngOnChanges(changes: SimpleChanges) {
    if (changes['val'] && !changes['val'].firstChange === false || changes['val']?.currentValue !== undefined) {
      this.value = changes['val'].currentValue ?? '';
    }
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }
}