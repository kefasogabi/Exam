import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core'; 
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
 
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

  get isAdmin(){
   let  token = this.getToken();
   if(!token) return null;

   return new JwtHelper().decodeToken(token);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}

  // isAdmin(){
  //   let role = JSON.parse(localStorage.getItem('role'));

  //   if(role == "Admin") 
  //   return true;

  //   return false;
  // }

  

}
