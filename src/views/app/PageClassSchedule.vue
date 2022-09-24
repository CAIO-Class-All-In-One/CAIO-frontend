<script setup lang="ts">
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { getCourses, useCurrentWeek } from "~/composables";
import { useAppState, useGlobalStore } from "~/composables/store";

const store = useGlobalStore();
const state = useAppState();

const { week, courses } = storeToRefs(state);

store.$subscribe(
  (mutation, newState) => {
    if (!newState.isLoading) {
      state.week = useCurrentWeek(newState.weekStart);
      if (Object.keys(state.courses).length === 0 || (mutation.type === "patch object" && mutation.payload.unumber)) {
        handleCourseInfo(newState.unumber);
      }
    }
  },
  { detached: true }
);

onMounted(() => {
  if (!store.isLoading) {
    if (Object.keys(state.courses).length === 0) {
      handleCourseInfo(store.unumber);
    }
  }
});

const handleCourseInfo = async (unumber: string) => {
  try {
    const { data, msg, code } = await getCourses(unumber);
    if (String(code).startsWith("2")) {
      data.forEach((v) => {
        courses.value[v.cnumber] = v;
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
