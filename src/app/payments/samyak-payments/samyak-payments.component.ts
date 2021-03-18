import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from "../../admin-service.service";
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-samyak-payments',
  templateUrl: './samyak-payments.component.html',
  styleUrls: ['./samyak-payments.component.css' , '../../users/samyak-users/samyak-users.component.css']
})
export class SamyakPaymentsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'Name' ,'College', 'Branch', 'Year','Payment Date','College Id', 'Payment id' ];
  paymentsData;
  dataSource;
  filterForm:FormGroup;
  fileName= 'PaymentsData.xlsx';
  isLoading:boolean = true;
  //isFiltering:boolean = false;
  constructor(private _service : AdminServiceService,private fb:FormBuilder) {
    this.filterForm = this.fb.group({
      college:[''],
      branch:[''],
      current_year:['']
    });
   }

  ngOnInit(): void {
    //this.isFiltering = false;
    this.isLoading = true;
    this._service.paymentsData()
    .subscribe(
      data => {
        this.isLoading = false;
        this.paymentsData = data['payments'];
        this.dataSource = this.paymentsData;
      },
      error =>{
        this.isLoading = false;
        console.log(error)
       }
    );
  }

  //export to excel
  exportexcel(): void {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
    }


  filterPayments () {
    //this.isFiltering = true;
    this.dataSource=this.paymentsData;
    let filter=this.filterForm.value;
    for (var prop in filter) {
      if(filter[prop]===""){
        continue;
      }
      else{
        this.dataSource=this.dataSource.filter(x => x.user[0][prop]==filter[prop]);
        //this.isFiltering = false;
      }
    }

  }
}

//email , samyak_id , name , payment success/failerut ,, via billed , instrument , payment id , amout
