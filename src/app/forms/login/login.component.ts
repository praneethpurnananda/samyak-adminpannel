import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from "../../admin-service.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide:boolean = true;
  msg;
  isLoad:boolean = false;

  constructor(private fb: FormBuilder, private _service: AdminServiceService,private router: Router,private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email , Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(){
    this.isLoad = true;
    this.openSnackBar('Validating...');
    this._service.login(this.loginForm.value)
    .subscribe(
      data => {
        this.openSnackBar('Almost Done ...');
        localStorage.setItem('token',data['token'].toString());
        this.router.navigate(['/admin/dashboard']);
        this._snackBar.dismiss();
      },
      error => {
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

  ngOnInit(): void {
  }

}
