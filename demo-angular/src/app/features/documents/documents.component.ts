import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStats, Document } from '../../core/models/document.model';
import { DocumentService } from '../../core/services/document.service';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';
import { DocumentsTableComponent } from '../../shared/organisms/documents-table/documents-table.component';
import { StatsOverviewComponent } from '../../shared/organisms/stats-overview/stats-overview.component';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutComponent,
    StatsOverviewComponent,
    DocumentsTableComponent,
    ButtonComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsPageComponent implements OnInit {
  stats!: DashboardStats;
  documents: Document[] = [];

  constructor(private docService: DocumentService) {}

  ngOnInit() {
    this.stats = this.docService.getStats();
    this.documents = this.docService.getRecentDocuments();
  }
}
