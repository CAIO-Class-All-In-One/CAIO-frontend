<script setup lang="ts">
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { onMounted, reactive, watch } from "vue";
import { getCourses, ICourseObj, useCurrentWeek } from "~/composables";
import { useAppState, useGlobalStore } from "~/composables/store";

const courses = reactive<Record<number, ICourseObj>>({});
const store = useGlobalStore();
const state = useAppState();

const { week } = storeToRefs(state);

watch(store, async (state) => {
  if (!state.isLoading) {
    handleCourseInfo(state.unumber);
  }
});

onMounted(() => {
  if (!store.isLoading) {
    handleCourseInfo(store.unumber);
  }
});

const handleCourseInfo = async (unumber: string) => {
  try {
    state.week = useCurrentWeek(store.weekStart);
    const { data, msg, code } = await getCourses(unumber);
    if (String(code).startsWith("2")) {
      data.forEach((v) => {
        courses[v.cnumber] = v;
      });
      console.log(`[App-ClassSchedule]: ${msg}`);
      // ElNotification.success({ title: "获取课程信息", message: msg });
    } else {
      throw new Error("获取课程信息错误");
    }
  } catch (error) {
    ElNotification.error({ title: "获取课程信息", message: String(error) });
  }
};
</script>

<template><ClassSchedulePanel :week="week" :data="courses" /></template>
