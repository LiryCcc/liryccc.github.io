import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES, SUPPORTED_LANGUAGES } from './constants/language';
import { store } from './store';
import { syncSystemTheme } from './store/app-slice';
import { en } from './translations/en';
import { translationSchema } from './translations/schema';
import { zh } from './translations/zh';
import { getSystemTheme } from './utils/theme';

const initI18n = () => {
  const zhTranslations = translationSchema.safeParse(zh);
  const enTranslations = translationSchema.safeParse(en);
  if (!zhTranslations.success || !enTranslations.success) {
    throw new Error('Invalid translations');
  }
  return {
    zhTranslations: zhTranslations.data,
    enTranslations: enTranslations.data
  };
};

const init = async () => {
  const { zhTranslations, enTranslations } = initI18n();
  i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: LANGUAGES.EN,
      supportedLngs: [...SUPPORTED_LANGUAGES],
      resources: {
        [LANGUAGES.EN]: {
          translation: enTranslations
        },
        [LANGUAGES.ZH]: {
          translation: zhTranslations
        }
      }
    });

  // 初始化时同步系统主题
  const systemTheme = getSystemTheme();
  store.dispatch(syncSystemTheme(systemTheme));
};

export default init;
