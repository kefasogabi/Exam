import { QuizService } from './../shared/quiz.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  currentUser: User;


  constructor( private quizService: QuizService,private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {

    if(parseInt(localStorage.getItem('qnProgress')) == 10){
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
    


    this.quizService.getAnswers().subscribe(
      (data: any) => {
        this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e,i) => {
           if(e.answer == data[i])
           this.quizService.correctAnswerCount++;
           e.correct = data[i];
        });
      }
    );
  }

  else
  if(parseInt(localStorage.getItem('qns')) === undefined)
  
    this.router.navigate(['/quiz']);
  
  }


  OnSubmit(){
    this.quizService.submitScore().subscribe(
      () => {
      this.done();
    });
  }


  done(){
    localStorage.setItem('qnProgress', "");
    localStorage.setItem('seconds', "");
    localStorage.setItem('qns', "");
    this.router.navigate(['/profile']);
  }

  checkuser(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.score != null)
      this.router.navigate(['/profile']);
      else
      this.router.navigate(['/quiz']);
      
  }

  
}
