import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from "@angular/common/http";

//ng-material
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SamyakEventsComponent,AddEventType,AddEvent,DisplayEventType,AddCsvFile,DeleteEvent,EditEvent,AddBatch,AddDepartment, Editslot} from './samyak-events/samyak-events.component';
import { EventParticipantsComponent , DeleteSlot} from './event-participants/event-participants.component';
import { TechTalksComponent , AddTechTalk } from './tech-talks/tech-talks.component';



@NgModule({
  declarations: [SamyakEventsComponent,AddEventType,AddEvent,DisplayEventType,AddCsvFile,DeleteEvent,EditEvent,Editslot,AddBatch, EventParticipantsComponent, DeleteSlot, TechTalksComponent , AddTechTalk , AddDepartment],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [AddEventType,AddEvent,DisplayEventType,AddCsvFile,DeleteEvent,EditEvent,AddBatch,DeleteSlot,AddTechTalk,AddDepartment,Editslot],
})
export class EventsModule { }
