import { useApi } from "./useRestfulJson";

export interface IPluginData {
  school: string;
  repository: string;
  version: string;
  date: Date;
  username: string;
}

export interface IPluginExecute {
  finished: boolean;
  info: {
    success?: boolean;
    verifycode?: string;
  };
}

export const usePluginData = async (query: string, type: "uid" | "repo" | "school") => {
  return useApi<Array<IPluginData>>(["plugin", `${encodeURIComponent(query)}?${new URLSearchParams({ type })}`]);
};

export const usePluginApply = async (repo: string, info: { [K: string]: string }) => {
  return useApi<IPluginExecute>(["plugin", encodeURIComponent(repo), `?execute=apply`], {
    method: "POST",
    body: new URLSearchParams(info).toString(),
  });
};
