import { useI18n } from '@/hooks';
import { Spinner, Text } from '@fluentui/react-components';
import styles from './index.module.css';

export const Loading = () => {
  const { t } = useI18n('common');

  return (
    <div className={styles['loading']}>
      <Spinner size='large' />
      <Text size={400} className={styles['text']}>
        {t('loading')}
      </Text>
    </div>
  );
};
