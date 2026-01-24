const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**coverage/**'],
  rules: {
    // 允许以 color 开头的非 kebab-case 主题变量（FluentUI 使用 camelCase）
    'custom-property-pattern': [
      '^(color([A-Z][a-z0-9]*)+|[a-z][a-z0-9]*(-[a-z0-9]+)*)$',
      {
        message:
          'Custom property names starting with "color" can be camelCase (FluentUI variables), others should be kebab-case'
      }
    ]
  }
};

export default stylelintConfig;
