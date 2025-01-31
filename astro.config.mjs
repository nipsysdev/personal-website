// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import relativeLinks from "astro-relative-links";

export default defineConfig({
  trailingSlash: "always",
  integrations: [react(), tailwind(), icon(), relativeLinks()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
});
