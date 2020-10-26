import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AdminServiceService } from "../../admin-service.service";
import {participant} from "./participant";
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  displayedColumns: string[] = ['select','position','name' ,'samyak_id', 'email', 'mobile' ,'batch', 'more'];
  allBatches;
  dataSource: participant[]=[
    {
      position:1,
      name: "praneeth",
      eventid:'tech001',
      samyak_id:'SMK2K20000002',
      email:'praneeth.m@gmail.com',
      mobile:'9999999999' ,
      batch :'None',
      Assigned:1
  },
  {
      position:2,
      name: "praneeth",
      eventid:'tech001',
      samyak_id:'SMK2K20000002',
      email:'praneeth.m@gmail.com',
      mobile:'9999999999' ,
      batch :'None',
      Assigned:0
  },
  {
      position:3,
      name: "praneeth",
      eventid:'tech002',
      samyak_id:'SMK2K20000002',
      email:'praneeth.m@gmail.com',
      mobile:'9999999999' ,
      batch :'None',
      Assigned:0
  },
  {   
      position:4,
      name: "charan",
      eventid:'tech001',
      samyak_id:'SMK2K20000003',
      email:'kckreddy2000@gmail.com',
      mobile:'9999999999' ,
      batch :'None',
      Assigned:0
  }
  ];

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
  
  addBatch(){
    console.log(this.selection.selected);
  }
  constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet,private route:ActivatedRoute,private _service: AdminServiceService) { }

  ngOnInit(): void {
    let id= this.route.snapshot.params['id']
    let temp = {eventCode: id}
    this._service.getEventBatches(temp)
    .subscribe(
        data =>{
          console.log(data);
          this.allBatches=data['slots'];
          console.log(this.allBatches); 
        },
        error => console.log(error)  
    );
  }

}
