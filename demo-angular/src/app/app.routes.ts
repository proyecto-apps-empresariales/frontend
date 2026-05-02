import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { Login } from './features/auth/login/login';
import { DocumentsPageComponent } from './features/documents/documents.component';


export const routes: Routes = [

    { path: '', redirectTo: 'documents', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: Login },
    { path: 'documents', component: DocumentsPageComponent },

];
