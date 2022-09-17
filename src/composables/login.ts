import { useRestfulJson, RestfulData } from "./useRestfulJson";

export interface DataIsLogin extends RestfulData {
  data: {
    login: boolean;
  };
}

export interface DataLogin extends RestfulData {
  data: any;
}

const useTestLogin = async (): Promise<DataIsLogin> => {
  return useRestfulJson(["auth", "login"]);
};

const useLogin = async (username: string, password: string): Promise<DataLogin> => {
  return useRestfulJson(["login"], {
    method: "POST",
    body: new URLSearchParams({ username, password }),
  });
};

export { useTestLogin, useLogin };
