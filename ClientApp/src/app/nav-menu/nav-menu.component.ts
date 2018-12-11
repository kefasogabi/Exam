import { JwtHelper } from 'angular2-jwt';
import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: User;
  returnUrl: string;

  /**
   *
   */
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }

  getUserId(id : number){
    this.userService.getById(id).subscribe(data => {
     this.router.navigate(['/profile', 'id']);
    })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
    localStorage.removeItem('seconds')
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

isLoggedIn(){
  let jwtHelper = new JwtHelper();
  let token = localStorage.getItem("currentUser");

if(!token)
return false

  return true;
}

isAdmin(){
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(!currentUser.role)
  return false;
  
  return true;
}


  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
