import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminServiceService } from "../../admin-service.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['position' , 'role' , 'edit' , 'delete' , 'setpermissions'];
  rolesData;
  dataSource;
  constructor(public dialog: MatDialog,private _service: AdminServiceService) { }

  ngOnInit(): void {
    this._service.getRoles()
    .subscribe(
      data => {
        this.rolesData = data['roles'];
        this.dataSource = this.rolesData;
      },
      error => console.log(error)
    );
  }

  addrole(){
    const dialogRef = this.dialog.open(AddRole, {
      width: '500px',
      data: {title: 'Add New Role'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      if(result){
        this.ngOnInit();
      }
    });
  }

  deleterole(element){
    const dialogRef = this.dialog.open(DeleteRole, {
      width:'500px',
      data: {name: element.name, RoleId: element._id},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

  editrole(element){
    const dialogRef = this.dialog.open(EditRole, {
      width: '500px',
      data: {name: element.name , RoleId: element._id},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

  setpermissions(element){
    // console.log(element);
    const dialogRef = this.dialog.open(SetPermissions, {
      width: '990px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

}



//add new role
@Component({
  selector: 'add-role',
  templateUrl: 'add-role.html',
  styleUrls: ['./roles.component.css']
})
export class AddRole {

  addRoleForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddRole>,
    @Inject(MAT_DIALOG_DATA) public data , private fb: FormBuilder , private _service: AdminServiceService) {
      // console.log(data);

      this.addRoleForm = this.fb.group({
        name: ['' , Validators.required]
      });
    }
    onNoClick(): void {
    this.dialogRef.close();
  }

  addrole(){
    // console.log("click");
    // console.log(this.addRoleForm.value.name);
    let tmp = {role: this.addRoleForm.value.name};
    this._service.addRole(tmp)
    .subscribe(
      data =>  console.log(data),
      error => console.log(error)
    )
  }
}


//delete role
@Component({
  selector: 'delete-role',
  templateUrl: 'delete-role.html',
  styleUrls: ['./roles.component.css']
})
export class DeleteRole {
  constructor(
    public dialogRef: MatDialogRef<DeleteRole>,
    @Inject(MAT_DIALOG_DATA) public data , private _service: AdminServiceService) {}

    onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    let tmp = {RoleId: this.data.RoleId};
    this._service.deleteRole(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }
}

//edit role
@Component({
  selector: 'edit-role',
  templateUrl: 'edit-role.html',
  styleUrls: ['./roles.component.css']
})
export class EditRole {

  editRolesForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditRole>,
    @Inject(MAT_DIALOG_DATA) public data, private _service: AdminServiceService ,  private fb: FormBuilder) {
      this.editRolesForm = this.fb.group({
        name: [{value: data.name, disabled: false}, Validators.required]
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    edit(){
      let tmp = {current_roleId: this.data.RoleId , new_role: this.editRolesForm.value.name};
      console.log(tmp);
      this._service.editRole(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    }

}

@Component({
  selector: 'set-permissions',
  templateUrl: 'setpermissions.html',
  styleUrls: ['./roles.component.css']
})
export class SetPermissions {
  checked: false;

  constructor(
    public dialogRef: MatDialogRef<SetPermissions>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private _service: AdminServiceService){
      console.log(this.data);
    }

  onNoClick():void {
    this.dialogRef.close();
  }

  add(){
    // console.log(this.data);
    let tmp = {
        roleId: this.data._id,
        permission: this.data.permissions[0].permissions
      };
      console.log(tmp);
    this._service.setPermissions(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }
}
