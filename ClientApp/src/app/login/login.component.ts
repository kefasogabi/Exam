import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  model: any = {};
  loading = false;
  returnUrl: string;
  invalidLogin = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,) { }

  ngOnInit() {
     
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

  login(form: NgForm) {
      this.userService.login(form.value)
          .subscribe(
              (data:any) => {
                localStorage.clear();
                localStorage.setItem('token', JSON.stringify(data.token));
                let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.router.navigate([returnUrl || 'staff/exam']);
                  // this.checkuser();
                 
              },
              error => {
                this.invalidLogin = true;
              });
  }

  
  // checkuser(){
  //   let currentUser = JSON.parse(localStorage.getItem('token'));
  //   if(currentUser.score == null)
  //   this.router.navigate(['/quiz']);
  //     else
     
  //     this.router.navigate(['/profile']);
  // }
    
}





