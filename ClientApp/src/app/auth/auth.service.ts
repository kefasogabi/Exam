import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core'; 
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
 
  role:any;
  
  public getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

  

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}

  public isAdmin(): boolean {
    let role = JSON.parse(localStorage.getItem('role'));

    if(role == "Admin") 
    return true;

    return false;
  }

  

}
