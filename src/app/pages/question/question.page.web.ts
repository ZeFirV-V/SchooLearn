import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator, usernameValidator} from "../registration/children/components/validators";
import {IDataQuestion, QuestionService} from "../../modules/question/question.service";
import {Subscription} from "rxjs";


@Component({
  selector: "app-question",
  templateUrl: "question.page.web.html",
  styleUrls: ["question.page.web.scss"]
})
export class QuestionPageWeb {
  constructor(private questionService: QuestionService) { }
  submitted: boolean = false;
  private _asyncSubscribeQuestion: Subscription = new Subscription();

  public question: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, usernameValidator()]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    topic: new FormControl("", Validators.required),
    question: new FormControl("", [Validators.required]),
  });

  onSubmitQuestion() {
    this.submitted = true;
    const data: { name: string; email: string; topic: string; question: string } = {
      name: this.question.controls["name"].value,
      email: this.question.controls["email"].value,
      topic: this.question.controls["topic"].value,
      question: this.question.controls["question"].value,
    };
    this.question.disable();

    this._asyncSubscribeQuestion = this.questionService.registerQuestion( {...data} as unknown as IDataQuestion).subscribe({
      next: (value) => {
        this.submitted = false;
        alert("Вопрос отправлен!")
      },

      error: (error) => {
        alert("Ошибка отправки вопроса :(")
        console.error("Ошибка отправки вопроса");
        console.log(error);
        this.submitted = false;
      },
    });
  }
}
