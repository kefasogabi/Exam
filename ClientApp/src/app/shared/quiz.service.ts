import { User, Question } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions,Response, Headers, Http } from '@angular/http';

@Injectable()
export class QuizService {
  //=======Properties============
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  currentUser:User;
 question: any;
  
  //=======Helper Methods========
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  //=======Http Methods==========

 Questions(){
   return this.http.get('/api/Question', this.jwt()).map((response) => response.json());
 }

 ViewQuestion(id){
    return this.http.get('/api/Question/' + id, this.jwt()).map((response) => response.json());
 }
 
  updateQuestion(question:Question){
    // var body = JSON.stringify(question);

      return this.http.put('/api/question/' + question.id, question, this.jwt()).map(res => res.json());
  }

  getQuestions(){ 
  
    return this.http.get('/api/Questions', this.jwt()).map((response: Response) => response.json());

  } 
  

  delete(id: number) {
    return this.http.delete( '/api/Delete/' + id, this.jwt());
}

 
  displayTimeElapsed(){
    return Math.floor(this.seconds / 3600) + ':' + Math.floor((this.seconds % 3600) / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getAnswers(){
    var body = this.qns.map(x => x.id);
    return this.http.post('/api/answers', body, this.jwt()).map((response: Response) => response.json());
  }

 
  submitScore(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     var body = JSON.parse(localStorage.getItem('currentUser'));
    body.Score =  this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    
   

    return this.http.put('/user/' + this.currentUser.id, body, this.jwt());

  }

  addQuestion(question:Question  ){
    // const body: Question ={
    //   qn: question.qn,
    //   option1: question.option1,
    //   option2: question.option2,
    //   option3: question.option3,
    //   option4: question.option4,
    //   answer: question.answer
    // }

    return this.http.post('/api/Questions', question, this.jwt());
  }

 


  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
    }
}





}
