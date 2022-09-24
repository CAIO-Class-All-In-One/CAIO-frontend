<script setup lang="ts">
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useGlobalStore } from "~/composables";

const emit = defineEmits(["detailsUpdate"]);
const store = useGlobalStore();
const termDate = ref(dayjs().week(store.weekStart).toDate());

watch(storeToRefs(store).weekStart, () => {
  termDate.value = dayjs().week(store.weekStart).toDate();
});

const updateTermInfo = () => {
  emit("detailsUpdate", { weekStart: dayjs(termDate.value).week() });
};
</script>
<template>
  <!-- 学期信息 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>学期信息</span>
      </div>
    </template>
    <el-descriptions border :column="1" size="large">
      <el-descriptions-item label="本学期开始时间: " label-class-name="label-col" label-align="center">
        <el-date-picker v-model="termDate" type="week" format="[第 ]ww[ 周]" placeholder="请选择周数" />
      </el-descriptions-item>
    </el-descriptions>
    <div class="botton-group">
      <el-button type="primary" @click="updateTermInfo">保存</el-button>
    </div>
  </el-card>
</template>
<style scope lang="postcss">
.label-col {
  width: 33%;
}
</style>
