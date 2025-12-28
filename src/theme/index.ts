import { createDarkTheme, createLightTheme, type BrandVariants } from '@fluentui/react-components';

const brandColors: BrandVariants = {
  10: '#020205',
  20: '#1a1a2e',
  30: '#16213e',
  40: '#0f3460',
  50: '#533483',
  60: '#6a4c93',
  70: '#8b6fa8',
  80: '#ab92bd',
  90: '#c9b5d3',
  100: '#e5d9e9',
  110: '#f0e8f3',
  120: '#faf7fc',
  130: '#ffffff',
  140: '#ffffff',
  150: '#ffffff',
  160: '#ffffff'
};

export const lightTheme = createLightTheme(brandColors);
export const darkTheme = createDarkTheme(brandColors);
