<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserDataStore } from "~/composables";

const router = useRouter();
const userdata = useUserDataStore();

const clickHandler = async () => {
  const login = await userdata.isLogin;
  if (login) {
    router.push("/app");
  } else {
    router.push("/account/login");
  }
};
</script>

<template>
  <el-container>
    <el-header>
      <base-header />
    </el-header>
    <el-main>
      <el-row justify="center">
        <el-col :span="8">
          <div id="main-description">
            <img id="logo" src="/logo.png" alt="logo" width="256" height="256" role="img" />
            <h1>CAIO</h1>
            <p>Class All In One</p>
            <p>最舒适的课表查看体验</p>
            <el-button id="btn-start" type="primary" @click="clickHandler">立即使用</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <base-footer />
    </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
header {
  display: flex;
  grid-column: full;
  align-items: center;
  padding: calc(3em / 4) 1em;
  height: var(--page-index-header-height);
  background-color: rgba(255 255 255 / 0.75);
  box-shadow: 0 1px 4px 0 hsl(0deg 0% 0% / 20%);
}

main {
  flex-direction: column;
  min-height: 700px;
  overflow: hidden;
  & h1 {
    background: linear-gradient(135deg, rgb(255, 248, 134) 0%, rgb(240, 114, 182) 100%);
    color: transparent;
    background-clip: text;
  }
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
  margin-top: 2em;
  font-size: 1rem;
  height: fit-content;
  transition: all 0.3s;
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
