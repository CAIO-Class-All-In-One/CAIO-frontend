<script setup lang="ts">
import { FormInstance } from "element-plus";
import { ref, reactive } from "vue";

const formRef = ref<FormInstance>();

const form = reactive({
  username: "",
  password: "",
});
</script>
<template>
  <el-form ref="formRef" :model="form" label-position="top">
    <!-- <el-form-item label="用户名: " :rules="[{ required: true }]">
      <el-input v-model="form.username" :prefix-icon="IconUser" />
    </el-form-item>
    <el-form-item label="密码: " :rules="[{ required: true }]">
      <el-input v-model="form.password" type="password" :prefix-icon="IconKeySkeletonAlt" show-password />
    </el-form-item>
    <div id="action">
      <router-link v-slot="{ href }" to="/account/register" class="item" custom>
        <el-link style="font-size: 0.75em" :href="href">新用户注册</el-link>
      </router-link>
      <el-button class="item" @click="loginHandler(formRef)">登录</el-button>
      <router-link v-slot="{ href }" to="/account/forget-password" class="item" custom>
        <el-link style="font-size: 0.75em" :href="href">忘记密码</el-link>
      </router-link>
    </div> -->
  </el-form>
</template>

<style scoped lang="postcss"></style>
