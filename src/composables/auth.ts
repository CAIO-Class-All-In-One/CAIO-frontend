import { useRestfulJson, RestfulData } from "./useRestfulJson";

export interface DataIsLogin extends RestfulData {
  data: {
    login: boolean;
  };
}

export interface DataLogin extends RestfulData {
  data: any;
}

export interface DataRegister extends RestfulData {
  data: any;
}

const useTestLogin = async (): Promise<DataIsLogin> => {
  return useRestfulJson(["auth", "login"]);
};

const useLogin = async (
  username: string,
  password: string
): Promise<DataLogin> => {
  return useRestfulJson(["login"], {
    method: "POST",
    body: new URLSearchParams({ username, password }),
  });
};

const useRegister = async (
  username: string,
  password: string,
  school: string,
  email: string,
  unumber: string
) :Promise<DataLogin>=> {
  return useRestfulJson(["register"], {
    method: "POST",
    body: new URLSearchParams({ username, password, school, email, unumber }),
  });
};

const useLogout = async () => {
  return useRestfulJson(["#"],{
    method: "POST"
  })
};

const usePluginData=()=>{
  return ""
}

const useUserDataStore=()=>{
  return ""
}

export { useTestLogin, useLogin, useRegister, useLogout,usePluginData,useUserDataStore };
