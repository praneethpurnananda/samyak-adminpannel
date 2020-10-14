import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from "@angular/common/http";

//ng-material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

import { SamyakUsersComponent, EditUsers, ConformDelete, MoreInfo, SetPermissions} from './samyak-users/samyak-users.component';



@NgModule({
  declarations: [SamyakUsersComponent,EditUsers,ConformDelete,MoreInfo,SetPermissions],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    MatSelectModule
  ],
  entryComponents: [
   EditUsers,ConformDelete,MoreInfo,SetPermissions
 ],
})
export class UsersModule { }
