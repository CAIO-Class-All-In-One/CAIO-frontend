import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
    },
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    vue(),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
    ElementPlus(),
  ],
});
