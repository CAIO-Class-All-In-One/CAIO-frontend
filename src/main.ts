import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "~/styles/index.css";
import { createPinia } from "pinia";

import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/zh-cn";
// import Pretender from "pretender";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

dayjs.extend(CustomParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.locale("zh-cn"); // 使用本地化语言

app.mount("#app");
