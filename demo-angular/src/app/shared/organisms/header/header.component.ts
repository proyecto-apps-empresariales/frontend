import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() placeholder = 'Buscar...';
  tabs = ['docuCMB', 'Explorar'];
  activeTab = 'Explorar';

  setTab(tab: string) { this.activeTab = tab; }
}
