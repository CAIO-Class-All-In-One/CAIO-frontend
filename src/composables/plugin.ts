import { IClassObj } from "./class";
import { useApi } from "./useRestfulJson";

export interface IPluginData {
  school: string;
  repository: string;
  version: string;
  date: Date;
  uid: string;
}

export interface IPluginExecute {
  needInfo: boolean;
  info: Array<
    | IClassObj
    | {
        key: string;
        value: string;
        type: "img" | "pwd" | "username";
      }
  >;
}

export const usePluginData = async (query: string, type: "uid" | "repo" | "school") => {
  return useApi<Array<IPluginData>>([
    "plugin",
    `${encodeURIComponent(query)}?${new URLSearchParams({ type })}`,
  ]);
};

export const usePlugin = async (reop: string, ...info: Array<Record<string, string>>) => {
  return useApi<IPluginExecute>(["plugin", reop, `update`], {
    method: "POST",
    body: new URLSearchParams(...info),
  });
};
