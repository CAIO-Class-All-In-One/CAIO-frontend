import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "~/styles/index.css";
import { createPinia } from "pinia";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// import Pretender from "pretender";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

dayjs.locale("zh-cn"); // 使用本地化语言

app.mount("#app");
