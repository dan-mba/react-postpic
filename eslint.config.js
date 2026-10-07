// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactLint from '@eslint-react/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['dist/**/*', 'eslint.config.js', 'vite.config.ts'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      reactLint.configs["recommended-typescript"],
    ],
    languageOptions: {
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
      parserOptions: {
        // Enable project service for better TypeScript integration
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
    },
  },
);
