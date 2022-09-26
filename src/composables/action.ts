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
export const addTodo = async (username: string, todo: ItemObj) => {
  return useApi<ItemObj>(["todo", username], {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const delTodo = async (username: string, todoid: number) => {
  return useApi<IOpterationIsSucceed>(["todo", username, todoid.toString()], {
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
