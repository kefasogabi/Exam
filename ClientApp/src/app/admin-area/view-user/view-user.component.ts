import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
person ={
  sex: {
    id: 0,
    name: ""
  },
};
  constructor(private userService: UserService,private route: ActivatedRoute ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe( (data:any) => {
      this.person = data
      console.log(this.person);
    });
   }

  ngOnInit() {
  }

}
