import { ActivatedRoute } from '@angular/router';
import { Question } from './../shared/user.model';
import { QuizService } from './../shared/quiz.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  question: Question;
  quest = {};
 

  constructor( private quizService: QuizService,
               private toastr: ToastrService,
               private route: ActivatedRoute,
              ) { 
               let id = this.route.snapshot.paramMap.get('id');
                if (id) this.quizService.ViewQuestion(id).take(1).subscribe(q => this.quest = q );
              }

  ngOnInit() {
    this.resetForm()
  }

 
  onSubmit(form: NgForm){
    
    if(form.value.id != null){
      this.quizService.updateQuestion(form.value).subscribe(data => {
        
        this.resetForm(form);
        this.toastr.success('Updated Successfully', 'Question');
       });
       
    }
    else{
      this.quizService.addQuestion(form.value).subscribe( data => {
        this.resetForm(form);
        this.toastr.success('Submitted Successfully', 'Question');
      });
    
    }
   
     
   

  
   
  }
  

  resetForm(form? : NgForm){
    
    if(form != null)
    form.reset();
    this.question ={
      id: null,
      qn: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
    }
  }

}
