import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  UserName(){
    var name = JSON.parse(localStorage.getItem('currentUser'));
    return name.username;
  }
  


  getAll() {
      return this.http.get( '/user', this.jwt()).map((response: Response) => response.json());
  }

  getById(id) {
      return this.http.get( '/user/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
      return this.http.post('/api/Register', user, this.jwt());
  }

  update(user: User) {
      return this.http.put( '/user/' + user.id, user, this.jwt());
  }

  delete(id: number) {
      return this.http.delete( '/user/' + id, this.jwt());
  }

  // private helper methods

  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }

}
