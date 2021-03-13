import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from "../../admin-service.service";
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-samyak-payments',
  templateUrl: './samyak-payments.component.html',
  styleUrls: ['./samyak-payments.component.css' , '../../users/samyak-users/samyak-users.component.css']
})
export class SamyakPaymentsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'Name' ,'College', 'Branch', 'Year'  , 'College Id' , 'Payment id' ];
  paymentsData;
  dataSource;
  filterForm:FormGroup;
  constructor(private _service : AdminServiceService,private fb:FormBuilder) {
    this.filterForm = this.fb.group({
      college:[''],
      branch:[''],
      current_year:['']
    });
   }

  ngOnInit(): void {
    this._service.paymentsData()
    .subscribe(
      data => {
        this.paymentsData = data['payments'];
        this.dataSource = this.paymentsData;
        console.log(this.dataSource[0].user[0].name);
      },
      error => console.log(error)
    );
  }

  filterUsers () {
    this.dataSource=this.paymentsData;
    let filter=this.filterForm.value;
    for (var prop in filter) {
      if(filter[prop]===""){
        continue;
      }
      else{
        this.dataSource=this.dataSource.filter(x => x.user[0][prop]==filter[prop]);
      }
    }
  }
}

//email , samyak_id , name , payment success/failerut ,, via billed , instrument , payment id , amout
