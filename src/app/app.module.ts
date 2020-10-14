import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//own-modules
import { OwnFormsModule } from "./forms/forms.module";
import { NavbarFooterModule } from "./navbar-footer/navbar-footer.module";
import { MainModuleModule } from "./main-module/main-module.module";
import { UsersModule } from "./users/users.module";
import { IamSecurityModule } from "./iam-security/iam-security.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OwnFormsModule,
    HttpClientModule,
    NavbarFooterModule,
    MainModuleModule,
    UsersModule,
    IamSecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
