import { Component } from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {IGroup, ISubject} from "../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../modules/info-lk/info-lk-from-teacher.service";
import {IRatingUser, RatingService} from "../../modules/rating/rating.service";

@Component({
  selector: "rating",
  templateUrl: "rating.page.web.html",
  styleUrls: ["rating.page.web.scss"]
})
export class RatingPageWeb{
  constructor(private formBuilder: FormBuilder,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private ratingService: RatingService) { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  subjects$?: Observable<ISubject[]>;
  groups$?: Observable<IGroup[]>;
  currentSubjectOption: number = 0;
  currentGroupOption: number = 0;
  ratingList$?: Observable<IRatingUser[]>;
  myRatingUser$?: Observable<IRatingUser>;

  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects();
  }

  onSortSubjectOptionChange() {
    this.groups$ = this.infoLkFromTeacherService.getGroups(this.currentSubjectOption);
  }

  sort() {
    if(!!this.currentSubjectOption && !!this.currentGroupOption && this.range.controls.start.value && this.range.controls.end.value) {
      this.ratingList$ = this.ratingService.sort(this.currentSubjectOption, this.currentGroupOption, this.range.controls.start.value, this.range.controls.end.value);
      this.myRatingUser$ = this.ratingService.getMyRating(this.currentSubjectOption, this.currentGroupOption, this.range.controls.start.value, this.range.controls.end.value);
    }
  }
}
