import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../shared/authentication.service';
import { AlertService } from '../../shared/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }

  ngOnInit() {
     
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.loginid, this.model.password)
          .subscribe(
              data => {
                localStorage.clear();
                localStorage.setItem('currentUser', JSON.stringify(data));
                  this.checkuser();
                 
              },
              error => {
                  this.alertService.error('LoginId or password is incorrect');
                  this.loading = false;
              });
  }

  
  checkuser(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.score == null)
    this.router.navigate(['/quiz']);
      else
     
      this.router.navigate(['/profile']);
  }
    
}





