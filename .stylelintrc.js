/**
 * @param {import('stylelint').Config} config
 * @returns {import('stylelint').Config}
 */
const defineConfig = (config) => config;

const stylelintConfig = defineConfig({
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['**/node_modules/**', '**/out/**']
});

export default stylelintConfig;
