import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminServiceService } from "../../admin-service.service";

@Component({
  selector: 'app-samyak-events',
  templateUrl: './samyak-events.component.html',
  styleUrls: ['./samyak-events.component.css']
})
export class SamyakEventsComponent implements OnInit {

  constructor(public dialog: MatDialog,private _service: AdminServiceService) { }

  ngOnInit(): void {
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
      data: {title: 'Add New Event Type'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
    });
  }

  addEvent(){
    const dialogRef = this.dialog.open(AddEvent, {
      width: '900px',
      data: {title: 'Add New Event'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      if(result){
        this.ngOnInit();
      }
    });
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

    add(){}
}
