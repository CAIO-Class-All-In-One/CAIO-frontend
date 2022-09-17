export interface RestfulData {
  code: number;
  msg: string;
  data: any;
}

const useRestfulJson = async (paths: string[], options?: Parameters<typeof fetch>[1]) => {
  paths.unshift("api");
  const path = paths.join("/");
  return fetch(path, options).then((v) => v.json());
};

export { useRestfulJson };
