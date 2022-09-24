import { RestfulData } from "./type";

const useRestfulJson = async <DATA>(
  paths: string[],
  options?: Parameters<typeof fetch>[1]
): Promise<RestfulData<DATA>> => {
  paths.unshift("api");
  const path = paths.join("/");
  return fetch(path, options).then((v) => v.json());
};

export { useRestfulJson as useApi };
