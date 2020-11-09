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
import { EventParticipantsComponent } from "./events/event-participants/event-participants.component";
import { SamyakPaymentsComponent } from "./payments/samyak-payments/samyak-payments.component";
import { TechTalksComponent } from "./events/tech-talks/tech-talks.component"

//resolvers
import { ParticipantsResolverService } from "./events/event-participants/participants-resolver.service";


const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'forgotpassword' , component: ForgotPasswordComponent},
  {
    path: 'admin',
    component: ToolbarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: SamyakUsersComponent },
      {path: 'security', component: RolesComponent},
      {path: 'events', component: SamyakEventsComponent , canActivate: [EventAuthGuard]},
      {path: 'event-participants/:id', component: EventParticipantsComponent}, //, resolve: { participants: ParticipantsResolverService}
      {path: 'payments' , component: SamyakPaymentsComponent},
      {path: 'tech-talks' , component: TechTalksComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
