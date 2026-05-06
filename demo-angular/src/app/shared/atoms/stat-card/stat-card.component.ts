import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css'],
})
export class StatCardComponent {
  @Input() value: number | string = 0;
  @Input() label = '';
  @Input() icon?: string;
  @Input() variant: 'default' | 'primary' | 'accent' = 'default';
  @Input() subLabel?: string;
  @Input() growth?: number;
  @Input() extraRows: { label: string; value: number | string }[] = [];
}
