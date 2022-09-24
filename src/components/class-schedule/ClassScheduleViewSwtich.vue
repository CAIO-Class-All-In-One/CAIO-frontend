<script setup lang="ts">
import { ref } from "vue";
import { useAppState } from "~/composables";
defineEmits(["weekChange"]);

const state = useAppState();

const sliderVal = ref(state.week);

state.$subscribe(() => {
  sliderVal.value = state.week;
});
</script>

<template>
  <el-slider
    v-model="sliderVal"
    :step="1"
    show-stops
    show-input
    :format-tooltip="(value) => `第 ${value} 周`"
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
