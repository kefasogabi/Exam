import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BarChart: any;
  maleStaffs:any;
  femaleStaffs:any;
  allStaffs:any;
  adminGender:any;
  allAdmins: any;

  constructor(private accountService: AccountService, auth: AuthService) { }

  ngOnInit() {
    let sources = [
      this.accountService.getMaleStaffs(),
      this.accountService.getFemaleStaffs(),
      this.accountService.getAllStaffs(),
      this.accountService.getAdminGenders(),
      this.accountService.getAllAdmins()
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.maleStaffs = data[0];
      this.femaleStaffs = data[1];
      this.allStaffs = data[2];
      this.adminGender = data[3];
      this.allAdmins = data[4];

      this.BarChart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                label: `No of Admins`,
                data: this.adminGender,
                backgroundColor: [
                    '#17a2b8',
                    '#17a2b8'
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });



    });


   


  }

}
