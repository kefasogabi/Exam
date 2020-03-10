import { AccountService } from './../../Services/account.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any ={};
  invalidCredentials = false;

  constructor(private accountService: AccountService,
              private router: Router, 
              private toastr: ToastrService,) { }

  ngOnInit() {
  }

  ChangePassword(form:NgForm){
    this.accountService.changePassword(form.value).subscribe((data:any)=>{
      this.toastr.success('Password Succesfully changed', 'Success');
      // this.router.navigate(['']);
    },
    error => {
      this.invalidCredentials = true;
      this.toastr.success('Password Succesfully changed', 'Success');
    });
  }

}
