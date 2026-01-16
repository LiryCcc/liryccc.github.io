import type { Key } from 'react';

export const LANGUAGES = {
  ZH: 'zh',
  EN: 'en'
} as const;
export type A = Key;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const LANGUAGE_MAP = {
  [LANGUAGES.ZH]: 'zh',
  [LANGUAGES.EN]: 'en'
} as const;

export const SUPPORTED_LANGUAGES = [LANGUAGES.ZH, LANGUAGES.EN] as const;
