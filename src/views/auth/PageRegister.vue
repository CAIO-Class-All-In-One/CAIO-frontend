<template>
  <el-container>
    <el-main>
      <el-col id="register-container" :span="10">
        <img src="/logo.png" alt="logo" width="128" height="128" />
        <register-form id="register-form" />
      </el-col>
    </el-main>
    <el-footer>
      <base-footer />
    </el-footer>
  </el-container>
</template>

<style scoped lang="postcss">
.el-main {
  align-items: center;
}

#register-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  box-shadow: var(--box-shadow-light);
  & > img {
    margin: 2em auto;
  }
  & > #register-form {
    margin: 2em;
  }
}
</style>
