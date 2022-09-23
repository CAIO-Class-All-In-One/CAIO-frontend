<script setup lang="ts">
import { IconExternalLinkAlt } from "@iconify-prerendered/vue-uil";
</script>

<template>
  <router-link class="logo-container" to="/">
    <img src="/logo.png" alt="logo" crossorigin="anonymous" height="48" />
    CAIO
  </router-link>
  <ul id="nav-container">
    <li>
      <router-link to="/guide/app" class="nav-link"><span>使用教程</span></router-link>
    </li>
    <li>
      <router-link to="/guide/plugin" class="nav-link"><span>插件开发指南</span></router-link>
    </li>
    <li>
      <a href="https://github.com/CAIO-Class-All-In-One/CAIO-frontend" target="_blank" class="nav-link">
        <span>
          关于
          <IconExternalLinkAlt
            style="margin-inline-start: 0.4em; color: var(--el-text-color-secondary); width: 16px; height: 16px"
          />
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.logo-container {
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
    box-shadow: var(--box-shadow-light);
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0 0 0 / 24%);
    }
  }
}

#nav-container {
  display: flex;
  align-items: center;
  margin: auto;
  & > li {
    list-style: none;
    & > .nav-link {
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
  & > li:nth-child(3) .nav-link {
    display: flex;
    align-items: center;
  }
}
</style>
