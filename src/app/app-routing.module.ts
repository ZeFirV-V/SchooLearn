import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageWeb } from "./pages/home/home.page.web";
import { AboutPageWeb } from "./pages/about/about.page.web";
import {TasksPage} from "./pages/tasks/tasks.page.web";
import { RatingPageWeb } from "./pages/rating/rating.page.web";
import { FAQPageWeb } from "./pages/FAQ/FAQ.page.web";
import {PrivateOfficePageWeb} from "./pages/private-office/private-office.page.web";
import {LoginPageWeb} from "./pages/login/login.page.web";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";
import {Role} from "./modules/auth/enums/role.enum";
import {SubjectsPageWeb} from "./pages/tasks/childrens/subjects/subjects.page.web";
import {TasksPageWeb} from "./pages/tasks/childrens/tasks-home/tasks.component";
import {TaskPageWeb} from "./pages/tasks/childrens/task/task.page.web";
import {
  RegistrationStudentComponent
} from "./pages/registration/children/registration-student/registration-student/registration-student.component";
import {
  RegistrationTeacherComponent
} from "./pages/registration/children/registration-teacher/teacher-organization/registration-teacher.component";
import {StudentComponent} from "./pages/private-office/student/student.component";
import {
  ViewSolvedTaskPageComponent
} from "./pages/tasks/childrens/view-solved-task-page/view-solved-task-page.component";
import {TeacherComponent} from "./pages/private-office/teacher/teacher.component";
import {CreateTaskComponent} from "./pages/tasks/childrens/create-task/create-task.component";
import {CreateSubjectComponent} from "./pages/tasks/childrens/create-subject/create-subject.component";
import {CreateGroupComponent} from "./pages/tasks/childrens/create-group/create-group.component";
import {
  RegistrationAdminComponent
} from "./pages/registration/children/registration-admin/registration-admin.component";
import {
  RegistrationCompanyPageComponent
} from "./pages/registration/children/registration-organization/registration-company-page/registration-company-page.component";
import {
  ViewAssignedTaskPageComponent
} from "./pages/tasks/childrens/view-assigned-task-page/view-assigned-task-page.component";
import {SubjectResolver} from "./modules/info-lk/subject.resolver";
import {ChangeNicknameComponent} from "./components/change-nickname/change-nickname.component";

const tasksRoutes: Routes = [
  { path: '', component: TasksPageWeb},
  { path: ':subjectId', component: TaskPageWeb, resolve: { validSubject: SubjectResolver } },

  { path: 'view-solved-task/:taskId', component: ViewSolvedTaskPageComponent },
  { path: 'view-assigned-task/:taskId', component: ViewAssignedTaskPageComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'create/subject', component: CreateTaskComponent },
  { path: 'create/subject/group/:subjectId', component: CreateGroupComponent, resolve: { validSubject: SubjectResolver } },

  // children: [
  //     {path: '', component: CreateTaskComponent, pathMatch: "full"},
  //     {path: 'subject', component: CreateSubjectComponent},
  //     {path: 'group/:subjectId', component: CreateGroupComponent, resolve: { validSubject: SubjectResolver }},
  //
  //   ]
  // },
];

const registrationRoutes: Routes = [
  { path: 'teacher', component: RegistrationTeacherComponent },
  { path: 'admin', component: RegistrationAdminComponent },
  { path: 'student', component: RegistrationStudentComponent },
  { path: 'company', component: RegistrationCompanyPageComponent},
  // { path: '', redirectTo: '/**', pathMatch: "full"},
];

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', component: HomePageWeb},
      {path: 'about', component: AboutPageWeb},
      {path: 'tasks', component: TasksPage, children: tasksRoutes},

      {path: 'rating', component: RatingPageWeb},
      {path: 'FAQ', component: FAQPageWeb},
      // {path: 'lk', component: lkPage, children: lkRoutes},
      {
        path: 'lk-student',
        canActivate: [AuthGuard],
        component: StudentComponent,
        data: { roles: [Role.Student] }
      }, // использует guard
      {
        path: 'lk-teacher',
        canActivate: [AuthGuard],
        component: TeacherComponent,
        data: { roles: [Role.Teacher] }
      }, //Использует guard для лк учителя
      {
        path: 'lk-admin',
        canActivate: [AuthGuard],
        component: PrivateOfficePageWeb,
        data: { roles: [Role.AdministratorTeacher] }
      }, // использует guard
      // {path: 'company', children: registrationCompanyFormRoutes},
      {path: 'registration', children: registrationRoutes},
      {path: 'authorization', component: LoginPageWeb},
      // {path: 'edit', component: StudentComponent},
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
