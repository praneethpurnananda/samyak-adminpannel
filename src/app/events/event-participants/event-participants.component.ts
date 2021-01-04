import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminServiceService } from "../../admin-service.service";
import { participant } from "./participant";
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name' ,'samyak_id', 'email', 'mobile' , 'college_id' , 'slot' ,'more'];
  allBatches;
  dataSource;
  participantsData;
  registrationsData;
  eventId;

    batchesList: FormGroup;
    constructor(public dialog: MatDialog,
      private route:ActivatedRoute,private _service: AdminServiceService,
      private fb: FormBuilder) {
      this.batchesList = this.fb.group({
        slot: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      // this.route.data.subscribe(
      //   data => console.log(data),
      //   error => console.log(error)
      // );
      let id= this.route.snapshot.params['id']
      this.eventId = id;
      let temp = {eventId: id}
      this._service.getEventBatches(temp)
      .subscribe(
          data =>{
            console.log(data);
            this.allBatches=data['slots'];
            console.log(this.allBatches);
          },
          error => console.log(error)
      );


      this._service.getEventParticipantsList(id)
      .subscribe(
        data => {
          console.log(data);
          this.registrationsData = data['registrations'];
          // console.log(this.registrationsData);
          this.participantsData = this.registrationsData;
          // console.log(this.participantsData);
          this.dataSource = this.participantsData;
          console.log(this.dataSource);
        },
        error => console.log(error)
      );
    }

    addBatch(){
      let tmp = {
        eventId: this.eventId,
        batchId: this.batchesList.value.slot,
        users: this.selection.selected
      };
      this._service.addParticipantsSlots(tmp)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error)
      );
      console.log(tmp);
    }

  selection = new SelectionModel<participant>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: participant): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position+ 1}`;
  }


  deleteSlot(element){
    const dialogRef = this.dialog.open(DeleteSlot, {
      width: '900px',
      data: {user: element, eventId: this.eventId}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      if(result){
        this.ngOnInit();
      }
    });
  }
}


//delete slot
@Component({
  selector: 'delete-slot',
  templateUrl: 'delete-slot.html',
  styleUrls: ['./event-participants.component.css']
})
export class DeleteSlot {

  slotForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DeleteSlot>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){

      console.log(data);
      this.slotForm = this.fb.group({
        slot: ['', Validators.required]
      });
    }

    removeSlot(){
      let tmp  = {eventId: this.data.eventId , batchId: this.slotForm.value.slot , userId: this.data.user._id};
      this._service.deleteParticipantSlot(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    }
}
