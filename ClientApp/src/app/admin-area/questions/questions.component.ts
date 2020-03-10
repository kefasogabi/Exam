import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { QuizService } from '../../Services/quiz.service';
import { Question } from '../../models/exam.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements  OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
   
  questions: Question[] = [];
  public id = '';
 

  constructor(private quizService: QuizService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
    };
    this.loadAllQuestions(); 
  }

  setId(id) {
    this.id = id
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
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  private loadAllQuestions(){
    this.quizService.Questions().subscribe((data:any)  => {
      this.questions = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    });
   
  }

}
