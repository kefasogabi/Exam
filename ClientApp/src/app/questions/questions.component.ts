import { ToastrService } from 'ngx-toastr';
import { Question } from './../shared/user.model';
import { QuizService } from './../shared/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements  OnInit {
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  questions: Question[] = [];
  index: number;
 

  constructor(private quizService: QuizService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   responsive: true,
      
    // };
    this.loadAllQuestions(); 
  }

 
  
  deleteQuestion(id: number){
    this.quizService.delete(id).subscribe(()=>{ 
      this.loadAllQuestions();
      this.questions.splice(id, 1);
      });
   
      this.toastr.warning("Deleted Successfully", " Qestion");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  private loadAllQuestions(){
    this.quizService.Questions().subscribe(questions => {
      this.questions = questions;
      

      this.dtTrigger.next(); });
   
  }

}
