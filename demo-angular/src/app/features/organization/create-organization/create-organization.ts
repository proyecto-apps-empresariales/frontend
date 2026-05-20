import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { Organization } from '../../../core/models/admin.model';
import { OrganizationService } from '../../../core/services/oganizations.service';


@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [DashboardLayoutComponent, FormFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-organization.html',
})
export class CreateOrganizationComponent implements OnInit {
  existing?: Organization;

  nombreControl     = new FormControl('');
  descripcionControl = new FormControl('');

  tabs = [
    { label: 'docuCMB', path: '/docucmb' },
    { label: 'Explorar', path: '/organizations' },
    { label: 'Crear',          path: '/createorganization' },
  ];

  constructor(
    private OrganizationService: OrganizationService,
    private router: Router,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) {
      this.existing = state.document;
      this.nombreControl.setValue(state.document.nombre ?? '');
      this.descripcionControl.setValue(state.document.descripcion ?? '');
    }
  }

  submit() {
    const payload = {
      nombre:      this.nombreControl.value ?? '',
      descripcion: this.descripcionControl.value ?? '',
    };

    const request$ = this.existing
      ? this.OrganizationService.patch(this.existing.idOrganizacion, payload)
      : this.OrganizationService.post(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/organizations']),
      error: (err) => console.error('Error al guardar organización:', err),
    });
  }
}