<script setup lang="ts">
import { toRefs } from "vue";
import { ItemObj, useRangeRandom } from "~/composables";

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
      <el-button>删除</el-button>
    </template>
    <template #reference>
      <el-card
        shadow="hover"
        class="card"
        :style="{
          height: `${rowHeight}px`,
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
