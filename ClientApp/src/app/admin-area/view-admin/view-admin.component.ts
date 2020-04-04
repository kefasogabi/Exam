import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  person ={
    sex: {
      id: 0,
      name: ""
    },
  };
  constructor(private toastr: ToastrService,
              private route: ActivatedRoute,
              private account: AccountService,
              ) { 
          let id = this.route.snapshot.paramMap.get('id');
                if (id) this.account.getById(id).take(1).subscribe((data:any) => {
                  this.person = data
                }); 
  }

  ngOnInit() {
  }

}
