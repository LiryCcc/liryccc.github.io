import { useI18n } from '@/hooks';
import { Button, Text, Title1 } from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router';
import styles from './index.module.css';

const NotFound = () => {
  const { t } = useI18n('common');
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles['not-found']}>
      <Title1 as='h1' className={styles['title']}>
        {t('notFoundTitle')}
      </Title1>
      <Text size={400} className={styles['message']}>
        {t('notFoundMessage')}
      </Text>
      <div className={styles['path-info']}>
        <Text size={300}>
          {t('notFoundPath')} <code className={styles['path']}>{location.pathname}</code>
        </Text>
      </div>
      <Button appearance='primary' onClick={handleGoHome} className={styles['go-home-button']}>
        {t('goHome')}
      </Button>
    </div>
  );
};

export default NotFound;
