import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import Player from "./components/Player.vue";
import Image from "./components/Image.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Player", Player);
    app.component("Image", Image);
  },
} satisfies Theme;
