import { AdminService } from './shared/admin.service';
import { AuthenticationService } from './shared/authentication.service';
import { AlertService } from './shared/alert.service';
import { UserService } from './shared/user.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './auth/auth.guard';
import { QuizService } from './shared/quiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AlertComponent } from './alert/alert.component';
import { Http, HttpModule } from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLoginComponent } from './main-login/main-login.component';
import { LoginComponent } from './main-login/login/login.component';
import { AdminLoginComponent } from './main-login/admin-login/admin-login.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdminAuthGuard } from './auth/adminauth.guard';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    AddQuestionComponent,
    AlertComponent,
    AdminComponent,
    ProfileComponent,
    QuestionsComponent,
    AdminLoginComponent,
    MainLoginComponent,
    ViewQuestionComponent,
    ViewUserComponent,
    EdituserComponent,
   

    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DataTablesModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent},
      { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
      { path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
      { path: '', redirectTo: '/register', pathMatch: 'full'},
      { path: 'addquestion', component: AddQuestionComponent, canActivate: [ AdminAuthGuard], },
      { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard || AdminAuthGuard]},
      { path: 'question', component: QuestionsComponent, canActivate: [ AdminAuthGuard]},
      { path: 'login', component: MainLoginComponent, 
        children:[{ path: '', component: LoginComponent}]
      },
      { path: 'admin-login', component: MainLoginComponent, 
        children:[{ path: '', component: AdminLoginComponent}]
      },
      { path: 'Editquestion/:id', component: AddQuestionComponent, canActivate: [AdminAuthGuard]},
      { path: 'ViewQuestion/:id', component: ViewQuestionComponent, canActivate: [AdminAuthGuard]},
      { path: 'ViewUser/:id', component: ViewUserComponent, canActivate: [AdminAuthGuard]},
      { path: 'EditUser/:id', component: EdituserComponent, canActivate: [AdminAuthGuard]}

    ])
  ],
  providers: [
    QuizService,
    AuthGuard,
    UserService,
    AlertService,
    AuthenticationService,
    AdminService,
    AdminAuthGuard
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
