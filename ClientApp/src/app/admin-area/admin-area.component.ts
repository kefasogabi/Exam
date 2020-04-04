import { AccountService } from './../Services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
 user ={};
  constructor( private account:AccountService) { }

  ngOnInit() {
    this.account.getUserProfile().subscribe((data:any) => { this.user = data});
  }

}
