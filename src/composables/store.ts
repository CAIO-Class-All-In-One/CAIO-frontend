import { defineStore } from "pinia";
import { useTestLogin } from "./auth";

export const useGlobalStore = defineStore("store-global", {
  state: () => ({
    username: "",
    school: "",
    unumber: "",
    weekStart: 1,
    isLoading: false,
  }),
  getters: {
    isLogin: async () => (await useTestLogin()).data.success,
  },
});

export const useCourseData = defineStore("course-data", {
  state: () => ({
    week: 1,
  }),
});
