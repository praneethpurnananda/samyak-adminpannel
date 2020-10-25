import { Component, OnInit, Inject ,ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AdminServiceService } from "../../admin-service.service";
import { element } from 'protractor';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-samyak-users',
  templateUrl: './samyak-users.component.html',
  styleUrls: ['./samyak-users.component.css']
})

export class SamyakUsersComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  displayedColumns: string[] = ['select','position', 'name' ,'samyak_id', 'email', 'mobile' , 'college' , 'college_id' , 'email_verified', 'more'];
  usersData;
  dataSource;
  userRoles;
  allRolesData;
  filterForm:FormGroup;
  constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet,private _service: AdminServiceService,private fb:FormBuilder) {
      this.filterForm = this.fb.group({
        email_verified:['2'],
        gender:[''],
        status:['2'],
        college:[''],
      });
   }
  ngOnInit(): void {
    this._service.getAllUsers()
    .subscribe(
      data => {
        this.usersData = data;
        this.dataSource = this.usersData;
        console.log(this.dataSource);

        
      },
      error => console.log(error)
    );

    this._service.userRoles()
    .subscribe(
      data => {
        this.userRoles = data['user_roles'];
        console.log(data);
      },
      error => console.log(error)
    );

    this._service.getRoles()
    .subscribe(
      data => {
        this.allRolesData = data['roles'];
        console.log(data);
      },
      error => console.log(error)
    )
  }
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    console.log(numRows);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  filterUsers () {
    this.dataSource=this.usersData;
    let filter=this.filterForm.value;
    console.log(filter)
    for (var prop in filter) {
      if(filter[prop]==="" || filter[prop]==="2"){
        continue;
      }
      else{
        this.dataSource=this.dataSource.filter(x => x[prop]==filter[prop]);
      }
    }

}

edit(element){
  const dialogRef = this.dialog.open(EditUsers, {
    width: '900px',
    data: {name: element.name , samyak_id: element.samyak_id , email: element.email , mobile: element.mobile , college: element.college , college_id: element.college_id , current_year: element.current_year , branch: element.branch , gender: element.gender},
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
      this.ngOnInit();
    }
  });
}

conformDelete(element): void{
   const alertSheet = this._bottomSheet.open(ConformDelete, {
    data: {name: element.name , userId: element._id},
  });
  alertSheet.afterDismissed().subscribe(() => {
    console.log('Bottom sheet has been dismissed.');
    this.ngOnInit();
  });
}

moreinfo(element){
  const dialogRef = this.dialog.open(MoreInfo, {
    width: '900px',
    data: {name: element.name , samyak_id: element.samyak_id , email: element.email , mobile: element.mobile , college: element.college , college_id: element.college_id , current_year: element.current_year , branch: element.branch , gender: element.gender, email_verified: element.email_verified , status: element.status , created_at: element.created_at , updated_at: element.updated_at},
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

disable(element){
  let id = {userId : element._id};
  this._service.disableUser(id)
  .subscribe(
    data => {
        console.log(data),
        this.ngOnInit()
      },
    error => console.log(error)
  )
}

permissions(element){
  let r = this.userRoles.find(x => x.user_id == element._id);
  let tmp;
  if(r){
     let role = this.allRolesData.find(x => x._id == r.role_id);
     tmp = {id: element._id , role: role.name , allRoles: this.allRolesData};
     console.log("inside if");
  }
  else{
     tmp = {id: element._id , role: 'none' , allRoles: this.allRolesData};
  }
  const dialogRef = this.dialog.open(SetPermissions, {
    width: '900px',
    data: tmp
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
      this.ngOnInit();
    }
  });
}


}

@Component({
  selector: 'conform',
  templateUrl: 'conform.html',
  styleUrls: ['./samyak-users.component.css']
})
export class ConformDelete {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _bottomSheet: MatBottomSheet ,private _service: AdminServiceService) {
    // console.log(data);
  }

  deleteUser(){
    let tmp  = {userId : this.data.userId};
    this._service.deleteUser(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this._bottomSheet.dismiss();
  }
}
//model box typescript file starts

@Component({
  selector: 'edit',
  templateUrl: 'edit.html',
  styleUrls: ['./samyak-users.component.css']
})
export class EditUsers {

  editForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditUsers>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder,private _service: AdminServiceService) {
      // console.log(data);

      this.editForm = this.fb.group({
        name: [{value: data.name , disabled: false}, Validators.required],
        samyak_id: [{value: data.samyak_id , disabled: true}, Validators.required],
        email: [{value: data.email , disabled: true}, Validators.required],
        mobile: [{value: data.mobile , disabled: false}, Validators.required],
        college: [{value: data.college , disabled: false}, Validators.required],
        college_id: [{value: data.college_id , disabled: false}, Validators.required],
        current_year: [{value: data.current_year , disabled: false}, Validators.required],
        branch: [{value: data.branch , disabled: false}, Validators.required],
        gender: [{value: data.gender , disabled: false}, Validators.required]
      });
    }

    edit(){
        console.log(this.editForm.value.name);
        let tmp = {
          name: this.editForm.value.name,
          email: this.editForm.getRawValue().email,
          mobile: this.editForm.value.mobile,
          college: this.editForm.value.college,
          current_year: this.editForm.value.current_year,
          branch: this.editForm.value.branch,
          gender: this.editForm.value.gender,
          college_id: this.editForm.value.college_id
        }
        this._service.editUser(tmp)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        );
    }
    onNoClick(): void {
    this.dialogRef.close();
  }
}

//info
@Component({
  selector: 'info',
  templateUrl: 'info.html',
  styleUrls: ['./samyak-users.component.css']
})
export class MoreInfo {

  constructor(
    public dialogRef: MatDialogRef<MoreInfo>,
    @Inject(MAT_DIALOG_DATA) public data) {
      // console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'permissions',
  templateUrl: 'permissions.html',
  styleUrls: ['./samyak-users.component.css']
})
export class SetPermissions {
  selected;
  constructor(
    public dialogRef: MatDialogRef<SetPermissions>,
    @Inject(MAT_DIALOG_DATA) public data , private _service: AdminServiceService){
      console.log(data);
      if(this.data.role == 'none'){
        console.log('none');
      }
      else{
        this.selected = this.data.role;
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    addRole(){
      if(this.selected == "none"){
        let tmp  = {userId: this.data.id};
        this._service.deleteUserRole(tmp)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        )
      }
      else{
      let tmp = {userId: this.data.id , RoleId: this.selected};
      console.log(tmp);
      this._service.addUserRole(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }
    }

}
