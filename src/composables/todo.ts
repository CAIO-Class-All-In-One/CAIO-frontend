import { ItemObj } from "./type";
import { useApi } from "./useRestfulJson";

export const getTodos = async (unumber: string) => {
  return useApi<Array<ItemObj>>(["todo", unumber]);
};
