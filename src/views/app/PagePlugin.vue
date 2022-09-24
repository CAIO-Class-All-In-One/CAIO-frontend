<script setup lang="ts">
import { ElNotification, FormInstance } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import { usePluginData, useGlobalStore, usePluginApply } from "~/composables";
import { IPluginData } from "~/composables/action";

const userdata = useGlobalStore();
const pluginReqDialogVisable = ref(false);
const formEl = ref<FormInstance>();
const plguinReqForm = reactive({
  username: "",
  password: "",
  verifycode: "",
});
const curRepo = ref("");
const verifycodeSrc = ref("");

const plugins = ref<IPluginData[]>([]);

const handlePluginInfos = async () => {
  if (!userdata.school) return;
  plugins.value = (await usePluginData(userdata.school, "school")).data;
};

const applyPlugin = async (repo: string, params: any) => {
  console.log(`[Plugin]: 使用插件: ${repo}`);
  const { finished, info } = (await usePluginApply(repo, params)).data;

  if (finished) {
    ElNotification.success({ title: `插件: ${repo}`, message: "导入成功" });
    curRepo.value = "";
    verifycodeSrc.value = "";
  } else {
    verifycodeSrc.value = info.verifyCode ?? "";
    curRepo.value = repo;
    pluginReqDialogVisable.value = true;
    plguinReqForm.username = userdata.unumber;
  }
};

watch(userdata, async (state) => {
  if (!state.isLoading) {
    handlePluginInfos();
  }
});

onMounted(() => {
  if (!userdata.isLoading) {
    handlePluginInfos();
  }
});

watch(pluginReqDialogVisable, (e) => {
  if (e && formEl.value) {
    formEl.value.resetFields();
  }
});
</script>
<template>
  <div class="container" style="align-items: initial">
    <el-table :data="plugins">
      <el-table-column label="适配学校" width="180" prop="school">
        <!-- <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column label="仓库名" width="180" prop="repository"> </el-table-column>
      <el-table-column label="版本" width="180" prop="version">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>上次更新日期: {{ scope.row.date }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.version }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180" prop="username"> </el-table-column>
      <el-table-column label="">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="applyPlugin(scope.row.repository, { username: userdata.username })"
            >应用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 登录信息 -->
  <el-dialog v-model="pluginReqDialogVisable" title="应用插件">
    <el-form ref="formEl" :model="plguinReqForm">
      <el-form-item label="用户名: " prop="username">
        <el-input v-model="plguinReqForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码: " prop="password">
        <el-input v-model="plguinReqForm.password" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码: " prop="verifycode">
        <el-input v-model="plguinReqForm.verifycode" autocomplete="off">
          <template #append><img :src="verifycodeSrc" /></template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="(pluginReqDialogVisable = false), applyPlugin(curRepo, plguinReqForm)">
          确认
        </el-button>
        <el-button @click="pluginReqDialogVisable = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="postcss">
img {
  margin: 4px;
  height: 2em;
}
</style>
