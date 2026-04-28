import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { Login } from './features/auth/login/login';

export const routes: Routes = [

    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: Login },

];
