
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import css from "@eslint/css";
import pluginVitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },

  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
  },

  {
    files: ['**/*.json'],
    language: 'json/json',
    ...json.configs.recommended
  },

  {
    files: ['**/*.css'],
    language: 'css/css',
    ...css.configs.recommended
  },
);
