import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
person ={};
  constructor(private userService: UserService,private route: ActivatedRoute ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe(data => this.person = data );
   }

  ngOnInit() {
  }

}
