import { RegisterViewModel } from './../../models/admin.model';
import { AccountService } from './../../Services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();

  users: RegisterViewModel[] = [];
  public id = '';


  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      
    };
    this.loadAllAdmins();
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

  deleteAdmin(id: number){
    this.accountService.delete(id).subscribe(()=>{
      this.users.splice(id, 1);
      this.loadAllAdmins();
    });
  }


  private loadAllAdmins()
  {
    this.accountService.getAll().subscribe((data:any)=>{
      this.users = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    })
  }
}
