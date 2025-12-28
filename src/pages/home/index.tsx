import { useI18n } from '@/hooks';
import { Text, Title1 } from '@fluentui/react-components';
import styles from './index.module.css';

const Home = () => {
  const { t } = useI18n('home');

  return (
    <div className={styles['home']}>
      <div className={styles['hero']}>
        <Title1 as='h2' className={styles['hero-title']}>
          {t('welcome')}
        </Title1>
        <Text size={400} className={styles['hero-description']}>
          {t('description')}
        </Text>
      </div>
    </div>
  );
};

export default Home;
