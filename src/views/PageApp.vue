<script setup lang="ts">
import { IconDatabaseAlt, IconUser, IconPlug, IconExit } from "@iconify-prerendered/vue-uil";
import { storeToRefs } from "pinia";
import { onBeforeMount, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useLogout, useGlobalStore, useTestLogin } from "~/composables";
import { useCourseData } from "~/composables/store";
const isCollapse: Ref<boolean> = ref(false);

const userdata = useGlobalStore();
const router = useRouter();

onBeforeMount(async () => {
  userdata.isLoading = true;
  const { data } = await useTestLogin();
  if (data.success) {
    const { school, unumber, username } = data;
    userdata.$patch({ school, unumber, username });
    console.log(`[AppMain]: 进入主页面 用户id: ${userdata.username} 学校: ${userdata.school}`);
  } else {
    router.replace("/account/login");
  }
  userdata.isLoading = false;
});
const courseData = useCourseData();
const { week } = storeToRefs(courseData);
</script>

<template>
  <el-container>
    <el-main id="app-main" style="position: relative">
      <el-col :span="4">
        <el-menu id="app-menu" :collapse="isCollapse">
          <router-link class="logo-container" to="/">
            <img src="/logo.png" alt="logo" crossorigin="anonymous" height="48" />
          </router-link>
          <el-menu-item index="1">
            <router-link to="/app/class-schedule" class="nav-link"><IconDatabaseAlt />课表 </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/app/user-details" class="nav-link"><IconUser />用户 </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/app/plugin" class="nav-link"><IconPlug />插件 </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <a href="/" :onclick="useLogout" class="nav-link"><IconExit />退出 </a>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-loading="userdata.isLoading" :span="20">
        <router-view></router-view>
      </el-col>
    </el-main>
    <el-footer>
      <router-view
        name="app-footer"
        @week-change="
          (val:number) => {
            week = val;
          }
        "
      ></router-view>
    </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
#app-main {
  padding: 0;
}

#app-menu {
  height: 100%;
  z-index: 100;
  box-shadow: var(--box-shadow-thick);
}

.nav-link {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & > * {
    margin-inline-start: -8%;
    margin-inline-end: 8%;
  }
}

.logo-container {
  display: flex;
  padding: 2em;
  & > img {
    margin: auto;
    border-radius: 12px;
    transition: all 0.3s;
    box-shadow: var(--box-shadow-light);
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0 0 0 / 24%);
    }
  }
}
</style>
