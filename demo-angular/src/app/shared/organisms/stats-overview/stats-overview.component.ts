import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../atoms/stat-card/stat-card.component';
import { DashboardStats } from '../../../core/models/document.model';

@Component({
  selector: 'app-stats-overview',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './stats-overview.component.html',
  styleUrls: ['./stats-overview.component.css'],
})
export class StatsOverviewComponent {
  @Input() stats!: DashboardStats;
}
