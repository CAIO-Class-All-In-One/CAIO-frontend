import { dayjs } from "element-plus";

export const useRangeRandom = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

export const useCurrentWeek = (weekStart: number) => dayjs().week() - weekStart + 1;

//TODO: export const getData