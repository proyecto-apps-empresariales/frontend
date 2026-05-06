import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { HeaderComponent } from '../../organisms/header/header.component';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  @Input() placeholder = 'Buscar...';
  @Input() tabs: { label: string; path: string }[] = [];
}
