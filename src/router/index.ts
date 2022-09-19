import App from "../views/PageApp.vue";
import Home from "../views/PageHome.vue";
import GuideApp from "../views/guide/PageGuideApp.vue";
import GuidePlugin from "../views/guide/PageGuidePlugin.vue";
import Login from "../views/auth/PageLogin.vue";
import Register from "../views/auth/PageRegister.vue";
import Plugin from "../views/app/PagePlugin.vue";
import UserDetails from "../views/app/PageUserDetails.vue";
import ClassSchedule from '../views/app/PageClassSchedule.vue';
import * as VueRouter from "vue-router";

const routes: VueRouter.RouteRecordRaw[] = [
  { path: "/", component: Home },
  {
    path: "/app",
    component: App,
    children: [
      { path: "plugin", component: Plugin },
      { path: "user-details", component: UserDetails },
      { path: "class-schedule", component: ClassSchedule },
    ],
  },
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
