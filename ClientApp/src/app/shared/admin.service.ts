import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient ) { }

  login(loginid: string, password: string) {
    var body ={
      loginid: loginid,
       password: password
    }
      return this.http.post('/api/admin/Login', body)
          // .map((response: Response) => {
              // login successful if there's a jwt token in the response
              // let user = response.json();
              // if (user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
          //         localStorage.setItem('currentUser', JSON.stringify(user));
          //     }
          // });
  }

}
