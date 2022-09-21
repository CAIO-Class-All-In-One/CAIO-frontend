import { defineStore } from "pinia";
import { useTestLogin } from "./auth";

export const useUserDataStore = defineStore("user-data", {
  state: () => ({ uid: "", school: "" }),
  getters: {
    isLogin: async () => (await useTestLogin()).data.login,
  },
});
