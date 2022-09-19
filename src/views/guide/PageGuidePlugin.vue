<script setup lang="ts"></script>
<template>
  <el-container>
    <el-header> <base-header /> </el-header>
    <el-main>
      <guide-side-bar />
      <router-view></router-view>
    </el-main>
    <el-footer><base-footer /></el-footer>
  </el-container>
</template>

<style></style>
