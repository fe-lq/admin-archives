/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'prettier',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prefer-const': 'error',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'vue/attribute-hyphenation': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/v-on-event-hyphenation': 'off'
  }
}
