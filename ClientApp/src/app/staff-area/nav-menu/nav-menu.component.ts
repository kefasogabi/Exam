import { QuizService } from './../../Services/quiz.service';
import { AuthService } from './../../auth/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  currentUser: User;
  returnUrl: string;
  person ={};

  /**
   *
   */
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private auth:AuthService,
    private quizservice: QuizService,
  ) {}

 ngOnInit(){
  this.userService.getProfile().subscribe((data:any) => {
    this.person = data;
  });
 }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.clear();
    clearInterval(this.quizservice.timer);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}




}
