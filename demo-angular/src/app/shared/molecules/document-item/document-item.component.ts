import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})
export class DocumentItemComponent {
  @Input() doc!: Document;

  get typeIcon(): string {
    const icons: Record<string, string> = { pdf: '📄', docx: '📝', xlsx: '📊' };
    return icons[this.doc.type] || '📁';
  }

  get typeClass(): string { return this.doc.type; }
}
