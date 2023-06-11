import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICreateTask, IEditTakFullInfo, IEditTask} from "../../../../modules/info-lk/info.interfases";
import {Observable, of, switchMap} from "rxjs";
import {InfoService} from "../../../../modules/info-lk/info.service";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: "app-edit-task",
  templateUrl: "edit-task.component.html",
  styleUrls: ["edit-task.component.scss"]
})
export class EditTaskComponent {
  task$!: Observable<any>;
  task?: IEditTakFullInfo;

  constructor(private infoService: InfoService,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  public taskForm: FormGroup = new FormGroup({
    id: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    difficulty: new FormControl("", Validators.required),
    subject: new FormControl("", Validators.required),
    answer: new FormControl("", Validators.required),
    isExtended: new FormControl(false, Validators.required),
    isPublic: new FormControl(false, Validators.required),
    deadline: new FormControl("", Validators.required),
  });
  loading = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params1) => {
      this.task$ = this.route.paramMap.pipe(
        switchMap(params => {
          let id: string | null =  params.get('taskId')
          if(id !== null) {
            return this.infoLkFromTeacherService.getSolvedTasksInfoFromTeacherFull(parseInt(id));
          }
          else {
            return of()
          }
        })
      );
    });

    this.task$.subscribe(
      (data) => {
        this.task = data;
        console.log(data)
        if(this.task?.deadline) {
          const date = new Date(this.task.deadline.slice(0, 10));
          this.taskForm.controls["id"].setValue(this.task.id);
          this.taskForm.controls["name"].setValue(this.task.name);
          this.taskForm.controls["description"].setValue(this.task.description);
          this.taskForm.controls["difficulty"].setValue(this.task.difficulty.name);
          this.taskForm.controls["subject"].setValue(this.task.subject.name);
          this.taskForm.controls["answer"].setValue(this.task.answer);
          this.taskForm.controls["isExtended"].setValue(this.task.isExtendedTask);
          this.taskForm.controls["isPublic"].setValue(this.task.isPublic);
          this.taskForm.controls["deadline"].setValue(date.toISOString().slice(0,10));
        }
      }
    )
  }

  submit() {
    let formattedDate = new Date().toISOString();
    const date = new Date(formattedDate.slice(0, 10));
    const data: IEditTask = {
      id: this.taskForm.controls["id"].value,
      name: this.taskForm.controls["name"].value,
      description: this.taskForm.controls["description"].value,
      difficulty:this.taskForm.controls["difficulty"].value,
      subject:this.taskForm.controls["subject"].value,
      answer: this.taskForm.controls["answer"].value,
      isExtended: this.taskForm.controls["isExtended"].value,
      isPublic: this.taskForm.controls["isPublic"].value,
      deadline: this.taskForm.controls["deadline"].value,
      creationDateTime: date.toISOString().slice(0,10),
    };
    this.loading = true;
    console.log(data)
    this.infoLkFromTeacherService.editTask(data).subscribe(
      (data) => {
        this.loading = false;
        alert("Успешно")
        this.router.navigate(["/lk-teacher"])
      },
      error => {
        this.loading = false;
        alert("Ошибка, попробуйте еще раз. перепроверьте все")
        console.error(error);
      }
    );
  }

  backPhase() {
    this.location.back();
  }

  ngOnDestroy() {
  }
}
