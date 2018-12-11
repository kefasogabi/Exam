import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/admin.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;


 constructor(
      private route: ActivatedRoute,
      private router: Router,
      private adminService: AdminService,
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
    this.adminService.login(this.model.loginid, this.model.password)
        .subscribe(
            data => {
              localStorage.clear();
              localStorage.setItem('currentUser', JSON.stringify(data));
                this.checkAmin();
              
            },
            error => {
                this.alertService.error('LoginId or password is incorrect');
                this.loading = false;
            });
}


checkAmin(){
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser.role)
    this.router.navigate(['/admin']);
   
  
}

}
