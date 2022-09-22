<script setup lang="ts">
import { ElNotification } from "element-plus";
import { onMounted, ref, watch } from "vue";
import { useUserData, getUserData, IDataUser, updateUserData } from "~/composables";

const dialogFormVisible = ref(false);

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
    if (result.data.success) {
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
  }
  userdata.isLoading = false;
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
        <el-descriptions-item label="用户名: ">{{ userinfo.username }}</el-descriptions-item>
        <el-descriptions-item label="学校: ">{{ userinfo.school }}</el-descriptions-item>
        <el-descriptions-item label="学号: ">{{ userinfo.unumber }}</el-descriptions-item>
        <el-descriptions-item label="邮箱: ">{{ userinfo.email }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin: 1.5em auto; float: right">
        <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
        <!-- <el-button type="primary">修改密码</el-button> -->
      </div>
    </el-card>
    <!-- 修改密码 -->
  </div>
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

<style scoped lang="postcss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 800px;
}
:deep(.el-descriptions__label) {
  margin-right: 40px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #909399;
}
:deep(.el-descriptions__cell) {
  padding-bottom: 35px;
  text-align: left;
}
:deep(.el-descriptions__content) {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #303133;
}
</style>
