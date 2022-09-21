<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ (e: "weekChange", value: number): void }>();
const week = ref(1);
</script>

<template>
  <el-slider v-model="week" :step="1" show-stops :min="1" :max="22" @change="(val) => emit('weekChange', val)" />
</template>

<style scoped lang="postcss"></style>
