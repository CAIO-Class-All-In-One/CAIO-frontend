<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCourseData } from "~/composables/store";

const courseData = useCourseData();
const { week } = storeToRefs(courseData);
</script>

<template><ClassSchedulePanel :week="week" /></template>
