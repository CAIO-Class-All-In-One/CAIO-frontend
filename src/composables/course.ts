import { dayjs } from "element-plus";
import { ICourseObj } from "./type";
import { useApi } from "./useRestfulJson";

export const getCourses = async (unumber: string) => {
  return useApi<Array<ICourseObj>>(["course", unumber]);
};

export const useCurrentWeek = (weekStart: number) => dayjs().week() - weekStart + 1;
