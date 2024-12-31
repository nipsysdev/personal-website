// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import relativeLinks from "astro-relative-links";

export default defineConfig({
  prefetch: true,
  integrations: [react(), tailwind(), icon(), relativeLinks()],
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  site: "https://xaviers.sh",
});
