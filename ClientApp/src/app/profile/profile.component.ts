import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new User;
  id: number;
  person = {};
  constructor(private userService: UserService, private route: ActivatedRoute) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id = currentUser.id
    if (id) this.userService.getById(id).take(1).subscribe(data => this.person = data );
   }

  ngOnInit() {
    
  }
  
getUserId(id : number){
 
    this.userService.getById(id).subscribe((user) => {
        this.user = user;
    })
    
}

}
