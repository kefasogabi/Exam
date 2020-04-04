import { AuthService } from './../auth/auth.service';
import { AccountService } from './../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { UserService } from '../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class  RegisterComponent implements OnInit  {

  
  sex: any[];
  model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService, 
        private auth: AuthService,
        private route: ActivatedRoute,) {
          let id = this.route.snapshot.paramMap.get('id');
                if (id) this.userService.getById(id).take(1).subscribe(data => this.model = data );
        }

        ngOnInit() {
         
          this.userService.getSex().subscribe((data:any) =>{
            this.sex = data;
          })
        }

    register(form: NgForm) {
        this.spinner.show();
        this.userService.create(form.value).subscribe(
                (data: any) => {
                    this.toastr.success('Registration Successfull', 'Success');
                    if(this.auth.isAdmin.role){
                      this.router.navigate(['/admin/dashboard'])
                    }else{
                    this.router.navigate(['/login']);
                  }
                    this.spinner.hide();
                },
                error => {
                    this.toastr.error(error._body, 'Error');
                    this.spinner.hide();
                });
    }

 


 

}
