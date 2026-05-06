import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gray-button',
  imports: [],
  templateUrl: './gray-button.html',
  styleUrl: './gray-button.css',
})
export class GrayButton {
  @Input() type: string = 'button';
}
