import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../Services/quiz.service';
import { Question } from '../../models/exam.model';


@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  question: Question;
  quest = {};
  
  constructor(private quizService: QuizService,private route: ActivatedRoute) { 

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.quizService.ViewQuestion(id).take(1).subscribe(data => this.quest = data );
    

  }

  ngOnInit() {
   
  }

//   viewQuestion(id){
//     this.quizService.ViewQuestion(id).subscribe( (question) => {
//       this.question = this.id;
//     })
//   }
}
