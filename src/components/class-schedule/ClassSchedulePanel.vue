<script setup lang="ts">
import { ElNotification } from "element-plus";
import { onMounted, reactive } from "vue";
import { getCourses, ICourseObj, useUserDataStore } from "~/composables";

const courses = reactive<Record<number, ICourseObj>>({});
const userdata = useUserDataStore();

const renderScheduleTable = () => {

};

onMounted(async () => {
  try {
    const { data, msg, code } = await getCourses(userdata.username);
    if (String(code).startsWith("2")) {
      data.forEach((v) => {
        courses[v.cid] = v;
      });
      renderScheduleTable();
      ElNotification.success({ title: "获取课程信息", message: msg });
    } else {
      throw new Error("获取课程信息错误");
    }
  } catch (error) {
    ElNotification.error({ title: "获取课程信息", message: String(error) });
  }
});
</script>

<template>
  <el-table id="scheudel-table"> </el-table>
</template>

<style scoped lang="postcss">
#scheudel-table {
  height: 100%;
}
</style>
