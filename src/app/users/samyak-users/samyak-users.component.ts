import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-samyak-users',
  templateUrl: './samyak-users.component.html',
  styleUrls: ['./samyak-users.component.css']
})
export class SamyakUsersComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name' ,'samyak_id', 'email', 'mobile' , 'college' , 'college_id' , 'email_verified', 'more'];
  data = [
    {position: 1, name: 'Purnananda Praneeth', samyak_id: 'SMK2K2000000', email: 'praneeth.mandalemula@gmail.com', mobile: '8977190130', college: 'KLU', college_id: '180030660', email_verified: true, isDisabled: false},
    {position: 2, name: 'Bhaskar Praveen', samyak_id: 'SMK2K2000001', email: 'praveennaidu264@gmail.com', mobile: '5464877285', college: 'KLU', college_id: '180030026', email_verified: false, isDisabled: true},
  ]
  dataSource = this.data;
  constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

edit(element){
  const dialogRef = this.dialog.open(EditUsers, {
    width: '900px',
    data: {name: element.name , samyak_id: element.samyak_id , email: element.email , mobile: element.mobile , college: element.college , college_id: element.college_id},
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

conformDelete(element): void{
  this._bottomSheet.open(ConformDelete, {
    data: {name: element.name , samyak_id: element.samyak_id , email: element.email , mobile: element.mobile , college: element.college , college_id: element.college_id},
  })
}

moreinfo(element){
  const dialogRef = this.dialog.open(MoreInfo, {
    width: '900px',
    data: {name: element.name , samyak_id: element.samyak_id , email: element.email , mobile: element.mobile , college: element.college , college_id: element.college_id},
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

disable(element){
  this.data.find(x => x.samyak_id == element.samyak_id).isDisabled = true;
}
enable(element){
  this.data.find(x => x.samyak_id == element.samyak_id).isDisabled = false;
}

}

@Component({
  selector: 'conform',
  templateUrl: 'conform.html',
  styleUrls: ['./samyak-users.component.css']
})
export class ConformDelete {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    console.log(data);
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
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {
      // console.log(data);

      this.editForm = this.fb.group({
        name: [{value: data.name , disabled: false}, Validators.required],
        samyak_id: [{value: data.samyak_id , disabled: true}, Validators.required],
        email: [{value: data.email , disabled: true}, Validators.required],
        mobile: [{value: data.mobile , disabled: false}, Validators.required],
        college: [{value: data.college , disabled: false}, Validators.required],
        college_id: [{value: data.college_id , disabled: false}, Validators.required]
      });
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
