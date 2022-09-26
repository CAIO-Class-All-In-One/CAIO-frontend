import { ICourseObj, ItemObj, IDataPlugin, IDataUser } from "./type";
import { useApi } from "./useRestfulJson";

export const getCourses = async (unumber: string) => {
  return useApi<Array<ICourseObj>>(["course", unumber]);
};

export const getTodos = async (username: string) => {
  return useApi<Array<ItemObj>>(["todo", username]).then((v) => {
    if (v.data) {
      v.data.forEach((todo) => {
        todo.extra = { todoId: todo.extra.todoid };
      });
    } else {
      v.data = [];
    }
    return v;
  });
};

export const getPluginData = async (query: string, type: "uid" | "repo" | "school") => {
  return useApi<Array<IDataPlugin>>(["plugin", `${encodeURIComponent(query)}?${new URLSearchParams({ type })}`]);
};

export const getUserData = async (username: string) => {
  return useApi<IDataUser>(["user", username]).then((v) => {
    v.data.weekStart = v.data.weekStart ?? 1;
    return v;
  });
};
