import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../molecules/nav-item/nav-item';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

interface NavLink {
  label: string;
  icon: string;
  route: string;
  active: boolean;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NavItem],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  private allLinks: NavLink[] = [
    // Accesibles para USER y ADMIN
    { label: 'Documentos',      icon: '📄', route: '/documents',    active: true  },
    { label: 'Procesos',        icon: '⚙️', route: '/process',      active: false },
    { label: 'Perfil de usuario', icon: '👤', route: '/editprofile', active: false },
    { label: 'Plantillas',      icon: '📋', route: '/templates',    active: false },

    // Solo ADMIN
    { label: 'Tipos de documento', icon: '📝', route: '/documentstypes',  active: false, adminOnly: true },
    { label: 'Usuarios',           icon: '👥', route: '/users',           active: false, adminOnly: true },
    { label: 'Organizaciones',     icon: '🏢', route: '/organizations',   active: false, adminOnly: true },
    { label: 'Roles',              icon: '🔐', route: '/roles',           active: false, adminOnly: true },
  ];

  navLinks: NavLink[] = [];

  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    // Filtrar según rol
    const isAdmin = this.auth.isAdmin();
    this.navLinks = this.allLinks.filter(link => !link.adminOnly || isAdmin);

    this.setActiveFromUrl(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setActiveFromUrl(event.urlAfterRedirects);
      });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private setActiveFromUrl(url: string) {
    this.navLinks = this.navLinks.map((link) => ({
      ...link,
      active: url === link.route || url.startsWith(link.route + '/'),
    }));
  }

  setTab(tab: NavLink) {
    this.router.navigate([tab.route]);
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}