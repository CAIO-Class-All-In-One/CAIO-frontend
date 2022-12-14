import { defineStore } from "pinia";
import { useTestLogin } from "./auth";
import { ICourseObj, ItemObj } from "./type";

export const useGlobalStore = defineStore("store-global", {
  state: () => ({
    username: "",
    school: "",
    unumber: "",
    weekStart: 1,
    isLoading: false,
  }),
  actions: {
    isLogin: async () => useTestLogin().then((v) => v.data.success),
  },
});

export const useAppState = defineStore("state-app", {
  state: () =>
    ({
      week: 1,
      courses: {},
      todos: [],
    } as {
      week: number;
      courses: Record<number, ICourseObj>;
      todos: ItemObj[];
    }),
});
