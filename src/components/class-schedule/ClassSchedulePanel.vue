<script setup lang="ts">
import { ElNotification, TableV2Instance } from "element-plus";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { computed, ref } from "vue";
import { ICourseObj } from "~/composables";

const props = defineProps<{
  week: number;
  data: Record<number, ICourseObj>;
}>();

interface ScheduleRowObj {
  [weekday: number]: ICourseObj | undefined;
}

const rowHeight = ref(0);
const tableEl = ref<TableV2Instance>();

const section = ((
  last: number,
  space: number,
  gutter: number,
  ...sections: [start: string, ...arrange: number[]][]
) => {
  const _sections: string[] = [];
  sections.forEach((v) => {
    const startStr = (v.shift() as string).split(":").map((v) => parseInt(v));
    let start = new Date(0, 0, 0, ...startStr);
    (v as number[]).forEach((v) => {
      for (let j = 0; j < v; j++) {
        const _start = new Date(start.getTime());
        start.setMinutes(start.getMinutes() + last);
        _sections.push(
          Intl.DateTimeFormat("zh-CN", { hour12: false, hour: "2-digit", minute: "2-digit" }).formatRange(_start, start)
        );
        start.setMinutes(start.getMinutes() + space);
      }
      start.setMinutes(start.getMinutes() + gutter - space);
    });
  });
  return _sections;
})(45, 5, 15, ["8:00", 3, 2], ["14:00", 3, 2], ["19:00", 3]);

const displayData = computed(() => {
  const data = Object.keys(props.data).map((key) => props.data[Number(key)]);
  const display: Array<ScheduleRowObj> = [];
  for (let i = 1; i <= 13; i++) {
    display[i] = {} as ScheduleRowObj;
    for (let j = 1; j <= 5; j++) {
      display[i][j] = undefined;
    }
  }
  data.forEach((courseData) => {
    courseData.time.forEach((courseTime) => {
      if (courseTime.weeks.includes(props.week)) {
        const { start: x, weekday: y } = courseTime;
        try {
          display[x][y] = courseData;
        } catch (e) {
          ElNotification.error({ title: "课程信息错误", message: `课程 ${courseData.name} 开始小节为 ${x} 无法显示!` });
        }
      }
    });
  });
  return display;
});

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

const handleCellClick = () => {
  // TODO
};

const handleCellHoverOn = () => {
  // TODO
  return false;
};

const handleCellHoverOff = () => {
  // TODO
  return false;
};

const cellStyleGuard = ({
  rowIndex,
}: {
  row: ScheduleRowObj;
  column: TableColumnCtx<ScheduleRowObj>;
  rowIndex: number;
  columnIndex: number;
}) => {
  const trEl: HTMLTableRowElement = tableEl.value?.$el.querySelector("tr[class*='el-table__row']");
  rowHeight.value = trEl.offsetHeight;
  return { zIndex: 15 - rowIndex + 1 };
};

const rowSpan = (course: ICourseObj, columnIndex: number, rowIndex: number) => {
  if (course) {
    return course?.time.find((v) => columnIndex === v.weekday && rowIndex + 1 === v.start)?.span;
  }
};
</script>

<template>
  <el-table
    id="scheudel-table"
    ref="tableEl"
    height="100%"
    :data="displayData"
    :border="true"
    :cell-style="cellStyleGuard"
    @cell-mouse-enter="handleCellHoverOn"
    @cell-mouse-leave="handleCellHoverOff"
    @cell-click="handleCellClick"
  >
    <el-table-column label="" align="center" fixed>
      <template #default="scope">
        {{ `第${scope.$index + 1}小节` }}
        <br />
        {{ section[scope.$index] }}
      </template>
    </el-table-column>
    <template v-for="item in 5" :key="item">
      <el-table-column :prop="item.toString()" :label="`星期${'一二三四五'.at(item - 1)}`" align="center">
        <template #default="scope">
          <div v-if="scope.row[item]" class="container">
            <el-popover
              effect="light"
              trigger="click"
              placement="top"
              :popper-options="popperOptions"
              :show-arrow="false"
              width="auto"
            >
              <template #default>
                <p>课程: {{ (scope.row[item] as ICourseObj).name }}</p>
                <p>课序号: {{ (scope.row[item] as ICourseObj).cid }}</p>
                <p>课程号: {{ (scope.row[item] as ICourseObj).cnumber }}</p>
                <p>老师: {{ (scope.row[item] as ICourseObj).teacher }}</p>
                <p>教室: {{ (scope.row[item] as ICourseObj).classroom }}</p>
                <p>学分: {{ (scope.row[item] as ICourseObj).credit }}</p>
              </template>
              <template #reference>
                <el-card
                  shadow="hover"
                  class="card"
                  :style="{ height: `${(rowHeight - 1) * rowSpan(scope.row[item], item, scope.$index)! + 1}px` }"
                >
                  <p>{{ (scope.row[item] as ICourseObj).name }}</p>
                  <p>{{ (scope.row[item] as ICourseObj).classroom }}</p>
                  <p>{{ (scope.row[item] as ICourseObj).teacher }}</p>
                </el-card>
              </template>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="postcss">
.el-table {
  --el-table-row-hover-bg-color: transparent;
}

p {
  font-family: var(--font-family-sans);
  line-height: 2em;
}
.card {
  border: none;
}

.container {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
}
</style>
<style>
.el-table__body-wrapper .el-scrollbar__bar {
  z-index: 15;
}
</style>
