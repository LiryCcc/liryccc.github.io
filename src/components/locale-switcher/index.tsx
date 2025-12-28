'use client';

import { useI18n } from '@/i18n';
import styles from './index.module.scss';

const LocaleSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className={styles['container']}>
      <button
        className={`${styles['button']} ${locale === 'zh' ? styles['active'] : ''}`}
        onClick={() => setLocale('zh')}
        aria-label="切换到中文"
      >
        中文
      </button>
      <button
        className={`${styles['button']} ${locale === 'en' ? styles['active'] : ''}`}
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
};

export default LocaleSwitcher;

