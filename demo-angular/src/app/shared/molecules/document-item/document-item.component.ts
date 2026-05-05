import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})
export class DocumentItemComponent {
  @Input() doc!: any;
  @Input() isDocument: boolean = true;
  typeIcon = '📁';

  constructor(private router: Router) {}

  previewUrl(): void {
    // Si es documento, busca la última versión
    if (this.isDocument) {
      const versiones = this.doc.versiones ?? [];
      const ultima = versiones[versiones.length - 1];
      const url = ultima?.archivoUrl;
      if (url) window.open(url, '_blank');
      else console.warn('No hay versiones disponibles');
    } else {
      // Si es versión, abre directamente su URL
      const url = this.doc.archivoUrl;
      if (url) window.open(url, '_blank');
      else console.warn('No hay archivo disponible');
    }
  }

  downloadUrl(): void {
    const versiones = this.doc.versiones ?? [];
    const ultima = versiones[versiones.length - 1];
    let url = ultima?.archivoUrl;

    // Si es versión, descarga directamente su URL
    if (!url) {
      url = this.doc.archivoUrl;
    }

    // Agrega fl_attachment a la URL de Cloudinary para forzar descarga
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');

    window.open(downloadUrl, '_blank');
  }

  goToVersion() {
    console.log('doc:', this.doc);
    this.router.navigate(['/versiondocuments'], {
      state: { document: this.doc },
    });
  }
}
