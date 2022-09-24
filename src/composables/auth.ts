import { IOpterationIsSucceed, ILoginSucceed } from "./type";
import { useApi } from "./useRestfulJson";

const useTestLogin = async () => {
  return useApi<IOpterationIsSucceed & ILoginSucceed>(["auth", "login"]).then((v) => {
    v.data.weekStart = v.data.weekStart ?? 1;
    return v;
  });
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
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password, school, email, unumber: unumber === "" ? null : unumber }),
  });
};

const useLogout = async () => {
  return useApi<IOpterationIsSucceed>(["auth", "logout"]);
};

export { useTestLogin, useLogin, useRegister, useLogout };
