import { createApp } from "vue";
import App from "./App.vue";
import router from './Router/router'
import "~/styles/index.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
