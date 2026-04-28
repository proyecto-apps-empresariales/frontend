import { Component } from '@angular/core';
import { AuthLayoutComponent } from "../../../shared/templates/auth-layout/auth-layout.component";
import { BrandPanelComponent } from "../../../shared/organisms/brand-panel/brand-panel.component";
import { LoginForm } from "../../../shared/organisms/login-form/login-form";

@Component({
  selector: 'app-login',
  imports: [AuthLayoutComponent, BrandPanelComponent, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
