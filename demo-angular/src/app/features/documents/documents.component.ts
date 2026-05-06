import { afterNextRender, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStats, ResponseDocument } from '../../core/models/document.model';
import { DocumentService } from '../../core/services/document.service';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';
import {
  DocumentsTableComponent,
  TableColumn,
} from '../../shared/organisms/documents-table/documents-table.component';
import { StatsOverviewComponent } from '../../shared/organisms/stats-overview/stats-overview.component';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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
  documents: ResponseDocument[] = [];
  tabs: { label: string; path: string }[] = [];
  private routerSub!: Subscription;

  documentColumns: TableColumn<ResponseDocument>[] = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
    { header: 'Creador', field: 'usuarioCreador' },
    {
      header: 'Fecha',
      field: 'fechaCreacion',
      transform: (v) => new Date(v).toLocaleDateString('es-CO'),
    },
  ];

  constructor(
    private docService: DocumentService,
    private router: Router,
  ) {
    afterNextRender(() => {
      this.loadDocuments();
    });
  }

  private loadDocuments() {
    this.docService.getAllRecentDocuments().subscribe({
      next: (data) => (this.documents = data),
    });
  }

  goToCreate() {
    this.router.navigate(['/createdocuments']);
  }

ngOnInit() {
  this.stats = this.docService.getStats();
  this.loadDocuments();

  this.tabs = [
    { label: 'docuCMB',   path: '/docucmb' },
    { label: 'Explorar',  path: '/documents' },
    { label: 'Crear',     path: '/createdocuments' },
    { label: 'Versiones', path: '/versiondocuments' },
  ];

  
  this.routerSub = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    filter((e: any) => e.urlAfterRedirects.startsWith('/documents'))
  ).subscribe(() => this.loadDocuments());
}

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

}
