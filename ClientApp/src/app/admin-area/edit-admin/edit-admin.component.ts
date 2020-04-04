import { NgForm } from '@angular/forms';
import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  model ={};
  sex: any[];
  constructor(private toastr: ToastrService,
              private route: ActivatedRoute,
              private account: AccountService,
              ) { 
          let id = this.route.snapshot.paramMap.get('id');
                if (id) this.account.getById(id).take(1).subscribe((data:any) => {
                  this.model = data
                }); 
  }

  ngOnInit() {
    this.account.getSex().subscribe((data:any) =>{
      this.sex = data;
    })
  }

  onUpdate(form: NgForm){
    this.account.update(form.value).subscribe((data:any) => {
      
      this.toastr.success('Updated Successfully', 'User');
    })
}

}
