import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user:User;
  sex: any[];
  loginId:any = "";


  constructor(private userService: UserService,
              private spinner: NgxSpinnerService, 
              private toastr: ToastrService,) { }

  ngOnInit() {
    this.userService.getSex().subscribe((data:any)=>{
      this.sex = data;
    });
  }

  getStaff(){
    this.spinner.show();
    this.userService.getStaff(this.loginId).subscribe((data:any)=>{
      this.user = data;
      console.log(this.user);
      this.spinner.hide();
    },error =>{
      if(error.status === 404)
        this.toastr.error(error._body, 'Error');
        this.spinner.hide();
    });
  }

}
