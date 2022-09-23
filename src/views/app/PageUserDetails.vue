<script setup lang="ts">
import { reactive, ref } from "vue";
import { usePluginData, useUserDataStore } from "~/composables";
import router from "~/router";
import image from "/image.png";

const userdata = useUserDataStore();

const userdata = useUserData();
const userinfo = ref<IDataUser>({ email: "", school: "", unumber: "", username: "" });
const form = userinfo;

watch(userdata, async (state) => {
  if (!state.isLoading) {
    handleUserInfos(state.username);
  }
});

onMounted(() => {
  if (!userdata.isLoading) {
    handleUserInfos(userdata.username);
  }
});

const handleUserInfos = async (username: string) => {
  if (!username) return;
  try {
    userinfo.value = (await getUserData(username)).data;
  } catch (error) {
    ElNotification.error({ title: "出错了", message: "用户信息加载失败" });
  }
};

const handleUpdateUserInfo = async () => {
  try {
    userdata.isLoading = true;
    const result = await updateUserData(userdata.username, userinfo.value);
    if (result.code.toString().startsWith("2") && result.data.success) {
      const { username, school } = result.data;
      userdata.$patch({
        username,
        school,
      });
      ElNotification.success({ title: "更新用户信息", message: JSON.stringify(result.data) });
    } else {
      throw new Error("User Info Update Error");
    }
  } catch (error) {
    ElNotification.error({ title: "出错了", message: "更新用户信息失败" });
  } finally {
    userdata.isLoading = false;
  }
};
</script>

<template>
  <div class="container">
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
    <!-- 修改密码 -->
  </div>
</template>

<style lang="postcss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 800px;
}

.label-col {
  width: 33%;
}
</style>
