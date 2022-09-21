import { defineStore } from "pinia";
import { useTestLogin } from "./auth";

export const useUserDataStore = defineStore("user-data", {
  state: () => ({ username: "", school: "" }),
  getters: {
    isLogin: async () => (await useTestLogin()).data.success,
  },
});
