import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./forms/login/login.component";
import { ToolbarComponent } from "./navbar-footer/toolbar/toolbar.component";
import { DashboardComponent } from './main-module/dashboard/dashboard.component';
import { SamyakUsersComponent } from "./users/samyak-users/samyak-users.component";
import { RolesComponent } from "./iam-security/roles/roles.component";

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {
    path: 'admin',
    component: ToolbarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: SamyakUsersComponent},
      {path: 'security', component: RolesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
