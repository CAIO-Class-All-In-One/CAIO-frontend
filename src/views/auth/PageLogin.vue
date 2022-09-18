<script setup lang="ts">
import { onMounted } from "vue";
import { useTestLogin } from "~/composables";
import router from "~/router";

onMounted(async () => {
  const isLogin: boolean = (await useTestLogin()).data.login;
  if (isLogin) {
    router.push("/app");
  }
});
</script>

<template>
  <el-container>
    <el-main>
      <el-col id="login-container" :span="8">
        <img src="/logo.png" alt="logo" width="192" height="192" />
        <login-form id="login-form" />
      </el-col>
    </el-main>
    <el-footer>
      <base-footer />
    </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
.el-main {
  align-items: center;
}

#login-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  box-shadow: var(--box-shadow-light);
  & > img {
    margin: 2em auto;
  }
  & > #login-form {
    margin: 2em;
  }
}
</style>
