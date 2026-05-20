import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard-layout/dashboard-layout.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';
import { DropdownFieldLabel } from '../../../shared/molecules/dropdown-field-label/dropdown-field-label';
import { ButtonComponent } from '../../../shared/atoms/yellow button/button.component';
import { DropdownOption } from '../../../shared/atoms/dropdown-field/dropdown-field';
import { DocumentService } from '../../../core/services/document.service';
import { UserService } from '../../../core/services/users.service';
import { PeticionFlujo, ResponseDocument, TipoPeticionFlujo, User } from '../../../core/models/admin.model';
import { FlowRequestService } from '../../../core/services/flow-request.service';
import { RequestTypeService } from '../../../core/services/flow-request-extras.service';


@Component({
  selector: 'app-create-proceso',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    FormFieldComponent,
    DropdownFieldLabel,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-process.html',
})
export class CreateProcesoComponent implements OnInit {
  existing?: PeticionFlujo;

  nombreControl      = new FormControl('');
  descripcionControl = new FormControl('');
  fechaFinControl    = new FormControl('');
  tipoControl        = new FormControl('');
  destinatarioControl = new FormControl('');
  documentoControl   = new FormControl('');

  tipos: TipoPeticionFlujo[] = [];
  usuarios: User[] = [];
  documentos: ResponseDocument[] = [];

  tipoLabels: DropdownOption[] = [];
  usuarioLabels: DropdownOption[] = [];
  documentoLabels: DropdownOption[] = [];

   tabs = [
    { label: 'Procesos',      path: '/process' },
    { label: 'Crear',         path: '/createprocess' },
    { label: 'Tipos',         path: '/typeprocess' },
    { label: 'Estados',       path: '/stateprocess' },
  ];

  constructor(
    private peticionService: FlowRequestService,
    private tipoService: RequestTypeService,
    private documentService: DocumentService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state?.document) {
      this.existing = state.document;
      this.nombreControl.setValue(state.document.nombre ?? '');
      this.descripcionControl.setValue(state.document.descripcion ?? '');
      this.fechaFinControl.setValue(state.document.fechaFin ?? '');
    }

    this.tipoService.getAll().subscribe({
      next: (data) => {
        this.tipos = data;
        this.tipoLabels = data.map((t) => ({ label: t.nombre, value: String(t.id) }));
        if (this.existing) {
          const match = data.find((t) => t.nombre === this.existing!.tipoPeticion);
          if (match) this.tipoControl.setValue(String(match.id), { emitEvent: false });
        }
        this.cdr.detectChanges();
      },
    });

    this.documentService.getAllRecentDocuments().subscribe({
      next: (data) => {
        this.documentos = data;
        this.documentoLabels = data.map((d) => ({ label: d.nombre, value: String(d.id) }));
        this.cdr.detectChanges();
      },
    });

    this.userService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuarioLabels = data.map((u) => ({
          label: `${u.nombre} ${u.apellido}`,
          value: String(u.idUsuario),
        }));
        if (this.existing) {
          const match = data.find((u) => `${u.nombre} ${u.apellido}` === this.existing!.destinatario);
          if (match) this.destinatarioControl.setValue(String(match.idUsuario), { emitEvent: false });
        }
        this.cdr.detectChanges();
      },
    });
  }

  submit() {
    if (this.existing) {
      const payload = {
        destinatario: Number(this.destinatarioControl.value),
        documento:    Number(this.documentoControl.value),
        tipoPeticion: Number(this.tipoControl.value),
        fechaFin:     this.fechaFinControl.value ?? '',
        descripcion:  this.descripcionControl.value ?? '',
        nombre:       this.nombreControl.value ?? '',
      };

      this.peticionService.patch(this.existing.id, payload).subscribe({
        next: () => this.router.navigate(['/process']),
        error: (err) => console.error('Error al actualizar proceso:', err),
      });

      console.log(payload)
    } else {
      const payload = {
        remitente:    1, // TODO: reemplazar con usuario autenticado
        destinatario: Number(this.destinatarioControl.value),
        documento:    Number(this.documentoControl.value),
        tipoPeticion: Number(this.tipoControl.value),
        fechaFin:     this.fechaFinControl.value ?? '',
        descripcion:  this.descripcionControl.value ?? '',
        nombre:       this.nombreControl.value ?? '',
      };

      this.peticionService.post(payload).subscribe({
        next: () => this.router.navigate(['/process']),
        error: (err) => console.error('Error al crear proceso:', err),
      });
      console.log(payload)
    }

  }
}