import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper  } from 'angular2-jwt'

@Injectable()
export class StaffGuard implements CanActivate {

  constructor(private route: Router, private auth: AuthService){}

  canActivate(
    route, 
    state: RouterStateSnapshot): boolean {
      
      if(this.auth.isAuthenticated()) return true;


      this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
