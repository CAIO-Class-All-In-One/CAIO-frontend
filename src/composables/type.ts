export interface RestfulData<T> {
  code: number;
  msg: string;
  data: T;
}

// operation
export interface IOpterationIsSucceed {
  success: boolean;
}

export interface ILoginSucceed {
  username: string;
  school: string;
  unumber: string;
  weekStart: number;
}

export interface IPluginExecute {
  finished: boolean;
  info: {
    success?: boolean;
    verifyCode?: string;
  };
}

// data
export interface IDataUser {
  username: string;
  school: string;
  email: string;
  unumber: string;
  weekStart: number; //开始周
}

export interface IDataPlugin {
  school: string;
  repository: string;
  version: string;
  date: Date;
  username: string;
}

// item
export interface ItemObj {
  name: string;
  time: Array<{
    weekday: number;
    start: number;
    span: number;
    weeks: Array<number>;
  }>;
  type: "todo" | "course" | "exam";
  extra: any;
}

export interface ICourseObj extends ItemObj {
  cid: number;
  cnumber: number;
  classroom: string;
  teacher: string;
  credit: string;
}
