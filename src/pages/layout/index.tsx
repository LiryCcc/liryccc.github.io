import { Loading } from '@/components/loading';
import { LANGUAGES } from '@/constants/language';
import { useI18n, useTheme } from '@/hooks';
import { Button, Link, Text } from '@fluentui/react-components';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import styles from './index.module.css';

const Layout = () => {
  const { t, currentLanguage, changeLanguage } = useI18n('layout');
  const { theme, toggle, isDark } = useTheme();

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === LANGUAGES.ZH ? LANGUAGES.EN : LANGUAGES.ZH;
    changeLanguage(newLanguage);
  };

  return (
    <div className={styles['container']} data-theme={theme}>
      <header className={styles['header']}>
        <div className={styles['header-content']}>
          <Text as='h1' size={600} weight='bold' className={styles['title']}>
            {t('title')}
          </Text>
          <nav className={styles['nav']}>
            <Button appearance='subtle'>
              <Link href='/' appearance='subtle' className={styles['nav-link']}>
                {t('home')}
              </Link>
            </Button>
            <Button appearance='subtle'>
              <Link href='/about' appearance='subtle' className={styles['nav-link']}>
                {t('about')}
              </Link>
            </Button>
            <Button
              appearance='subtle'
              onClick={handleLanguageToggle}
              aria-label={t('switchLanguage')}
              className={styles['language-toggle']}
            >
              {currentLanguage === LANGUAGES.ZH ? 'EN' : '中文'}
            </Button>
            <Button
              appearance='subtle'
              onClick={toggle}
              icon={isDark ? '☀️' : '🌙'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={styles['theme-toggle']}
            >
              {isDark ? '☀️' : '🌙'}
            </Button>
          </nav>
        </div>
      </header>
      <main className={styles['main']}>
        <div className={styles['content']}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
