import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { Login } from './features/auth/login/login';
import { DocumentsPageComponent } from './features/documents/documents.component';
import { CreateDocument } from './features/documents/create-document/create-document';
import { VersionDocument } from './features/documents/version-document/version-document';


export const routes: Routes = [

    { path: '', redirectTo: 'documents', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: Login },
    { path: 'documents', component: DocumentsPageComponent },
    { path: 'createdocuments', component: CreateDocument},
    { path: 'versiondocuments', component: VersionDocument},

];
