import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  sex: any[];
  model: any = {};

  constructor(private accountService:AccountService, 
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.accountService.getSex().subscribe((data:any) =>{
      this.sex = data;
    })
  }

  register(form: NgForm) {
    this.spinner.show();
    this.accountService.create(form.value).subscribe(
            (data: any) => {
                this.toastr.success('Registration Successfull', 'Success');
                this.spinner.hide();
            },
            error => {
                this.toastr.error(error._body, 'Error');
                this.spinner.hide();
            });
  }
  
}
