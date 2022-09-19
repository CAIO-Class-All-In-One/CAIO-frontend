<script setup>

</script>

<template>
  <el-tree
      class="titleTree"
      :data="titleData"
      accordion
      :props="defaultProps"
      @node-click="toTitle"
 ></el-tree>
</template>

<style>
.scrollbar-wrapper {
  overflow-x: hidden;
}
/**
 * layout
 */

</style>

