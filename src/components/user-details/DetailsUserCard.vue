<script setup lang="ts">
import { ref } from "vue";
import { IDataUser } from "~/composables";

const emit = defineEmits(["detailsUpdate"]);
const dialogFormVisible = ref(false);
const props = defineProps<{ username: string; school: string; email: string; unumber: string; weekStart: number }>();
const form = ref(props);
const UserInfoKVMap = [
  { key: "username", label: "用户名", value: ref(props.username) },
  { key: "school", label: "学校", value: ref(props.school) },
  { key: "unumber", label: "学号", value: ref(props.unumber) },
  { key: "email", label: "邮箱", value: ref(props.email) },
];

const updateUserInfo = () => {
  emit("detailsUpdate", form);
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
        {{ item.value.value }}
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin: 1.5em auto; float: right">
      <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
      <!-- <el-button type="primary">修改密码</el-button> -->
    </div>
  </el-card>
  <!-- 修改信息 -->
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form :model="form">
      <el-form-item
        v-for="item in UserInfoKVMap.filter((v) => v.key !== 'username')"
        :key="item.key"
        :label="`${item.label}: `"
        :label-width="80"
      >
        <el-input v-model="form[item.key as keyof IDataUser]" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="(dialogFormVisible = false), updateUserInfo()">确认</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scope lang="postcss"></style>
