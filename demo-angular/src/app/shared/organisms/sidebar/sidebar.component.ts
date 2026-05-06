import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../molecules/nav-item/nav-item';


interface NavLink { label: string; icon: string; route: string; active: boolean; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NavItem],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  navLinks: NavLink[] = [
    { label: 'Documentos', icon: '📄', route: '/documentos', active: true },
    { label: 'Procesos', icon: '⚙️', route: '/procesos', active: false },
    { label: 'Perfil de Usuario', icon: '👤', route: '/perfil', active: false },
    { label: 'Organizaciones', icon: '🏢', route: '/organizaciones', active: false },
  ];
}
