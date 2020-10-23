import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from "../../admin-service.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css' , '../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;
  hide:boolean = true;
  msg;
  isLoad:boolean = false;

  constructor(private fb: FormBuilder, private _service: AdminServiceService,private router: Router,private _snackBar: MatSnackBar) {
    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.email , Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  submit(){
    this.isLoad = true;
    this.openSnackBar('Sending Instructions to given mailId...');
    this._service.forgotPassword(this.forgotpasswordForm.value)
    .subscribe(
      data => {
        this.openSnackBar('Sending Mail...');
        this.router.navigate(['/']);
        this._snackBar.dismiss();
      },
      error => {
        console.log(error);
        this.msg = error.error.message;
        this.openSnackBar('Oops Something went wrong ...');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000);
      }
    );
    setTimeout(() => {
      this.isLoad = false;
    }, 2000);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

}
