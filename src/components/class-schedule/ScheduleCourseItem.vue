<script setup lang="ts">
import { toRefs, computed } from "vue";
import { ICourseObj, ItemObj, useRangeRandom } from "~/composables";

interface ScheduleRowObj {
  [weekday: number]: ICourseObj | undefined;
}

interface Props {
  rowHeight: number;
  item: number;
  index: number;
  row: ScheduleRowObj;
}

const props = defineProps<Props>();
const { rowHeight, item, row, index } = toRefs(props);

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

const rowSpan = <ITEM extends ItemObj>(item: ITEM, columnIndex: number, rowIndex: number) => {
  if (item) {
    return item?.time.find((v) => columnIndex === v.weekday && rowIndex + 1 === v.start)?.span;
  }
};

const classroom = computed(() => {
  const _weekday = item.value;
  const _index = row.value[_weekday]?.time.findIndex((v) => {
    return v.start == index.value + 1 && v.weekday == _weekday;
  });
  return row.value[item.value]?.classroom.split(",")[_index!];
});
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
      <p>课程: {{ row[item]?.name }}</p>
      <p>课序号: {{ row[item]?.cid }}</p>
      <p>课程号: {{ row[item]?.cnumber }}</p>
      <p>老师: {{ row[item]?.teacher }}</p>
      <p>教室: {{ classroom }}</p>
      <p>学分: {{ row[item]?.credit }}</p>
    </template>
    <template #reference>
      <el-card
        shadow="hover"
        class="schedule-item-card"
        :style="{ 
                    height: `${(rowHeight - 1) * rowSpan(row[item]!, item, index)! + 1}px`,
                    backgroundColor: `rgba(${ 
                        useRangeRandom(232, 255)
                    } ${ 
                        useRangeRandom (232, 255)
                    } ${ 
                        useRangeRandom (232, 255)
                    }/ 100%)`,
                    boxShadow: `var(--el-shadow-light)`
                }"
      >
        <p>{{ row[item]?.name }}</p>
        <p>{{ classroom }}</p>
        <p>{{ row[item]?.teacher }}</p>
      </el-card>
    </template>
  </el-popover>
</template>

<style scoped>
p {
  font-family: var(--font-family-sans);
  line-height: 2em;
}
</style>
