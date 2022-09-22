<script setup lang="ts">
import { ref } from "vue";
defineEmits(["weekChange"]);
const sliderVal = ref(0);
</script>

<template>
  <el-slider
    v-model="sliderVal"
    :step="1"
    show-stops
    show-input
    :min="1"
    :max="22"
    @change="
      (val) => {
        $emit('weekChange', val);
      }
    "
  />
</template>

<style scoped lang="postcss"></style>
