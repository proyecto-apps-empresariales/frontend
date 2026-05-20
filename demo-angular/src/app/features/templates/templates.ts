import { afterNextRender, Component, inject } from '@angular/core';
import { TemplateService } from '../../core/services/template.service';
import {
  TableColumn,
  DocumentsTableComponent,
} from '../../shared/organisms/documents-table/documents-table.component';
import { filter, Subscription } from 'rxjs';
import { TemplateInterface } from '../../core/models/admin.model';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-templates',
  imports: [DashboardLayoutComponent, ButtonComponent, DocumentsTableComponent],
  templateUrl: './templates.html',
  styleUrl: './templates.css',
})
export class Templates {
  templates: TemplateInterface[] = [];
  tabs: { label: string; path: string }[] = [];
  isAdmin = inject(AuthService).isAdmin();
  private routerSub!: Subscription;

  documentColumns: TableColumn<TemplateInterface>[] = [
    { header: 'Nombre', field: 'archivoUrl' },
    { header: 'Descripción', field: 'descripcion' },
    { header: 'Tipo de Documento', field: 'tipoDocumento' },
  ];

  constructor(
    private templatesService: TemplateService,
    private router: Router,
  ) {
    afterNextRender(() => {
      this.loadDocuments();
    });
  }

  private loadDocuments() {
    this.templatesService.getAllTemplates().subscribe({
      next: (data) => (this.templates = data),
    });
  }

  goToCreate() {
    this.router.navigate(['/createtemplates']);
  }

  ngOnInit() {
    this.loadDocuments();

    this.tabs = [
      { label: 'Explorar', path: '/templates' },
      ...(this.isAdmin ? [{ label: 'Crear/Editar', path: '/createtemplates' }] : []),
    ];

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.loadDocuments());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
