import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient ) { }

  login(loginid: string, password: string) {
    var body ={
      loginid: loginid,
       password: password
    }
      return this.http.post('/api/Login', body)
          // .map((response: Response) => {
              // login successful if there's a jwt token in the response
              // let user = response.json();
              // if (user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
          //         localStorage.setItem('currentUser', JSON.stringify(user));
          //     }
          // });
  }
 
  isLoggedIn(){

    return tokenNotExpired();
  
  }
  

}
