<script setup lang="ts">
import { IconDatabaseAlt, IconUser, IconPlug, IconExit } from "@iconify-prerendered/vue-uil";
import { onMounted, Ref, ref } from "vue";
import { useLogout } from "~/composables";
const isCollapse: Ref<boolean> = ref(false);

onMounted(() => {});
</script>

<template>
  <el-container>
    <el-main id="app-main">
      <el-col :span="4">
        <el-menu id="app-menu" :collapse="isCollapse">
          <img src="/logo.png" alt="logo" width="64" height="64" />
          <el-menu-item index="1">
            <router-link to="/app/class-schedule" class="nav-link"><IconDatabaseAlt /> 课表 </router-link>
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
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-main>
    <el-footer><class-schedule-view-swtich /> </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
#app-main {
  padding: 0;
}
#app-menu {
  height: 100%;
}
.nav-link {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
