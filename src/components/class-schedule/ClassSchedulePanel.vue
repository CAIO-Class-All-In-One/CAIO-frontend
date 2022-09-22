<script setup lang="ts">
import { onUpdated } from "vue";
import { ICourseObj } from "~/composables";

const { week, data } = defineProps<{
  week: number;
  data: Array<ICourseObj>;
}>();

onUpdated(() => {

});

</script>

<template>
  <el-table id="scheudel-table"> </el-table>
</template>

<style scoped lang="postcss">
#scheudel-table {
  height: 100%;
}
</style>
