import { Component, OnInit, Inject } from '@angular/core';
import { AdminServiceService } from "../../admin-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AddCsvFile } from "../samyak-events/samyak-events.component";

@Component({
  selector: 'app-tech-talks',
  templateUrl: './tech-talks.component.html',
  styleUrls: ['./tech-talks.component.css' , '../samyak-events/samyak-events.component.css']
})
export class TechTalksComponent implements OnInit {

  techtalks;
  dataSource;
  displayedColumns: string[] = ['position', 'title' ,'speaker' ,'speaker_designation', 'code', 'organiser' , 'time' , 'more'];
  constructor(public dialog: MatDialog,private _service: AdminServiceService) { }

  ngOnInit(): void {
    this._service.displayTechTalks()
    .subscribe(
      data => {
        console.log(data);
        this.techtalks = data;
        this.dataSource = this.techtalks;
      },
      error => console.log(error)
    );
  }

  addTechTalk(){
    const dialogRef = this.dialog.open(AddTechTalk, {
      width: '990px',
      data: {title: 'techtalk'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }


  addcsv(){
      const dialogRef = this.dialog.open(AddCsvFile, {
        width: '550px',
        data: {title: 'techtalk'},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.ngOnInit();
        }
      });
  }

}

//add-techtalk
@Component({
  selector: 'add-techtalks',
  templateUrl: 'add-techtalk.html',
  styleUrls: ['../samyak-events/samyak-events.component.css']
})
export class AddTechTalk {

  add: FormGroup;
  private imageSrc:string = '';

  constructor(public dialogRef: MatDialogRef<AddTechTalk>,
  @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){
    this.add = this.fb.group({
      title: ['', Validators.required],
      speaker:['', Validators.required],
      speaker_designation:['', Validators.required],
      description:['', Validators.required],
      time:['', Validators.required],
      organiser:['', Validators.required],
      code:['',Validators.required]
    });
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    // console.log(this.imageSrc)
  }

  addForm(){
    console.log(this.add.value);
    let tmp = {
      title: this.add.value.title,
      speaker: this.add.value.speaker,
      speaker_designation: this.add.value.speaker_designation,
      description: this.add.value.description,
      time: this.add.value.time,
      organiser: this.add.value.organiser,
      code: this.add.value.code,
      image: this.imageSrc
    };
    this._service.addTechTalk(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
