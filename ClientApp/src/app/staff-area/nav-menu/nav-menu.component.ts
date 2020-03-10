import { AuthService } from './../../auth/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../Services/user.service';

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
    private router: Router, private auth:AuthService
  ) {}

 

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.clear();
    localStorage.removeItem('seconds')
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}




}
