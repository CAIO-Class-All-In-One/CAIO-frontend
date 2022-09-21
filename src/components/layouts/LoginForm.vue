<script setup lang="ts">
import { reactive, ref } from "vue";
import { IconUser, IconKeySkeletonAlt } from "@iconify-prerendered/vue-uil";
import { useLogin } from "~/composables";
import { ElNotification, FormInstance } from "element-plus";
import { useRouter } from "vue-router";

const formRef = ref<FormInstance>();

const form = reactive({
  username: "",
  password: "",
});

const router = useRouter();

const loginHandler = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      useLogin(form.username, form.password)
        .then((v) => {
          if (String(v.code).startsWith("2")) {
            ElNotification.success({
              title: "登录成功",
              message: JSON.stringify(v.data),
            });
            router.push("/app");
          } else {
            throw new Error(v.msg);
          }
        })
        .catch((v) => {
          ElNotification.error({
            title: "登录失败",
            message: JSON.stringify(v),
          });
        });
    } else {
      return false;
    }
  });
};
</script>
<template>
  <el-form ref="formRef" :model="form" label-position="top">
    <el-form-item
      label="用户名: "
      prop="username"
      :rules="[{ required: true, message: `还未填写用户名哦`, trigger: `blur` }]"
    >
      <el-input v-model="form.username" :prefix-icon="IconUser" autocomplete="off" />
    </el-form-item>
    <el-form-item
      label="密码: "
      prop="password"
      :rules="[{ required: true, message: `还未填写密码哦`, trigger: `blur` }]"
    >
      <el-input
        v-model="form.password"
        type="password"
        :prefix-icon="IconKeySkeletonAlt"
        show-password
        autocomplete="off"
      />
    </el-form-item>
    <div id="action">
      <router-link v-slot="{ href }" to="/account/register" custom>
        <el-link class="item" style="font-size: 0.75em" :href="href">新用户注册</el-link>
      </router-link>
      <el-button
        class="item"
        @click="
          () => {
            loginHandler(formRef);
          }
        "
        >登录</el-button
      >
      <router-link v-slot="{ href }" to="/account/forget-password" custom>
        <el-link class="item" style="font-size: 0.75em" :href="href">忘记密码</el-link>
      </router-link>
    </div>
  </el-form>
</template>

<style scoped lang="postcss">
#action {
  display: flex;
  justify-content: space-around;
}

.item:not(.item:nth-child(2)) {
  flex-basis: 20%;
}

.item:nth-child(2) {
  flex-basis: 50%;
}
</style>
