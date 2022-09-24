<script setup lang="ts">
import { reactive } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = reactive(zhCn);
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style></style>
