import { afterNextRender, Component } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import {
  TableColumn,
  DocumentsTableComponent,
} from '../../shared/organisms/documents-table/documents-table.component';
import { DocumentType } from '../../core/models/admin.model';
import { DocumentTypeService } from '../../core/services/document-type.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';

@Component({
  selector: 'app-document-type',
  imports: [
    DashboardLayoutComponent,
    ButtonComponent,
    DocumentsTableComponent,
  ],
  templateUrl: './document-type.html',
  styleUrl: './document-type.css',
})
export class DocumentTypeComponent {
  documentsType: DocumentType[] = [];
  tabs: { label: string; path: string }[] = [];
  private routerSub!: Subscription;

  documentColumns: TableColumn<DocumentType>[] = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' },
  ];

  constructor(
    private docTypeService: DocumentTypeService,
    private router: Router,
  ) {
    afterNextRender(() => {
      this.loadDocuments();
    });
  }

  private loadDocuments() {
    this.docTypeService.getAllTypeDocuments().subscribe({
      next: (data) => (this.documentsType = data),
    });
  }

  goToCreate() {
    this.router.navigate(['/createtype']);
  }

  ngOnInit() {
    this.loadDocuments();

    this.tabs = [
      { label: 'Explorar', path: '/documentstypes' },
      { label: 'Crear/Editar', path: '/createtype' }
    ];

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.loadDocuments());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
