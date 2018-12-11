
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper  } from 'angular2-jwt'

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(currentUser && currentUser.role)
    return true;
      this.route.navigate(['/admin-login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
