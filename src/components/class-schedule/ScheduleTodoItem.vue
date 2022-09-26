<script setup lang="ts">
import { ElNotification } from "element-plus";
import { toRefs } from "vue";
import { ItemObj, useAppState, useGlobalStore, delTodo, useRangeRandom } from "~/composables";

interface ScheduleRowObj {
  [weekday: number]: ItemObj | undefined;
}

interface Props {
  rowHeight: number;
  item: number;
  row: ScheduleRowObj;
}

const props = defineProps<Props>();
const { rowHeight, item, row } = toRefs(props);
const state = useAppState();
const store = useGlobalStore();

const popperOptions = {
  modifiers: [
    {
      name: "preventOverflow",
      options: {
        padding: 12,
        altAxis: true,
      },
    },
  ],
};

const handleDelTodo = async () => {
  const todo = row.value[item.value]!;
  try {
    const { code, data, msg } = await delTodo(store.username, todo.extra.todoId);
    if (code.toString().startsWith("2") && data.success) {
      ElNotification.success(`删除Todo: ${msg}`);
      state.$patch((_state) => {
        const ind = _state.todos.findIndex((v) => {
          return v === todo;
        });
        _state.todos.splice(ind, 1);
      });
    } else {
      throw new Error(msg);
    }
  } catch (err) {
    ElNotification.error(`删除Todo失败: ${err}`);
  }
};
</script>
<template>
  <el-popover
    effect="light"
    trigger="click"
    placement="top"
    :popper-options="popperOptions"
    :show-arrow="false"
    width="auto"
  >
    <template #default>
      <div class="container" style="flex-direction: row">
        <el-button @click="handleDelTodo">删除该todo</el-button>
      </div>
    </template>
    <template #reference>
      <el-card
        shadow="hover"
        class="schedule-item-card"
        :style="{
          height: `${rowHeight - 1}px`,
          backgroundColor: `rgba(${useRangeRandom(232, 255)},${useRangeRandom(232, 255)},${useRangeRandom(
            232,
            255
          )}, 1)`,
          boxShadow: `var(--el-shadow-light)`,
        }"
      >
        <p>{{ row[item]?.name }}</p>
      </el-card>
    </template>
  </el-popover>
</template>

<style scoped>
.schedule-item-card::after {
  content: "Todo:";
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  font-family: var(--font-family-sans);
}
</style>
