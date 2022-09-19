<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
const isCollapse: Ref<boolean> = ref(false);

onMounted(() => {});
</script>

<template>
  <el-container>
    <el-main id="app-main">
      <el-col :span="4">
        <el-menu id="app-menu" :collapse="isCollapse">
          <img src="/logo.png" alt="logo" width="64" height="64" />
          <el-menu-item index="1"> <el-icon></el-icon>课表 </el-menu-item>
          <el-menu-item index="2"> <el-icon></el-icon>用户 </el-menu-item>
          <el-menu-item index="3"> <el-icon></el-icon>插件 </el-menu-item>
          <el-menu-item index="3"> <el-icon></el-icon>退出 </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-main>
    <el-footer><class-schedule-view-swtich1 /> </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
#app-main {
  padding: 0;
}
#app-menu {
  height: 100%;
}
</style>
