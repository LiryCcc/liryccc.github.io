import type { Language } from '@/constants/language';
import type { Translation } from '@/translations/schema';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type TranslationKey = keyof Translation;
type TranslationValue<T extends TranslationKey> = Translation[T];
type TranslationSubKey<T extends TranslationKey> = keyof TranslationValue<T>;

export const useI18n = <T extends TranslationKey>(namespace: T) => {
  const { i18n, t: originalT } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = useCallback(
    (lng: Language) => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );

  const t = useCallback(
    (key: TranslationSubKey<T>): string => {
      return originalT(`${namespace}.${String(key)}` as never);
    },
    [namespace, originalT]
  );

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};
