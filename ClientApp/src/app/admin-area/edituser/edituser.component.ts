import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { EditUser } from '../../models/user.model';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
model ={};
editUser: EditUser;
sex: any[];

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private route: ActivatedRoute,            
              ) { 
                let id = this.route.snapshot.paramMap.get('id');
                if (id) this.userService.getById(id).take(1).subscribe((data:any) => {
                  this.model = data
                });
              }

  ngOnInit() {
    this.userService.getSex().subscribe((data:any) =>{
      this.sex = data;
    })
    this.resetForm()
  }

  onUpdate(form: NgForm){
      this.userService.update(form.value).subscribe(data => {
        this.resetForm(form);
        
        this.toastr.success('Updated Successfully', 'User');
      })
  }

  resetForm(form? : NgForm){
    
    if(form != null)
    form.reset();
    this.editUser ={
      id: null,
      loginid: '',
      username: '',
      email: '',
      phone: '',
      score: '',
      timeSpent: '',
    }
  }

}
