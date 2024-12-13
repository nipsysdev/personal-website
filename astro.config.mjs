// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

export default defineConfig({
  prefetch: true,
  integrations: [react(), tailwind(), icon()],
});
