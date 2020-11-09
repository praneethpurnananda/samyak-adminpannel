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
  allEventTypes;
  allEvents;
  displayedColumns: string[] = ['position', 'name' ,'code', 'department', 'multiple_events_allowed' , 'organiser'  , 'status', 'more'];
  dataSource;
  canAdd:boolean = false;
  canEdit:boolean = false;
  canDelete:boolean = false;
  canAccessSlots:boolean = false;
  canAccessParticipants:boolean = false;
  alldepartments;
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


     let p1 = {collection: 'Events', permission: 'add'};
     let p2 = {collection: 'Events', permission: 'edit'};
     let p3 = {collection: 'Events', permission: 'delete'};
     let p4 = {collection: 'Events', permission: 'manage_batches'};
     let p5 = {collection: 'Events', permission: 'manage_participants'};

     this._service.userPageAccess(p1)
     .subscribe(
       data => this.canAdd = Boolean(data),
       error => console.log(error)
     );

     this._service.userPageAccess(p2)
     .subscribe(
       data => this.canEdit = Boolean(data),
       error => console.log(error)
     );

     this._service.userPageAccess(p3)
     .subscribe(
       data => {this.canDelete = Boolean(data),console.log(this.canDelete)},
       error => console.log(error)
     );

     this._service.userPageAccess(p4)
     .subscribe(
       data => this.canAccessSlots = Boolean(data),
       error => console.log(error)
     );

     this._service.userPageAccess(p5)
     .subscribe(
       data => this.canAccessParticipants = Boolean(data),
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
      const dialogRef = this.dialog.open(AddCsvFile, {
        width: '550px',
        data: {title: 'event'},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.ngOnInit();
        }
      });
  }

  edit(element){
    let tmp = {formdata: element , allEventTypes: this.allEventTypes};
    const dialogRef = this.dialog.open(EditEvent, {
      width: '990px',
      data: tmp,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }
  moreinfo(element){}

  conformDelete(element){
    const dialogRef = this.dialog.open(DeleteEvent, {
      width: '550px',
      data: element,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

  addBatches(element){
    const dialogRef = this.dialog.open(AddBatch, {
      width: '990px',
      data: element,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }


  addDepartments(){
  const dialogRef = this.dialog.open(AddDepartment, {
    width: '990px',
    data: this.allEventTypes,
  });
  dialogRef.afterClosed().subscribe(result => {
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
  private imageSrc: string = '';
  departments;
  multiple_events_allowed = [
    {viewValue: 'Allowed' , value: 1},
    {viewValue: 'Not Allowed' , value: 0}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddEvent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){

      this._service.getDepartments()
      .subscribe(
        data => this.departments = data,
        error=> console.log(error)
      );

      this.addEvent = this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        organiser: ['', Validators.required],
        description: ['', Validators.required],
        multiple_events_allowed: ['', Validators.required],
        venue: ['', Validators.required],
        type: ['', Validators.required],
        code: ['', Validators.required],
        faculty_organiser: '',
        faculty_contact: ''
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
    console.log(this.imageSrc)
  }


    disableOne(){};
    disableTwo(){};
    disableThree(){};

    onNoClick(): void{
      this.dialogRef.close();
    }

    add(){
      console.log(this.addEvent.value);
      let tmp = {
        name: this.addEvent.value.name,
        department: this.addEvent.value.department,
        organiser: this.addEvent.value.organiser,
        description: this.addEvent.value.description,
        multiple_events_allowed: this.addEvent.value.multiple_events_allowed,
        venue: this.addEvent.value.venue,
        type: this.addEvent.value.type,
        code: this.addEvent.value.code,
        faculty_organiser: this.addEvent.value.faculty_organiser,
        faculty_contact: this.addEvent.value.faculty_organiser,
        image: this.imageSrc
      };
      this._service.addEvent(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }
}

//add-files
@Component({
  selector: 'add-file',
  templateUrl: 'add-file.html',
  styleUrls: ['./samyak-events.component.css']
})
export class AddCsvFile {
    selectedFile = null;
  constructor(
    public dialogRef: MatDialogRef<AddCsvFile>,
      @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){

      }

      onNoClick(): void{
        this.dialogRef.close();
      }

      addcsv(){
        let formData:FormData = new FormData();

        formData.append('newfile', this.selectedFile);
        console.log(this.data.title);
        if(this.data.title == "event"){
          console.log('inside event');
          this._service.uploadEventCsv(formData)
          .subscribe(
            data => console.log(data),
            error => console.log(error)
          );
        }
        else if(this.data.title == "techtalk"){
          console.log('inside csv');
          this._service.uploadTechTalkCsv(formData)
          .subscribe(
            data => console.log(data),
            error => console.log(error)
          );
        }

      }

      onFileInput(event){
        console.log("eevnt teiggerd");
        this.selectedFile = event.target.files[0];
      }
}

//delete
@Component({
  selector: 'delete-event',
  templateUrl: 'delete.html',
  styleUrls: ['./samyak-events.component.css']
})
export class DeleteEvent {

  constructor(
    public dialogRef: MatDialogRef<DeleteEvent>,
      @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){}

  onNoClick(): void{
    this.dialogRef.close();
  }

  delete(){
    let tmp = {eventId: this.data._id};
    this._service.deleteEvent(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }
}

//edit
@Component({
  selector: 'edit-event',
  templateUrl: 'edit-event.html',
  styleUrls: ['../../users/samyak-users/samyak-users.component.css']
})
export class EditEvent {

  editEventsForm: FormGroup;
  departments;
  multiple_events_allowed = [
    {viewValue: 'Allowed' , value: 1},
    {viewValue: 'Not Allowed' , value: 0}
  ];


  constructor(
    public dialogRef: MatDialogRef<EditEvent>,
      @Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder, private _service: AdminServiceService){
        console.log(this.data);

        this._service.getDepartments()
        .subscribe(
          data => this.departments = data,
          error=> console.log(error)
        );

        this.editEventsForm = this.fb.group({
          name: [{value: data.formdata.name , disabled: false}, Validators.required],
          code: [{value: data.formdata.code , disabled: false}, Validators.required],
          department: [{value: data.formdata.department , disabled: false}, Validators.required],
          organiser: [{value: data.formdata.organiser , disabled: false}, Validators.required],
          description: [{value: data.formdata.description , disabled: false}, Validators.required],
          venue: [{value: data.formdata.venue , disabled: false}, Validators.required],
          multiple_events_allowed: [{value: data.formdata.multiple_events_allowed , disabled: false}, Validators.required],
          type: [{value: data.formdata.type[0]._id , disabled: false}, Validators.required],
          faculty_organiser: [{value: data.formdata.faculty_organiser , disabled: false}],
          faculty_contact: [{value: data.formdata.faculty_contact , disabled: false}]
        });
      }
  onNoClick(): void{
    this.dialogRef.close();
  }

  edit(){
    let tmp = {name: this.editEventsForm.value.name , eventId: this.data.formdata._id , department: this.editEventsForm.value.department , organiser: this.editEventsForm.value.organiser , description: this.editEventsForm.value.description ,
       multiple_events_allowed: this.editEventsForm.value.multiple_events_allowed , venue: this.editEventsForm.value.venue  ,
      type: this.editEventsForm.value.type , code: this.editEventsForm.value.code , faculty_organiser: this.editEventsForm.value.faculty_organiser , faculty_contact: this.editEventsForm.value.faculty_contact};
    console.log(tmp);
    this._service.editEvent(tmp)
    .subscribe(
      data =>  console.log(data),
      error => console.log(error)
    );
  }

}

//add-Batches
@Component({
  selector: 'add-batch',
  templateUrl: 'add-batch.html',
  styleUrls: ['./samyak-events.component.css']
})
export class AddBatch {

  addBatchesForm: FormGroup;
  allBatches;
  constructor(
    public dialogRef: MatDialogRef<AddBatch>,
      @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){
        this.addBatchesForm = this.fb.group({
          name: ['', Validators.required],
          meet_link: ['', Validators.required],
          event: [{value: data.code , disabled: true}, Validators.required],
          date: ['', Validators.required],
          start_time: ['', Validators.required],
          end_time: ['', Validators.required]
        });

        let tmp = {eventId : data._id};
        this.getBatch(tmp);
      }

      getBatch(tmp){
        console.log(tmp);
        console.log("calling batches");
        this._service.getEventBatches(tmp)
        .subscribe(
          data => {
            console.log(data);
            this.allBatches = data['slots'];
            console.log(this.allBatches);
          },
          error => console.log(error)
        );
      }

      delete(item){
        let sltId = {slotId: item._id};
        this._service.deleteBatch(sltId)
        .subscribe(
          data => {
            console.log(data);
            let tmp = {eventId: this.data._id};
            this.getBatch(tmp);
          },
          error => console.log(error)
        );
      }

      onNoClick(): void{
        this.dialogRef.close();
      }

      add(){
        let tmp = {
          name: this.addBatchesForm.value.name,
          meet_link: this.addBatchesForm.value.meet_link,
          date: this.addBatchesForm.value.date,
          start_time: this.addBatchesForm.value.start_time,
          end_time: this.addBatchesForm.value.end_time,
          event: this.addBatchesForm.getRawValue().event,
          eventId: this.data._id
        };
        this._service.addEventBatch(tmp)
        .subscribe(
          data => {
            console.log(data);
            let tmp = {eventId: this.data._id};
            this.getBatch(tmp);
            this.addBatchesForm.controls['name'].reset();
            this.addBatchesForm.controls['meet_link'].reset();
            this.addBatchesForm.controls['date'].reset();
            this.addBatchesForm.controls['start_time'].reset();
            this.addBatchesForm.controls['end_time'].reset();
          },
          error => console.log(error)
        )
      }

      displayBatches(){}
}



//add-Departments
@Component({
  selector: 'add-department',
  templateUrl: 'add-department.html',
  styleUrls: ['./samyak-events.component.css']
})
export class AddDepartment {

  addDepartmentsForm: FormGroup;
  allDepartments;
  constructor(
    public dialogRef: MatDialogRef<AddDepartment>,
      @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){
        this.addDepartmentsForm = this.fb.group({
          name: ['', Validators.required],
        });
        this.getDepartment();
      }

      getDepartment(){
        console.log();
        console.log("calling Departments");
        this._service.getDepartments()
        .subscribe(
          data => {
            console.log(data);
            this.allDepartments = data;
            console.log(this.allDepartments);
          },
          error => console.log(error)
        );
      }

      delete(item){
        let demartmentId = {departmentId: item._id};
        this._service.deleteDepartment(demartmentId)
        .subscribe(
          data => {
            console.log(data);
            this.getDepartment();
          },
          error => console.log(error)
        );
      }
      edit(item){
        let demartment = {departmentId: item._id,name:this.addDepartmentsForm.value.name};
        this._service.editDepartment(demartment)
        .subscribe(
          data => {
            console.log(data);
            this.getDepartment();
          },
          error => console.log(error)
        );
      }

      onNoClick(): void{
        this.dialogRef.close();
      }

      add(){
        let tmp = {
          name: this.addDepartmentsForm.value.name,
        };
        this._service.addDepartment(tmp)
        .subscribe(
          data => {
            console.log(data);
            this.getDepartment();
            this.addDepartmentsForm.controls['name'].reset();
          },
          error => console.log(error)
        )
      }

      displayDepartments(){}
}
