<script setup lang="ts">
import { reactive, ref } from "vue";
import { usePluginData, useUserDataStore } from "~/composables";
import router from "~/router";
import image from "/image.png";

const userdata = useUserDataStore();

const back = () => {
  router.push("/app");
};
</script>

<template>
  <div style="background-color: #fcfcfc; font-family: 宋体; height: 100%">
    <div style="margin-top: 25px; margin-left: 80px">
      <el-row :gutter="10">
        <el-col :span="3">
          <div
            style="
              background-color: #ffebcd;
              width: 60px;
              height: 60px;
              display: inline-block;
              border-radius: 50%;
              overflow: hidden;
            "
          >
            <el-image :src="image" style="width: 60px; height: 60px"></el-image>
          </div>
          <div style="margin-top: 5px; margin-left: 1px"><span>学号920xxx</span></div>
          <div style="margin-top: 50px; margin-left: 8px">
            <el-button @click="back"><span>返回</span></el-button>
          </div>
          <div style="margin-top: 30px; margin-left: 2px">
            <el-button>修改头像</el-button>
          </div>
        </el-col>

        <el-col :span="21">
          <!-- 个人信息 -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>用户基础信息</span>
              </div>
            </template>
            <el-descriptions :column="2" size="large" width="500">
              <el-descriptions-item label="用户名:">kooriookami</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="真实姓名:">慢慢</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="用户名:">kooriookami</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="真实姓名:">慢慢</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="用户名:">kooriookami</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="真实姓名:">慢慢</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="用户名:">kooriookami</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
              <el-descriptions-item label="真实姓名:">慢慢</el-descriptions-item>
              <el-descriptions-item
                ><el-button type="primary">修改</el-button></el-descriptions-item
              >
            </el-descriptions>
          </el-card>

          <!-- 修改密码 -->
        </el-col>
      </el-row>
    </div>

    <div></div>
  </div>
</template>

<style scoped lang="postcss">
.name {
  text-align: right;
}
.value {
  text-align: left;
}

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
