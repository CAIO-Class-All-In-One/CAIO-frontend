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
    v.data.weekStart = v.data.weekStart ?? 1;
    return v;
  });
};

const updateUserData = async (username: string, newData: IDataUser) => {
  return useApi<IDataUser & IOpterationIsSucceed>(["user", username], {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData),
  });
};

export { getUserData, updateUserData };
