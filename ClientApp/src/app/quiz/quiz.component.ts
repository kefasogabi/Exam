import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { QuizService } from '../shared/quiz.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService, private userService: UserService) { }

  person ={};
  ngOnInit() {

     if ( parseInt(localStorage.getItem('seconds')) > 0 ){
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if(this.quizService.qnProgress == 10)
      
      this.router.navigate(['/result']);
      // else
      // this.startTimer();
    }
    else{

      this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.quizService.getQuestions().subscribe(
      (data: any) => {
       this.checkuser();
        this.quizService.qns = data;
        this.checkuser();
        this.startTimer();
        
      }
    );

    }

  
  }


  startTimer(){
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

Answer(Id, choice){
  this.quizService.qns[this.quizService.qnProgress].answer = choice;
  localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
  this.quizService.qnProgress++;
  localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
  if(this.quizService.qnProgress == 10){
    clearInterval(this.quizService.timer);
    this.router.navigate(['/result']);
  }

} 

checkuser(){
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let id = currentUser.id
  

  this.userService.getById(id).take(1).subscribe( data => this.person = data);

  if(currentUser.score != null)
    this.router.navigate(['/profile']);
    else
    this.router.navigate(['/quiz']);
    
}

}
