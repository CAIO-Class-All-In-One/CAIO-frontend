<script setup lang="ts">
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { getCourses, getTodos, IDataUser, RestfulData, useCurrentWeek } from "~/composables";
import { useAppState, useGlobalStore } from "~/composables/store";

const store = useGlobalStore();
const state = useAppState();

const { week, courses, todos } = storeToRefs(state);

store.$subscribe(
  (mutation, newState) => {
    if (!newState.isLoading) {
      state.week = useCurrentWeek(newState.weekStart);
      if (Object.keys(state.courses).length === 0 || (mutation.type === "patch object" && mutation.payload.unumber)) {
        handleCourseInfo(newState);
      }
    }
  },
  { detached: true }
);

onMounted(() => {
  if (!store.isLoading) {
    state.week = useCurrentWeek(store.weekStart);
    if (Object.keys(state.courses).length === 0) {
      handleCourseInfo(store);
    }
  }
});

const handleCourseInfo = async (data: Pick<IDataUser, "username" | "unumber">) => {
  try {
    const getData = async function <T>(
      query: string,
      /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      dataProvider: (query: string) => Promise<RestfulData<T[]>>,
      postEffect: (data: T[]) => void
    ) {
      const { code, data, msg } = await dataProvider(query);
      if (String(code).startsWith("2")) {
        postEffect(data);
      } else {
        throw new Error(`获取课程信息错误: ${msg}`);
      }
    };

    getData(data.unumber, getCourses, (data) => {
      data.forEach((v) => {
        courses.value[v.cnumber] = v;
      });
      console.log(`[App-ClassSchedule]: Update Courses Info`);
    });

    getData(data.username, getTodos, (data) => {
      todos.value = data;
      console.log(`[App-ClassSchedule]: Update Todos Info`);
    });
  } catch (error) {
    ElNotification.error({ title: "获取课表信息", message: String(error) });
  }
};
</script>

<template>
  <class-schedule-panel :week="week" :course-data="courses" :todo-data="todos" />
</template>
