import { useRestfulJson, RestfulData } from "./useRestfulJson";

export interface IDataIsLogin extends RestfulData {
  data: {
    login: boolean;
  };
}

export interface DataLogin extends RestfulData {
  data: any;
}

const useTestLogin = async (): Promise<IDataIsLogin> => {
  return useRestfulJson(["auth", "login"]);
};

const useLogin = async (username: string, password: string): Promise<DataLogin> => {
  return useRestfulJson(["login"], {
    method: "POST",
    body: new URLSearchParams({ username, password }),
  });
};

const useRegister = async () => {
  // TODO
};

const useLogout = async () => {
  // TODO
};

export { useTestLogin, useLogin, useRegister, useLogout };
