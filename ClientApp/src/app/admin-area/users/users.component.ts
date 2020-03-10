import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../Services/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
  users: User[] = [];
  public id = '';

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      
    };
    this.loadAllUsers();
  }

  setId(id) {
    this.id = id
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.users.splice(id, 1);
      this.loadAllUsers() 
   });
   this.toastr.warning("Deleted Successfully", " User");
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe((users:any) => { 
      this.users = users; 
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    });
}

}
