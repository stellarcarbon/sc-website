import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Overrides Next's restriction on plain <img> components
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
