import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.css',
})
export class NavItem {
  @Input() label = '';
  @Input() icon = '';
  @Input() route = '/';
  @Input() active = false;

}
