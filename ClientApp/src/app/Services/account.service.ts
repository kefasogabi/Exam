import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { RegisterViewModel, Login, ChangePassword } from '../models/admin.model';

@Injectable()
export class AccountService {
  

  constructor(private http: HttpClient) { }

  login(login:Login) {
    return this.http.post('/Account/Login', login);
  }

getAll(){
  return this.http.get('/Account/GetAll' );
}

getById(id){
  return this.http.get('/Account/GetById/' + id);
}

  create(user: RegisterViewModel) {
    return this.http.post('/Account/Register', user);
}

update(user: RegisterViewModel){
  return this.http.put('/Account/Update/'+ user.id, user);
}

delete(id){
  return  this.http.delete('/Account/Delete/' + id);
 }

 changePassword(user:ChangePassword){
  return this.http.post('/Account/ChangePassword', user);
}

getUserProfile(){
  return this.http.get('/Account/Profile');
}

getSex(){
  return this.http.get('/api/sex');
}

getMaleStaffs(){
  return this.http.get('/api/maleStaffs');
}

getFemaleStaffs(){
  return this.http.get('/api/femaleStaffs');
}

getAllStaffs(){
  return this.http.get('/api/allStaffs');
}

getAllAdmins(){
  return this.http.get('/api/allAdmins');
}

getAdminGenders(){
  return this.http.get('/api/adminGenders');
}

private jwt() {
  // create authorization header with jwt token
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
  }
}

}
