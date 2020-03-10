import { HttpClient } from '@angular/common/http';
import { userLogin } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(login:userLogin) {
    return this.http.post('/api/Login', login);
  }
 
  getAll() {
      return this.http.get( '/user');
  }

  getById(id) {
      return this.http.get( '/user/' + id);
  }

  create(user: User) {
      return this.http.post('/api/Register', user);
  }

  update(user: User) {
      return this.http.put( '/user/' + user.id, user);
  }

  delete(id: number) {
      return this.http.delete( '/user/' + id);
  }
  getSex(){
    return this.http.get('/api/sex');
  }

  getStaff(loginId){
    return this.http.get('/api/GetStaff/'+ loginId);
  }


}
