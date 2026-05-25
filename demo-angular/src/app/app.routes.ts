import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { Login } from './features/auth/login/login';
import { DocumentsPageComponent } from './features/documents/documents.component';
import { CreateDocument } from './features/documents/create-document/create-document';
import { VersionDocument } from './features/documents/version-document/version-document';
import { DocumentTypeComponent } from './features/document-type/document-type';
import { CreateDocumentType } from './features/document-type/create-document-type/create-document-type';
import { CreateTemplates } from './features/templates/create-templates/create-templates';
import { Templates } from './features/templates/templates';
import { OrganizationsComponent } from './features/organization/organization';
import { CreateOrganizationComponent } from './features/organization/create-organization/create-organization';
import { RolesComponent } from './features/roles/roles';
import { UsersComponent } from './features/users/users';
import { CreateUserComponent } from './features/users/create-user/create-user';
import { ProcesosComponent } from './features/process/process';
import { CreateProcesoComponent } from './features/process/create-process/create-process';
import { DetailProcesoComponent } from './features/process/detail-process/detail-process';
import { TiposProcesoComponent } from './features/process/type-process/type-process';
import { EstadosProcesoComponent } from './features/process/state-process/state-process';
import { UserProfileComponent } from './features/users/user-profile/user-profile';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { editorGuard } from './core/guards/editor.guard';
import { editorOrAdminGuard } from './core/guards/editor-guard.guard';

export const routes: Routes = [

  //  Públicas 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },

    // VIEWER + EDITOR + ADMIN
  { path: 'documents',      component: DocumentsPageComponent, canActivate: [authGuard] },
  { path: 'versiondocuments', component: VersionDocument,      canActivate: [authGuard] },
  { path: 'process',        component: ProcesosComponent,      canActivate: [authGuard] },
  { path: 'detailprocess',  component: DetailProcesoComponent, canActivate: [authGuard] },
  { path: 'templates',      component: Templates,              canActivate: [authGuard] },
  { path: 'editprofile',    component: UserProfileComponent,   canActivate: [authGuard] },

  // EDITOR + ADMIN
  { path: 'createdocuments', component: CreateDocument,      canActivate: [editorOrAdminGuard] },
  { path: 'createprocess',   component: CreateProcesoComponent, canActivate: [editorOrAdminGuard] },

  //Solo ADMIN
  { path: 'documentstypes',     component: DocumentTypeComponent,      canActivate: [adminGuard] },
  { path: 'createtype',         component: CreateDocumentType,         canActivate: [adminGuard] },
  { path: 'createtemplates',    component: CreateTemplates,            canActivate: [adminGuard] },
  { path: 'organizations',      component: OrganizationsComponent,     canActivate: [adminGuard] },
  { path: 'createorganization', component: CreateOrganizationComponent, canActivate: [adminGuard] },
  { path: 'roles',              component: RolesComponent,             canActivate: [adminGuard] },
  { path: 'users',              component: UsersComponent,             canActivate: [adminGuard] },
  { path: 'createuser',         component: CreateUserComponent,        canActivate: [adminGuard] },
  { path: 'typeprocess',        component: TiposProcesoComponent,      canActivate: [adminGuard] },
  { path: 'stateprocess',       component: EstadosProcesoComponent,    canActivate: [adminGuard] },

  { path: '**', redirectTo: 'login' },
];
