import { Component } from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {ICreateTask, IGroup, ISubject} from "../../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(private formBuilder: FormBuilder,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private route: ActivatedRoute,
              private router: Router) { }
  newSubject?: boolean;
  phase: number = 1;
  selectedSubject?: ISubject;
  subjects$?: Observable<ISubject[]>
  groups$?: Observable<IGroup[]>
  idGroup: number = 0;
  lkSubscription?: Subscription;

  taskForm!: FormGroup;
  loading = false;

  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
    this.route.queryParams.subscribe(params => {
      this.newSubject = params['newSubject'];
      if (this.newSubject) {
        this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
      }
    });
    if (this.selectedSubject)
      this.taskForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        difficulty: ['', Validators.required],
        subject: [this.selectedSubject.name, Validators.required],
        answer: [''],
        isExtended: [false],
        isPublic: [false],
        deadline: ['', Validators.required]
      });
  }

  editSubject(subject: ISubject) {
    this.selectedSubject = subject;
    this.groups$ = this.infoLkFromTeacherService.getGroups(subject.id);
  }

  onClick() {

  }
  backPhase(){
    if(this.phase === 1){
      this.router.navigate(["lk-teacher"]);
    } else {
      this.phase--;
    }
  }

  nextPhase() {
    if(this.phase < 3)
      this.phase++;
  }

  submit() {
    const formData: ICreateTask = {...this.taskForm.value, deadline: new Date(this.taskForm.value.deadline)};
    this.loading = true;
    this.lkSubscription = this.infoLkFromTeacherService.addTask(this.idGroup, formData).subscribe(
      () => {
        this.loading = false;
        this.taskForm.reset();
      },
      error => {
        this.loading = false;
        this.taskForm.reset();
        alert("Ошибка, попробуйте еще раз. перепроверьте все")
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.lkSubscription?.unsubscribe();
  }
}
