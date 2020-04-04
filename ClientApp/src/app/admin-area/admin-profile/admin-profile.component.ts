import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
person ={
  sex: {
    id: 0,
    name: ""
  },
};
  constructor(private account:AccountService) { }

  ngOnInit() {
    this.account.getUserProfile().subscribe((data:any)=>{
      this.person = data;
    });
  }

}
