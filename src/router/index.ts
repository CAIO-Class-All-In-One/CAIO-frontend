import App from "../views/PageApp.vue";
import Home from "../views/PageHome.vue";
import GuideApp from "../views/guide/PageGuideApp.vue";
import GuidePlugin from "../views/guide/PageGuidePlugin.vue";
import Login from "../views/auth/PageLogin.vue";
import Register from "../views/auth/PageRegister.vue";
import * as VueRouter from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/app", component: App },
  { path: "/guide/app", component: GuideApp },
  { path: "/guide/plugin", component: GuidePlugin },
  { path: "/account/login", component: Login },
  { path: "/account/register", component: Register },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
