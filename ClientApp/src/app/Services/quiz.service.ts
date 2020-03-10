import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions,Response, Headers, Http } from '@angular/http';
import { Question } from '../models/exam.model';

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
  constructor(private http: HttpClient) {}


 Questions(){
   return this.http.get('/api/Question');
 }

 ViewQuestion(id){
    return this.http.get('/api/Question/' + id);
 }
 
  updateQuestion(question:Question){
      return this.http.put('/api/question/' + question.id, question);
  }

  getQuestions(){ 
    return this.http.get('/api/Questions');
  } 
  

  delete(id: number) {
    return this.http.delete( '/api/Delete/' + id);
}

 
  displayTimeElapsed(){
    return Math.floor(this.seconds / 3600) + ':' + Math.floor((this.seconds % 3600) / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getAnswers(){
    var body = this.qns.map(x => x.id);
    return this.http.post('/api/answers', body);
  }

 
  submitScore(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     var body = JSON.parse(localStorage.getItem('currentUser'));
    body.Score =  this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.put('/user/' + this.currentUser.id, body, );

  }

  addQuestion(question:Question  ){
    return this.http.post('/api/Questions', question );
  }

}
