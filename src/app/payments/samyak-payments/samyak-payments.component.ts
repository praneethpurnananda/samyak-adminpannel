import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from "../../admin-service.service";

@Component({
  selector: 'app-samyak-payments',
  templateUrl: './samyak-payments.component.html',
  styleUrls: ['./samyak-payments.component.css' , '../../users/samyak-users/samyak-users.component.css']
})
export class SamyakPaymentsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name' ,'samyak_id', 'email', 'payment_id'  , 'bill_via' , 'amount' ,'status'];
  paymentsData;
  dataSource;
  constructor(private _service : AdminServiceService) { }

  ngOnInit(): void {
    this._service.paymentsData()
    .subscribe(
      data => {
        console.log(data);
        this.paymentsData = data['payments'];
        this.dataSource = this.paymentsData;
        console.log(this.dataSource);
      },
      error => console.log(error)
    );
  }

}

//email , samyak_id , name , payment success/failerut ,, via billed , instrument , payment id , amout
