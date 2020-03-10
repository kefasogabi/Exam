import { NgForm } from '@angular/forms';
import { AccountService } from './../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  model: any = {};
  invalidLogin = false;
  returnUrl: string;


 constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService:AccountService,) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.accountService.login(form.value)
        .subscribe(
            (data:any) => {
              localStorage.clear();
              localStorage.setItem('token', JSON.stringify(data.token));
              localStorage.setItem('role', JSON.stringify(data.role));
              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              this.router.navigate([returnUrl || '/admin/dashboard']);
            },
            error => {
              this.invalidLogin = true;
            });
}


// checkAmin(){
//   let currentUser = JSON.parse(localStorage.getItem('token'));
//   if(currentUser.role)
//     this.router.navigate(['/admin/dashboard']);
   
  
// }

}
