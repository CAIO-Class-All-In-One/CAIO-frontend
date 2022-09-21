import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "~/styles/index.css";
import { createPinia } from "pinia";
import Pretender from "pretender";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

const server = new Pretender(function () {
  this.get("/api/auth/login", (request) => [
    200,
    {},
    JSON.stringify({
      msg: "no",
      code: 2,
      data: {
        success: true,
      },
    }),
  ]);
  this.post("/api/login", (request) => [
    200,
    {},
    JSON.stringify({
      msg: "yes",
      code: 2,
      data: {
        uid: 123,
        school: "njust",
        unumber: 321,
      },
    }),
  ]);
  this.post("/api/auth/register", (request) => [
    200,
    {},
    JSON.stringify({
      msg: "true",
      code: 2,
      data: { success: true },
    }),
  ]);
});
