<script setup lang="ts">
import { onMounted } from "vue";
import { usePluginData, useUserDataStore } from "~/composables";

const userdata = useUserDataStore();

onMounted(() => {
  const plugins = usePluginData(userdata.school, "school");
});
const updateClassHandler = async () => {};
</script>
<template>1</template>
<style></style>
