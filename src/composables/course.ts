import { dayjs } from "element-plus";
import { useApi } from "./useRestfulJson";

export interface ItemObj {
  name: string;
  time: Array<{
    weekday: number;
    start: number;
    span: number;
    weeks: Array<number>;
  }>;
  extra: any;
}

export interface ICourseObj extends ItemObj {
  cid: number;
  cnumber: number;
  classroom: string;
  teacher: string;
  credit: string;
}

export const getCourses = async (unumber: string) => {
  return useApi<Array<ICourseObj>>(["course", unumber]);
};

export const useCurrentWeek = (weekStart: number) => dayjs().week() - weekStart + 1;
