<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElNotification, FormInstance } from "element-plus";
import { useRegister } from "~/composables";
import router from "~/router";
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive({
  uid: "",
  password: "",
  repeatpassword: "",
  school: "",
  email: "",
  unumber: "",
});

const checkPass = (rule: any, value: any, callback: any) => {
  //密码校验
  if (value === "") {
    callback(new Error("请再次输入密码！"));
  } else {
    if (value !== dynamicValidateForm.password) {
      callback(new Error("两次输入的密码不匹配！"));
    } else {
      callback();
    }
  }
};

const checkUid = (rule: any, value: any, callback: any) => {
  //用户名校验
  if (value === "") {
    callback(new Error("请输入用户名！"));
  } else {
    if (dynamicValidateForm.uid !== '') {
      if (!formRef.value) return
      formRef.value.validateField('checkUname', () => null)
    }
    callback()
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("注册");
      useRegister(
        dynamicValidateForm.uid,
        dynamicValidateForm.password,
        dynamicValidateForm.school,
        dynamicValidateForm.email,
        dynamicValidateForm.unumber
      )
        .then((v) => {
        ElNotification.success({
          title:"注册成功",
          message:JSON.stringify(v.data),
        });
        router.back();
        router.push('/login')
      })
        .catch((v) => {
          ElNotification.success({
          title:"注册失败",
          message:JSON.stringify(v.data),
        });
        });
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
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    class="form"
    label-width="100px"
    label-position="left"
  >
    <div class="item">
      <el-form-item
        prop="uid"
        label="用户名："
        :rules="{
          required: true,
          
          trigger: 'blur',
          validator:checkUid,
        }"
      >
        <el-input v-model="dynamicValidateForm.uid" />
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
        prop="repeatpassword"
        label="重复密码："
        :rules="{
          required: true,
          trigger: 'blur',
          validator: checkPass,
        }"
      >
        <el-input v-model="dynamicValidateForm.repeatpassword" />
      </el-form-item>

      <el-form-item prop="school" label="学校：">
        <el-input v-model="dynamicValidateForm.school" />
      </el-form-item>

      <el-form-item prop="unumber" label="学号:">
        <el-input v-model="dynamicValidateForm.unumber" />
      </el-form-item>

      <el-form-item
        prop="email"
        label="邮箱："
        :rules="{
          type: 'email',
          message: '请输入正确的邮箱！',
          trigger: ['blur', 'change'],
        }"
      >
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
