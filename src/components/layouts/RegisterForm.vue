<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive({
  username: "",
  password: "",
  repeatpassword: "",
  school: "",
  email: "",
  unumber: "",
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // useRegister();
    } else {
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form ref="formRef" :model="dynamicValidateForm" class="form" label-width="100px" label-position="left">
    <div class="item">
      <el-form-item
        prop="uid"
        label="用户名："
        :rules="{
          required: true,
          message: '请填写用户名',
          trigger: 'blur',
        }"
      >
        <el-input v-model="dynamicValidateForm.username" />
      </el-form-item>

      <el-form-item
        prop="password"
        label="密码："
        :rules="{
          required: true,
          message: '还未填写密码哦',
          trigger: 'blur',
        }"
      >
        <el-input v-model="dynamicValidateForm.password" />
      </el-form-item>

      <el-form-item
        prop="password"
        label="重复密码："
        :rules="{
          required: true,
          message: '还未填写密码哦',
          trigger: 'blur',
        }"
      >
        <el-input v-model="dynamicValidateForm.repeatpassword" />
      </el-form-item>

      <el-form-item prop="school" label="学校：">
        <el-input v-model="dynamicValidateForm.school" />
      </el-form-item>

      <el-form-item prop="unumber" label="学号：">
        <el-input v-model="dynamicValidateForm.unumber" />
      </el-form-item>

      <el-form-item prop="phone" label="邮箱：">
        <el-input v-model="dynamicValidateForm.email" />
      </el-form-item>
      <div class="registerAction">
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<style scoped lang="postcss">
.form {
  align-items: center;
  justify-content: center;
  .item {
    align-items: center;
    justify-content: center;
    .registerAction {
      display: flex;
      justify-content: space-between;
      .el-button {
        padding: 0;
      }
    }
  }
}
</style>
