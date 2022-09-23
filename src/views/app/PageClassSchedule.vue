<script setup lang="ts">
import { ElNotification } from "element-plus";
import { onMounted, reactive, watch } from "vue";
import { getCourses, ICourseObj, useUserData, useCourseData } from "~/composables";
import { storeToRefs } from "pinia";

const courseData = useCourseData();
const { week } = storeToRefs(courseData);

const courses = reactive<Record<number, ICourseObj>>({});
const userdata = useUserData();

watch(userdata, async (state) => {
  if (!state.isLoading) {
    handleCourseInfo(state.unumber);
  }
});

onMounted(() => {
  if (!userdata.isLoading) {
    handleCourseInfo(userdata.unumber);
  }
});

const handleCourseInfo = async (unumber: string) => {
  try {
    const { data, msg, code } = await getCourses(unumber);
    if (String(code).startsWith("2")) {
      data.forEach((v) => {
        courses[v.cnumber] = v;
      });
      ElNotification.success({ title: "获取课程信息", message: msg });
    } else {
      throw new Error("获取课程信息错误");
    }
  } catch (error) {
    ElNotification.error({ title: "获取课程信息", message: String(error) });
  }
};
</script>

<template><ClassSchedulePanel :week="week" :data="courses" /></template>
