
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper  } from 'angular2-jwt'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if(localStorage.getItem('currentUser') != null)
    return true;
      this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
