import { IDataPlugin, IPluginExecute } from "./type";
import { useApi } from "./useRestfulJson";

export const usePluginData = async (query: string, type: "uid" | "repo" | "school") => {
  return useApi<Array<IDataPlugin>>(["plugin", `${encodeURIComponent(query)}?${new URLSearchParams({ type })}`]);
};

export const usePluginApply = async (repo: string, info: { [K: string]: string }) => {
  // console.log(info);
  return useApi<IPluginExecute>(["plugin", `${encodeURIComponent(repo)}?execute=apply`], {
    method: "POST",
    body: new URLSearchParams(info),
  });
};
