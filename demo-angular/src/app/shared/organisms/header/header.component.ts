import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent], // ← RouterModule agregado
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Buscar...';
  @Input()tabs: { label: string; path: string }[] = [];

  activeTab = '';
  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {

    this.setActiveFromUrl(this.router.url);

    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveFromUrl(event.urlAfterRedirects);
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private setActiveFromUrl(url: string) {
    const matched = this.tabs.find(tab => url.startsWith(tab.path));
    this.activeTab = matched ? matched.label : '';
  }

  setTab(tab: { label: string; path: string }) {
    this.router.navigate([tab.path]);
  }
}