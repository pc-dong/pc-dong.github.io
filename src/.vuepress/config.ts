import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { markdownChartPlugin } from "@vuepress/plugin-markdown-chart";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  locales: {
    "/": {
      lang: "en-US",
      title: "PC-Dong",
      description: "PC-Dong 的博客",
    },
  },

  theme,

  plugins: [
    markdownChartPlugin({
      flowchart: true,
      mermaid: true,
    }),
  ],

  shouldPrefetch: false,
});
