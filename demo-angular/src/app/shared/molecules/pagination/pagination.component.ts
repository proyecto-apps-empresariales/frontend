import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() current = 1;
  @Input() total = 42;
  @Input() showing = 3;
  @Input() totalDocs = 1240;

  pages = [1, 2, 3];
}
