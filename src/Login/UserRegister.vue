<template>
  <div class="user">
    <el-card class="box-card">
      <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        label-width="120px"
        class="form"
        label-position="right"
      >
        <div class="item">
          <el-form-item
            prop="uid"
            label="用户ID："
            :rules="{
              required: true,
              message: '还未填写用户ID哦',
              trigger: 'blur',
            }"
          >
            <el-input v-model="dynamicValidateForm.uid" />
          </el-form-item>

          <el-form-item prop="username" label="用户名：">
            <el-input v-model="dynamicValidateForm.username" />
          </el-form-item>

          <el-form-item prop="school" label="学校：">
            <el-input v-model="dynamicValidateForm.school" />
          </el-form-item>

          <el-form-item prop="unumber" label="用户名：">
            <el-input v-model="dynamicValidateForm.unumber" />
          </el-form-item>

          <el-form-item prop="major" label="用户名：">
            <el-input v-model="dynamicValidateForm.major" />
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

          <el-form-item prop="phone" label="电话：">
            <el-input v-model="dynamicValidateForm.phone" />
          </el-form-item>
          <div class="registerAction">
            <el-form-item>
              <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
              <el-button @click="resetForm(formRef)">Reset</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  uid: string;
  uname: string;
  school: string;
  unumber: string;
  major: string;
  password: string;
  phone: string;
}>({
  uid: "",
  uname: "",
  school: "",
  unumber: "",
  major: "",
  password: "",
  phone: "",
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style>
.user {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box-card {
    width: 50%;
    min-width: 300px;
    margin: 0 auto;
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
  }
}
</style>
