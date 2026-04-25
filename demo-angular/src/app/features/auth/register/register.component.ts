import { Component } from '@angular/core';
import { BrandPanelComponent } from '../../../shared/organisms/brand-panel/brand-panel.component';
import { RegisterFormComponent } from '../../../shared/organisms/register-form/register-form.component';
import { AuthLayoutComponent } from '../../../shared/templates/auth-layout/auth-layout.component';


@Component({
  selector: 'app-register',
  imports: [BrandPanelComponent, RegisterFormComponent, AuthLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
