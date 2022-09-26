<script setup lang="ts">
import { dayjs, ElMessageBox, ElNotification, TableV2Instance } from "element-plus";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { computed, ref } from "vue";
import { addTodo, ICourseObj, ItemObj, useAppState, useGlobalStore } from "~/composables";

const props = defineProps<{
  week: number;
  courseData: Record<number, ICourseObj>;
  todoData: ItemObj[];
}>();

interface ScheduleRowObj {
  [weekday: number]: ItemObj | undefined;
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
    let start = dayjs(v.shift() as string, "H:mm").toDate();
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
  const data: ItemObj[] = Object.keys(props.courseData).map((key) => props.courseData[Number(key)]);
  const { todoData } = props;
  data.push(...todoData);

  const display: Array<ScheduleRowObj> = [];
  for (let i = 1; i <= 13; i++) {
    display[i] = {} as ScheduleRowObj;
    for (let j = 1; j <= 5; j++) {
      display[i][j] = undefined;
    }
  }

  data.forEach((item) => {
    item.time.forEach((time) => {
      if (time.weeks.includes(props.week)) {
        const { start: x, weekday: y } = time;
        if (x >= 14 || y >= 6) {
          return;
        }
        display[x][y] = item;
      }
    });
  });

  return display;
});

const useTableItem = (row: ScheduleRowObj, column: TableColumnCtx<ScheduleRowObj>) => {
  return row[column.no];
};

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
const handleCellClick = (row: ScheduleRowObj, column: any, cell: HTMLElement, event: any) => {
  const item = useTableItem(row, column);
  if (item || column.no == 0) {
    return;
  }
  ElMessageBox.prompt("输入Todo内容", "Todo", {
    confirmButtonText: "添加",
    cancelButtonText: "取消",
  })
    .then(({ value }) => {
      const weekday = (event.target as HTMLElement).getAttribute("data-col")!;
      const start = (event.target as HTMLElement).getAttribute("data-row")!;
      const todo: ItemObj = {
        extra: null,
        name: value,
        type: "todo",
        time: [
          {
            span: 1,
            start: parseInt(start),
            weekday: parseInt(weekday),
            weeks: useAppState().week as unknown as number[],
          },
        ],
      };
      return addTodo(useGlobalStore().username, todo);
    })
    .then(({ code, data, msg }) => {
      if (code.toString().startsWith("2")) {
        ElNotification.success(`添加Todo: ${msg}`);
        useAppState().$patch((_state) => {
          _state.todos.push(data);
        });
      } else {
        throw new Error(msg);
      }
    })
    .catch((err) => {
      if (err !== "cancel") {
        ElNotification.error(`添加Todo失败: ${err}`);
      }
    });
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
      <el-table-column
        :prop="item.toString()"
        :label="`星期${'一二三四五'.at(item - 1)}`"
        :resizable="false"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row[item]" class="container">
            <schedule-course-item
              v-if="scope.row[item].type === 'course'"
              :row-height="rowHeight"
              :row="scope.row"
              :item="item"
              :index="scope.$index"
            />
            <schedule-todo-item
              v-else-if="scope.row[item].type === 'todo'"
              :row-height="rowHeight"
              :row="scope.row"
              :item="item"
            />
          </div>
          <div v-if="!scope.row[item]" class="empty container" :data-col="item" :data-row="scope.$index"></div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="postcss">
.el-table {
  --el-table-row-hover-bg-color: transparent;
}

.container {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
}

.empty:hover {
  transition: all 0.3s;
  box-shadow: 0 0 4px 0 rgba(0 0 0/ 12%) inset;
}
</style>
<style lang="postcss">
.el-table__body-wrapper .el-scrollbar__bar {
  z-index: 15;
}
.schedule-item-card {
  border: none;
}
</style>
