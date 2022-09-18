<script setup lang="ts">
import { onMounted, ref } from "vue";
const isCollapse: boolean = ref(false);

onMounted(() => {});
</script>

<template>
  <el-container>
    <el-main>
      <el-col :span="12">
        <el-menu :collapse="isCollapse">
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

<style></style>
