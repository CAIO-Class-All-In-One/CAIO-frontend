<template>
  <a id="logo" href="/">
    <img src="/icon.png" alt="logo" crossorigin="anonymous" height="48" />
    CAIO
  </a>
  <ul id="nav-container">
    <li class="item">
      <a href="/guide"><span>使用教程</span></a>
    </li>
    <li class="item">
      <a href="/plugin"><span>插件开发指南</span></a>
    </li>
    <li class="item">
      <a href="/about"><span>关于</span></a>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
#logo {
  position: absolute;
  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 48px;
  text-decoration: none;
  color: var(--color-text-normal);

  & > img {
    margin-right: 0.2em;
    border-radius: 12px;
    transition: all 0.3s;
    box-shadow: var(--el-box-shadow-lighter);
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0 0 0 / 24%);
    }
  }
}

#nav-container {
  display: flex;
  margin: auto;
  & > .item {
    list-style: none;
    & > a {
      padding: 1em 2em;
      height: 100%;
      color: var(--color-text-normal);
      text-decoration: none;
      font-weight: bold;
      & > span {
        transition: all 0.3s;
        border-bottom: 2px solid transparent;
      }
      &:hover > span {
        border-bottom: 2px solid var(--color-text-normal);
      }
    }
  }
}
</style>
