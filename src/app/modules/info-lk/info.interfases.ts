export interface IGroup{
  id: number;
  name: string;
}

export interface ISolvedTask {
  id: number;
  name: string;
  scores: number;
}

export interface ISolvedTaskFullInfo {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  receivedAnswer: string;
  deadline: Date;
  scores: number;
}

export interface IAppTask {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  deadline: Date;
}

export interface ISubject {
  id: number;
  name: string;
}
