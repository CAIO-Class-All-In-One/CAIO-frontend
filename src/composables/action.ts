import { IPluginExecute, ItemObj, IDataUser, IOpterationIsSucceed } from "./type";
import { useApi } from "./useRestfulJson";

// plguin
export const usePluginApply = async (repo: string, info: { [K: string]: string }) => {
  return useApi<IPluginExecute>(["plugin", `${encodeURIComponent(repo)}?execute=apply`], {
    method: "POST",
    body: new URLSearchParams(info),
  });
};

//todo
export const addTodo = async (unumber: string) => {
  return useApi<ItemObj>(["todo", unumber], {
    method: "PUT",
  });
};

export const delTodo = async (unumber: string) => {
  return useApi<ItemObj>(["todo", unumber], {
    method: "DELETE",
  });
};

// user info
export const updateUserData = async (username: string, newData: IDataUser) => {
  return useApi<IDataUser & IOpterationIsSucceed>(["user", username], {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData),
  });
};
