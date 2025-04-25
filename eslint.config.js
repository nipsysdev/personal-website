import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".astro", "dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...eslintPluginAstro.configs.recommended,
      jsxA11y["flatConfigs"].recommended,
    ],
  },
);
