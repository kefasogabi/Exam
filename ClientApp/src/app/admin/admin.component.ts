import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  person = {};
  currentUser: User;
  users: User[] = [];
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe(data => this.person = data );
  }

  ngOnInit() {
    // this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 10
    //   };
      this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.users.splice(id, 1);
      this.loadAllUsers() 
   });
   this.toastr.warning("Deleted Successfully", " User");
  }
   
  private loadAllUsers() {
      this.userService.getAll().subscribe(users => { 
        this.users = users; 
        this.dtTrigger.next(); 
      });
  }

 
}
