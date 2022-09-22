import { defineStore } from "pinia";
import { useTestLogin } from "./auth";

export const useUserData = defineStore("user-data", {
  state: () => ({ username: "", school: "", unumber: "" }),
  getters: {
    isLogin: async () => (await useTestLogin()).data.success,
  },
});

export const useCourseData = defineStore("course-data", {
  state: () => ({
    week: 1,
  }),
});
