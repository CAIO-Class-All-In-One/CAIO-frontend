<script setup lang="ts">
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { computed, onMounted, ref } from "vue";
import { ICourseObj } from "~/composables";

const props = defineProps<{
  week: number;
  data: Record<number, ICourseObj>;
}>();

interface ScheduleRowObj {
  [weekday: number]: ICourseObj | undefined;
}

interface SpanMethodProps {
  row: ScheduleRowObj;
  column: TableColumnCtx<ScheduleRowObj>;
  rowIndex: number;
  columnIndex: number;
}

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
    (v as number[]).forEach((v, i) => {
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
        display[x][y] = courseData;
      }
    });
  });
  return display;
});

const handleRowSpan = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (row[columnIndex] != undefined) {
    return [row[columnIndex]?.time.find((v) => columnIndex === v.weekday)?.span!, 1];
  }
  return [1, 1];
};

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
  console.log(":hhhh");
};

const handleCellHoverOn = () => {
  console.log(":hhhh1");
};

const handleCellHoverOff = () => {
  console.log(":hhhh2");
};

onMounted(() => {});
</script>

<template>
  <el-table
    id="scheudel-table"
    height="100%"
    :data="displayData"
    :border="true"
    :span-method="handleRowSpan"
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
          <div class="container">
            <el-popover
              v-if="scope.row[scope.column.no]"
              effect="light"
              trigger="click"
              placement="top"
              :popper-options="popperOptions"
              :show-arrow="false"
              width="auto"
            >
              <template #default>
                <p>课程: {{ (scope.row[scope.column.no] as ICourseObj).name }}</p>
                <p>课序号: {{ (scope.row[scope.column.no] as ICourseObj).cid }}</p>
                <p>课程号: {{ (scope.row[scope.column.no] as ICourseObj).cnumber }}</p>
                <p>老师: {{ (scope.row[scope.column.no] as ICourseObj).teacher }}</p>
                <p>教室: {{ (scope.row[scope.column.no] as ICourseObj).classroom }}</p>
                <p>学分: {{ (scope.row[scope.column.no] as ICourseObj).credit }}</p>
              </template>
              <template #reference>
                <el-card shadow="hover" class="container card">
                  <p>{{ (scope.row[scope.column.no] as ICourseObj).name }}</p>
                  <p>{{ (scope.row[scope.column.no] as ICourseObj).classroom }}</p>
                  <p>{{ (scope.row[scope.column.no] as ICourseObj).teacher }}</p>
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
#scheudel-table {
  height: 100%;
}
.el-table {
  --el-table-row-hover-bg-color: var(--el-table-bg-color);
}

p {
  line-height: 2em;
}
.card {
  margin: 2em;
  border: none;
}
</style>
