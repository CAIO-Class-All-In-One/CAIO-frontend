<template>
<el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="link" />
    <el-menu-item index="1">使用教程</el-menu-item>
    <el-menu-item index="1">插件开发指南</el-menu-item>
    <el-menu-item index="1">关于</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.link {
  flex-grow: 1;

}
</style>