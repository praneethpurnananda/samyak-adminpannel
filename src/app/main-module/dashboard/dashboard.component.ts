import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { AdminServiceService } from "../../admin-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart = [];
  userDetails;
  paymentDetails;
  constructor(private _service: AdminServiceService) {

  }

  ngOnInit(): void {
    this._service.getDashboardUserDetails()
    .subscribe(
      data => {
        this.userDetails = data;
        console.log(data)
      },
      error => console.log(error.error.message)
    );

    this._service.getDashboardPaymentDetails()
    .subscribe(
      data => {
        this.paymentDetails = data;
        console.log(data)
      },
      error => console.log(error.error.message)
    );
    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: ['a','b','c','d'],
    //     datasets: [
    //       {
    //         label: 'My first dataset',
    //         data: [1,3,5,10],
    //         backgroundColor: 'red',
    //         borderColor: 'red',
    //         fill: false
    //       },
    //       {
    //         label: 'My second dataset',
    //         data: [1,5,4,15],
    //         backgroundColor: 'blue',
    //         borderColor: 'blue',
    //         fill: false
    //       }
    //     ]
    //   },
    //   // options: options
    // });
  }



}
