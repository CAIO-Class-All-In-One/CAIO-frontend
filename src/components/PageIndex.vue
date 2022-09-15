<script setup lang="ts">
import { IconCube } from "@iconify-prerendered/vue-uil";
</script>

<template>
  <el-container>
    <el-header>
      <page-index-header />
    </el-header>
    <el-main>
      <el-row justify="center">
        <el-col :span="8">
          <div id="main-description">
            <img id="logo" src="/icon.png" alt="logo" width="256" height="256" role="img" />
            <h1>CAIO</h1>
            <p>Class All In One</p>
            <p>最舒适的课表查看体验</p>
            <el-button id="btn-start" type="primary">立即使用</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer> ©2022<el-divider direction="vertical" /> CAIO <IconCube /> 项目开发组 </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
header {
  display: flex;
  grid-column: full;
  align-items: center;
  padding: calc(3em / 4) 1em;
  height: var(--page-idnex-header-height);
  background-color: rgba(255 255 255 / 0.75);
  box-shadow: 0 1px 4px 0 hsl(0deg 0% 0% / 20%);
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: var(--page-index-main-height);
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: #f6f2ee solid 1px;
  height: var(--page-index-footer-height);
}

#logo {
  width: 256px;
  height: 256px;
  &:hover {
    animation: 1.5s 1 alternate logo-rotate;
    animation-timing-function: ease-in-out;
  }
  margin-bottom: 2em;
}

#main-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-size: 2.5em;
}

#btn-start {
  transition: all 0.3s;
  margin-top: 2em;
  font-size: 1.5rem;
  height: fit-content;
}

@keyframes logo-rotate {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
