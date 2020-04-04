import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  person = {
    sex: {
      id: 0,
      name: ""
    },
  };
  
  constructor(private userService: UserService, private route: ActivatedRoute) {  }

  ngOnInit() {

    this.userService.getProfile().subscribe((data:any)=>{
      this.person = data;
    });
    
  }
  

}
