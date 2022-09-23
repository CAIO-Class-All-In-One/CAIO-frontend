<script setup lang="ts">
import { IDataUser } from "~/composables";

const dialogFormVisible = ref(false);
const props = defineProps<IDataUser>();
const UserInfoKVMap = new Map({
  用户名: props.username,
});
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
      <el-descriptions-item label="用户名: " label-class-name="label-col" label-align="center">{{
        userinfo.username
      }}</el-descriptions-item>
      <el-descriptions-item label="学校: " label-class-name="label-col" label-align="center">{{
        userinfo.school
      }}</el-descriptions-item>
      <el-descriptions-item label="学号: " label-class-name="label-col" label-align="center">{{
        userinfo.unumber
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱: " label-class-name="label-col" label-align="center">{{
        userinfo.email
      }}</el-descriptions-item>
    </el-descriptions>
    <div style="margin: 1.5em auto; float: right">
      <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
      <!-- <el-button type="primary">修改密码</el-button> -->
    </div>
  </el-card>
  <!-- 修改信息 -->
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form :model="form">
      <el-form-item label="学校: " :label-width="80">
        <el-input v-model="form.school" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学号: " :label-width="80">
        <el-input v-model="form.unumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱: " :label-width="80">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="(dialogFormVisible = false), handleUpdateUserInfo()">确认</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scope lang="postcss"></style>
