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

export const useAppState = defineStore("state-app", {
  state: () => ({
    week: 1,
  }),
});
