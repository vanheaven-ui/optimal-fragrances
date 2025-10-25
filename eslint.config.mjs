// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // This object allows you to add or override specific rules.
    // By default, it applies to all files if no 'files' property is specified,
    // but the 'next/typescript' config typically scopes rules to TypeScript files.
    rules: {
      // Disables the ESLint rule that warns about using 'any' type explicitly.
      // While disabling this suppresses the error, it's generally recommended
      // to use more specific types or 'unknown' with type narrowing for robust code.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
