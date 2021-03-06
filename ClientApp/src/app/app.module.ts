import { EdituserComponent } from './admin-area/edituser/edituser.component';
import { AccountService } from './Services/account.service';
import { LoginComponent } from './login/login.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './staff-area/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './staff-area/quiz/quiz.component';
import { AddQuestionComponent } from './admin-area/add-question/add-question.component';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewQuestionComponent } from './admin-area/view-question/view-question.component';
import { ViewUserComponent } from './admin-area/view-user/view-user.component';
import { StaffAreaComponent } from './staff-area/staff-area.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { ResultComponent } from './staff-area/result/result.component';
import { QuestionsComponent } from './admin-area/questions/questions.component';
import { QuizService } from './Services/quiz.service';
import { UserService } from './Services/user.service';
import { AuthService } from './auth/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './admin-area/dashboard/dashboard.component';
import { ProfileComponent } from './staff-area/profile/profile.component';
import { AdminNavComponent } from './admin-area/admin-nav/admin-nav.component';
import { AddAdminComponent } from './admin-area/add-admin/add-admin.component';
import { UsersComponent } from './admin-area/users/users.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AppErrorHandler } from './app-error-handler';
import { AdminsComponent } from './admin-area/admins/admins.component';
import { ChangePasswordComponent } from './admin-area/change-password/change-password.component';
import { SearchComponent } from './admin-area/search/search.component';
import { AdminGuard } from './auth/admin-guard';
import { BrowserModule } from '@angular/platform-browser';
import { StaffGuard } from './auth/Staff-guard';
import { EditAdminComponent } from './admin-area/edit-admin/edit-admin.component';
import { ViewAdminComponent } from './admin-area/view-admin/view-admin.component';
import { AdminProfileComponent } from './admin-area/admin-profile/admin-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    QuizComponent,
    AddQuestionComponent,
    ProfileComponent,
    ViewQuestionComponent,
    ViewUserComponent,
    StaffAreaComponent,
    AdminAreaComponent,
    ResultComponent,
    QuestionsComponent,
    AdminLoginComponent,
    LoginComponent,
    DashboardComponent,
    AdminNavComponent,
    AddAdminComponent,
    UsersComponent,
    AdminsComponent,
    ChangePasswordComponent,
    SearchComponent,
    EdituserComponent,
    EditAdminComponent,
    ViewAdminComponent,
    AdminProfileComponent
    
   

    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DataTablesModule,
    HttpModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([

      // { path: '', redirectTo: '/register', pathMatch: 'full'},
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'admin/login', component: AdminLoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent},

      /// Staff Routes
      { path: 'staff/exam', component: StaffAreaComponent, canActivate:[StaffGuard],
        children: [{ path: '', component: QuizComponent, canActivateChild:[StaffGuard] }]
      },
      { path: 'staff/profile', component: StaffAreaComponent,canActivate:[StaffGuard],
        children: [{path: '', component: ProfileComponent, canActivateChild:[StaffGuard]}]
      },

      /// Admin Routes
      
      { path: 'result', component: StaffAreaComponent,canActivate:[StaffGuard],
        children: [{ path: '', component: ResultComponent, canActivateChild:[StaffGuard]}]
      },
      { path: 'addquestion', component: AdminAreaComponent,canActivate:[AdminGuard],
        children: [{ path: '', component: AddQuestionComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'question', component: AdminAreaComponent, canActivate:[StaffGuard],
        children:  [{ path: '', component: QuestionsComponent, canActivateChild:[StaffGuard]}]
      },
      { path: 'Editquestion/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: AddQuestionComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/dashboard', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: DashboardComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'ViewQuestion/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: ViewQuestionComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'ViewUser/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: ViewUserComponent, canActivateChild:[StaffGuard] }]
      },
      { path: 'EditUser/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: EdituserComponent, canActivateChild:[AdminGuard]}]
      },
      
      { path: 'admin/register', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: AddAdminComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/users', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: UsersComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/edit/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: EditAdminComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/view/:id', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: ViewAdminComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/admins', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: AdminsComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/change-password', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: ChangePasswordComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/register-staff', component: AdminAreaComponent,
        children: [{ path: '', component: RegisterComponent}]
      },
      { path: 'admin/search-staff', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: SearchComponent, canActivateChild:[AdminGuard]}]
      },
      { path: 'admin/profile', component: AdminAreaComponent, canActivate:[AdminGuard],
        children: [{ path: '', component: AdminProfileComponent, canActivateChild:[AdminGuard]}]
      },

    ])
  ],
  providers: [
    QuizService,
    StaffGuard,
    UserService,
    AuthService,
    AdminGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
