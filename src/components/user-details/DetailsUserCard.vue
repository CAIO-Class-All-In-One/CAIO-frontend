<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { reactive, ref, watch } from "vue";

const emit = defineEmits(["detailsUpdate"]);

interface Props {
  username: string;
  school: string;
  email: string;
  unumber: string;
}

const dialogFormVisible = ref(false);
const props = defineProps<Props>();
const form = reactive({ ...props });
const formEl = ref<FormInstance>();

const UserInfoKVMap = [
  { key: "username", label: "用户名" },
  { key: "school", label: "学校" },
  { key: "unumber", label: "学号" },
  { key: "email", label: "邮箱" },
];

watch(props, () => {
  Object.assign(form, { ...props });
});

const updateUserInfo = () => {
  emit("detailsUpdate", form);
};

const handleUpdateUserInfo = () => {
  const e = formEl.value;
  if (!e) return;
  e.validate((valid) => {
    if (valid) {
      dialogFormVisible.value = false;
      updateUserInfo();
      return true;
    } else {
      return false;
    }
  });
};
</script>
<template>
  <!-- 个人信息 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户基础信息</span>
      </div>
    </template>
    <el-descriptions border :column="1" size="large">
      <el-descriptions-item
        v-for="item in UserInfoKVMap"
        :key="item.key"
        :label="`${item.label}: `"
        label-class-name="label-col"
        label-align="center"
      >
        {{ props[item.key as keyof Props] }}
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin: 1.5em auto; float: right">
      <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
      <!-- <el-button type="primary">修改密码</el-button> -->
    </div>
  </el-card>
  <!-- 修改信息 -->
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form ref="formEl" :model="form">
      <el-form-item
        v-for="item in UserInfoKVMap.filter((v) => v.key !== 'username' && v.key !== 'email')"
        :key="item.key"
        :label="`${item.label}: `"
        :label-width="80"
      >
        <el-input v-model="form[item.key as keyof Props]" autocomplete="off" />
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱："
        :label-width="80"
        :rules="{
          type: 'email',
          message: '请输入正确的邮箱！',
          trigger: ['blur'],
        }"
      >
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleUpdateUserInfo">确认</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scope lang="postcss"></style>
