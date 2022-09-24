<script setup lang="ts">
import { ElNotification } from "element-plus";

import { ref, onMounted, watch } from "vue";
import { useGlobalStore, IDataUser, getUserData, updateUserData } from "~/composables";

const data = useGlobalStore();
const userInfo = ref<IDataUser>();

watch(data, async (state) => {
  if (!state.isLoading) {
    handleUserInfos(state.username);
  }
});

onMounted(() => {
  if (!data.isLoading) {
    handleUserInfos(data.username);
  }
});

const handleUserInfos = async (username: string) => {
  if (!username) return;
  try {
    userInfo.value = (await getUserData(username)).data;
  } catch (error) {
    ElNotification.error({ title: "出错了", message: "用户信息加载失败" });
  }
};

const handleDetailsUpdate = async (newData: Partial<IDataUser>) => {
  console.log(`[App-UserDetails]: Update Info`);
  try {
    data.isLoading = true;
    userInfo.value = Object.assign(userInfo.value!, newData as IDataUser);
    const result = await updateUserData(data.username, userInfo.value);
    if (result.code.toString().startsWith("2") && result.data.success) {
      const { username, school, weekStart } = result.data;
      data.$patch({
        username,
        school,
        weekStart,
      });
      ElNotification.success({ title: "更新用户信息", message: JSON.stringify(result.data) });
    } else {
      throw new Error("User Info Update Error");
    }
  } catch (err) {
    ElNotification.error({ title: "出错了", message: `更新用户信息失败: ${err}` });
  } finally {
    data.isLoading = false;
  }
};
</script>

<template>
  <div class="container">
    <!-- <details-user-card /> -->
    <details-term-card @details-update="handleDetailsUpdate" />
  </div>
</template>

<style lang="postcss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 45vw;
  max-width: 720px;
}

.botton-group {
  margin: 1.5em auto;
  float: right;
}
</style>
