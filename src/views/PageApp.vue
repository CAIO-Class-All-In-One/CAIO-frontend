<script setup lang="ts">
import { onMounted, ref } from "vue";
const isCollapse: boolean = ref(false);

onMounted(() => {});
</script>

<template>
  <el-container>
    <el-main id="app-main">
      <el-col :span="4">
        <el-menu id="app-menu" :collapse="isCollapse">
          <router-link class="logo-container" to="/">
            <img src="/logo.png" alt="logo" crossorigin="anonymous" height="48" />
          </router-link>
          <el-menu-item index="1">
            <el-icon></el-icon>课表
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon></el-icon>课表
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon></el-icon>课表
          </el-menu-item>
        </el-menu>
      </el-col>
      <class-schedule-panel></class-schedule-panel>
    </el-main>
    <el-footer></el-footer>
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

.logo-container {
  display: flex;
  margin: 2em;
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
