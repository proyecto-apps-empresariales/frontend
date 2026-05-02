import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../../../core/models/document.model';
import { DocumentItemComponent } from '../../molecules/document-item/document-item.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';

@Component({
  selector: 'app-documents-table',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent, PaginationComponent],
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css'],
})
export class DocumentsTableComponent {
  @Input() documents: Document[] = [];
  @Input() total = 1240;
  @Input() title="Documentos";
}
