import { THEMES, type Theme } from '@/constants/theme';

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return THEMES.LIGHT;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};

export const watchSystemTheme = (callback: (theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    callback(e.matches ? THEMES.DARK : THEMES.LIGHT);
  };

  // 使用 addEventListener 如果支持，否则使用 addListener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  } else {
    // 兼容旧浏览器
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }
};
