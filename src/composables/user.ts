import { IOpterationIsSucceed, useApi } from "./useRestfulJson";

export interface IDataUser {
  username: string;
  school: string;
  email: string;
  unumber: string;
}

const getUserData = async (username: string) => {
  return useApi<IDataUser>(["user", username]);
};

const updateUserData = async (username: string, newData: IDataUser) => {
  return useApi<IDataUser & IOpterationIsSucceed>(["user", username], {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData as Record<keyof IDataUser, string>),
  });
};

export { getUserData, updateUserData };
