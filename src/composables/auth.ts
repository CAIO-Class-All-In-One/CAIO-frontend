import { IOpterationIsSucceed, useApi } from "./useRestfulJson";

export interface ILoginSucceed {
  username: string;
  school: string;
  unumber: string;
}

const useTestLogin = async () => {
  return useApi<IOpterationIsSucceed & ILoginSucceed>(["auth", "login"]);
};

const useLogin = async (username: string, password: string) => {
  return useApi<IOpterationIsSucceed>(["auth", "login"], {
    method: "POST",
    body: new URLSearchParams({ username, password }),
  });
};

const useRegister = async (username: string, password: string, school: string, email: string, unumber: string) => {
  return useApi<IOpterationIsSucceed>(["auth", "register"], {
    method: "POST",
    body: new URLSearchParams({ username, password, school, email, unumber }),
  });
};

const useLogout = async () => {
  return useApi<IOpterationIsSucceed>(["auth", "logout"]);
};

export { useTestLogin, useLogin, useRegister, useLogout };
