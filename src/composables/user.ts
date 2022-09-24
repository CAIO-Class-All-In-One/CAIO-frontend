import { IOpterationIsSucceed, useApi } from "./useRestfulJson";

export interface IDataUser {
  username: string;
  school: string;
  email: string;
  unumber: string;
  weekStart: number; //开始周
}

const getUserData = async (username: string) => {
  return useApi<IDataUser>(["user", username]).then((v) => {
    v.data.weekStart = (v.data as any).weekstart ?? 1;
    delete (v.data as any).weekstart;
    return v;
  });
};

const updateUserData = async (username: string, newData: IDataUser) => {
  (newData as any).weekstart = newData.weekStart;
  delete (newData as any).weekStart;
  return useApi<IDataUser & IOpterationIsSucceed>(["user", username], {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData),
  }).then((v) => {
    v.data.weekStart = (v.data as any).weekstart ?? 1;
    delete (v.data as any).weekstart;
    return v;
  });
};

export { getUserData, updateUserData };
