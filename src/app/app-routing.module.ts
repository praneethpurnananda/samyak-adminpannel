import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard , EventAuthGuard} from "./auth.guard";

import { LoginComponent } from "./forms/login/login.component";
import { ForgotPasswordComponent } from "./forms/forgot-password/forgot-password.component";
import { ToolbarComponent } from "./navbar-footer/toolbar/toolbar.component";
import { DashboardComponent } from './main-module/dashboard/dashboard.component';
import { SamyakUsersComponent } from "./users/samyak-users/samyak-users.component";
import { RolesComponent } from "./iam-security/roles/roles.component";
import { SamyakEventsComponent } from "./events/samyak-events/samyak-events.component";
import {EventParticipantsComponent} from "./events/event-participants/event-participants.component";
import { ParticipantsResolverService } from "./events/event-participants/participants-resolver.service";

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'forgotpassword' , component: ForgotPasswordComponent},
  {
    path: 'admin',
    component: ToolbarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: SamyakUsersComponent , canActivate: [AuthGuard]},
      {path: 'security', component: RolesComponent},
      {path: 'events', component: SamyakEventsComponent , canActivate: [EventAuthGuard]},
      {path: 'event-participants/:id', component: EventParticipantsComponent , resolve: { participants: ParticipantsResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
