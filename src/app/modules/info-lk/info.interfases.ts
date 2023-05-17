import {Data} from "@angular/router";

export interface IGroup{
  id: number;
  name: string;
}

export interface ISolvedTask {
  id: number;
  name: string;
  score: number;
}

export interface ISolvedTaskFullInfo {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  receivedAnswer: string;
  deadline: Data;
  scores: number;
}

export interface IAppTask {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  deadline: Data;
}
