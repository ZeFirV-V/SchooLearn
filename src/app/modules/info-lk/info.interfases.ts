import {Data} from "@angular/router";

export interface IGroup{
  Id: number;
  Name: string;
}

export interface ISolvedTask {
  Id: number;
  Name: string;
  Score: number;
}

export interface ISolvedTaskFullInfo {
  Id: number;
  Name: string;
  Description: string;
  Difficulty: string;
  Subject: string;
  ReceivedAnswer: string;
  Deadline: Data;
  Scores: number;
}

export interface IAppTask {
  Id: number;
  Name: string;
  Description: string;
  Difficulty: string;
  Subject: string;
  Deadline: Data;
}
