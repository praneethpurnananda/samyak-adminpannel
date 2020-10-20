import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminServiceService } from "../../admin-service.service";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-samyak-events',
  templateUrl: './samyak-events.component.html',
  styleUrls: ['./samyak-events.component.css']
})
export class SamyakEventsComponent implements OnInit {

  @ViewChild('myInput') myInputVariable: ElementRef;
  allEventTypes;
  allEvents;
  displayedColumns: string[] = ['position', 'name' ,'code', 'department', 'multiple_events_allowed' , 'organiser' , 'registration_price' , 'status', 'time'];
  dataSource;
  selectedFile = null;
  constructor(public dialog: MatDialog,private _service: AdminServiceService) { }

  ngOnInit(): void {
    this._service.viewEventTypes()
    .subscribe(
      data => {
        console.log(data)
        this.allEventTypes = data;
      },
      error => console.log(error)
    );

    this._service.allEvents()
    .subscribe(
      data => {
        console.log(data)
        this.allEvents = data;
        this.dataSource = this.allEvents;
      },
      error => console.log(error)
    );
  }

  addEventType(){
    const dialogRef = this.dialog.open(AddEventType, {
      width: '500px',
      data: {title: 'Add New Event Type'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
    });
  }

  displayEventTypes(){
    const dialogRef = this.dialog.open(DisplayEventType, {
      width: '700px',
      data: this.allEventTypes,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
    });
  }

  addEvent(){
    const dialogRef = this.dialog.open(AddEvent, {
      width: '900px',
      data: this.allEventTypes,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      if(result){
        this.ngOnInit();
      }
    });
  }

  addcsv(){
    let formData:FormData = new FormData();
    console.log("added");
    formData.append('newfile', this.selectedFile);
    // let fileData = {'newfile': this.selectedFile};
    this._service.uploadEventCsv(formData)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );

  }

  onFileInput(event){
    console.log("eevnt teiggerd");
    this.selectedFile = event.target.files[0];
  }

}


//add-event type
@Component({
  selector: 'add-event-type',
  templateUrl: 'add-type.html',
  styleUrls: ['./samyak-events.component.css']
})
export class AddEventType {

  addEventType: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEventType>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){

      this.addEventType = this.fb.group({
        typeName: ['', Validators.required]
      });
    }
    onNoClick(): void{
      this.dialogRef.close();
    }

    addType(){
      let tmp = {name: this.addEventType.value.typeName};
      console.log(tmp);
      this._service.addEventType(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    }
}

//display event type
@Component({
  selector: 'display-event-type',
  templateUrl: 'display-type.html',
  styleUrls: ['./samyak-events.component.css']
})
export class DisplayEventType {
  constructor(
    public dialogRef: MatDialogRef<DisplayEventType>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){
      console.log(data);
    }
    onNoClick(): void{
      this.dialogRef.close();
    }
}



//add-event
@Component({
  selector: 'add-event',
  templateUrl: 'add-event.html',
  styleUrls: ['./samyak-events.component.css']
})
export class AddEvent {

  addEvent: FormGroup;
  departments = [
    {value: 'cse' , viewValue: 'CSE'},
    {value: 'ece' , viewValue: 'ECE'}
  ];
  multiple_events_allowed = [
    {viewValue: 'Allowed' , value: 1},
    {viewValue: 'Not Allowed' , value: 0}
  ];
  constructor(
    public dialogRef: MatDialogRef<AddEvent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){

      this.addEvent = this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        organiser: ['', Validators.required],
        description: ['', Validators.required],
        multiple_events_allowed: ['', Validators.required],
        time: '',
        attending_link: '',
        venue: ['', Validators.required],
        registration_price: ['', Validators.required],
        type: ['', Validators.required],
        code: ['', Validators.required]
      });
    }
    onNoClick(): void{
      this.dialogRef.close();
    }

    add(){
      this._service.addEvent(this.addEvent.value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }
}
