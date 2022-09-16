import App from "../page/PageApp.vue";
import Home from "../page/PageHome.vue";
import GuideApp from "../page/guide/PageGuideApp.vue";
import GuidePlugin from "../page/guide/PageGuidePlugin.vue";
import Login from "../page/auth/PageLogin.vue";
import Register from "../page/auth/PageRegister.vue";
import * as VueRouter from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/app", component: App },
  { path: "/guide/app", component: GuideApp },
  { path: "/guide/plugin", component: GuidePlugin },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
