import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentRequirements } from '../../../core/models/admin.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})
export class DocumentItemComponent {
  @Input() doc!: any;
  @Input() isDocument: boolean = false;
  @Input() isType: boolean = false;
  @Input() isTemplate: boolean = false;
  @Input() isUser: boolean = false;
  @Input() isVersion: boolean = false;
  @Input() isOrganization: boolean = false;
  @Input() isRole: boolean = false;
  @Input() isState: boolean = false;
  @Input() isTypeP: boolean = false;
  @Input() isProcess: boolean = false;
  @Input() setValues?: (doc: any) => void;

  typeIcon = '📌';

  
   authService  = inject(AuthService);
   user= this.authService.getCurrentUser();

  get isAdmin(){
    return this.authService.isAdmin();
  }
  get isViewer(){
    return this.authService.isViewer();
  }

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

    if (this.isTemplate) {
      const url = this.doc.archivoUrl;
      if (url) window.open(url, '_blank');
      else console.warn('No hay archivo disponible');
    }
  }

  downloadUrl(): void {
    let versiones = this.doc.versiones ?? [];
    const ultima = versiones[versiones.length - 1];
    let url = ultima?.archivoUrl;
    let template = this.doc.archivoUrl ?? [];

    // Si es versión, descarga directamente su URL
    if (!url) {
      url = this.doc.archivoUrl;
    }

    // Agrega fl_attachment a la URL de Cloudinary para forzar descarga
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
    window.open(downloadUrl, '_blank');

    if (template) {
      const downloadUrl = template.replace('/upload/', '/upload/fl_attachment/');
      window.open(downloadUrl, '_blank');
    }
  }
  // Versions
  goToVersion() {
    console.log('doc:', this.doc);
    this.router.navigate(['/versiondocuments'], {
      state: { document: this.doc },
    });
  }

  // Document Type, type process and details
  goToUpdate() {
    if(this.isType){
      console.log('doc:', this.doc);
      this.router.navigate(['/createtype'], {
        state: { document: this.doc },
      });
    }
    if(this.isTypeP){
      this.setValues?.(this.doc)
    }
    if(this.isProcess){
            console.log('doc:', this.doc);
      this.router.navigate(['/createprocess'], {
        state: { document: this.doc },
      });
    }
  }
  //Process
  goToDetail(){
    console.log('doc:', this.doc);
      this.router.navigate(['/detailprocess'], {
        state: { document: this.doc },
      });
  }
  // Templates
  goToTemplate() {
    console.log('doc:', this.doc);
    this.router.navigate(['/createtemplates'], {
      state: { document: this.doc },
    });
  }
  // Users
  inactivateUser() {
    // Implement the logic to inactivate the user
  }

  activateUser() {
    // Implement the logic to activate the user
  }

  goToUpdateUser() {
    console.log('doc:', this.doc);
    this.router.navigate(['/createuser'], {
      state: { document: this.doc },
    });
  }

  // Organizations
  goToUpdateOrganization() {
    console.log('doc:', this.doc);
    this.router.navigate(['/createorganization'], {
      state: { document: this.doc },
    });
  }

  // Roles
  goToUpdateRole() {
    console.log('doc:', this.doc);
    this.router.navigate(['/createrole'], {
      state: { document: this.doc },
    });
  } 

  // States
  goToUpdateState() {
    this.setValues?.(this.doc)
  }

  get req(): DocumentRequirements[] {
    return this.doc?.requerimientos ?? [];
  }

}
