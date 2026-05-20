import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ResponseDocument } from '../../core/models/admin.model';
import { DocumentService } from '../../core/services/document.service';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/atoms/yellow button/button.component';
import {
  DocumentsTableComponent,
  TableColumn,
} from '../../shared/organisms/documents-table/documents-table.component';
import { DashboardLayoutComponent } from '../../shared/templates/dashboard-layout/dashboard-layout.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, DocumentsTableComponent, ButtonComponent],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsPageComponent implements OnInit, OnDestroy {
  documents: ResponseDocument[] = [];
  tabs: { label: string; path: string }[] = [];
  private routerSub!: Subscription;

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  isAdmin = this.authService.isAdmin();
  isViewer = this.authService.isViewer();
  user = this.authService.getCurrentUser();

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
  ) {}

  private loadDocuments() {
    if (!isPlatformBrowser(this.platformId)) return;

    const source$ =
      this.isAdmin || this.authService.getCurrentUser()?.idRol === 6
        ? this.docService.getAllRecentDocuments()
        : this.user?.correo
          ? this.docService.getDocumentsByUsuario(this.user.correo)
          : null;

    if (!source$) return;

    source$.subscribe({
      next: (data) => {
        this.documents = data;
        this.cdr.detectChanges();
      },
    });
  }

  goToCreate() {
    this.router.navigate(['/createdocuments']);
  }

  ngOnInit() {
    this.tabs = [
      { label: 'Explorar', path: '/documents' },
      ...(!this.isViewer? [{ label: 'Crear/Editar', path: '/createdocuments' }] : []),
      ...(!this.isViewer? [{ label: 'Versiones', path: '/versiondocuments' }] : []),
    ];

    this.loadDocuments();

    this.routerSub = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        filter((e: any) => e.urlAfterRedirects.startsWith('/documents')),
      )
      .subscribe(() => this.loadDocuments());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
