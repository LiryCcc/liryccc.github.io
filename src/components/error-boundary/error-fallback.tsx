import { useI18n } from '@/hooks';
import { Button, Text, Title1 } from '@fluentui/react-components';
import styles from './index.module.css';

type ErrorFallbackProps = {
  error: Error | null;
  onReset: () => void;
};

export const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
  const { t } = useI18n('common');

  return (
    <div className={styles['error-boundary']}>
      <Title1 as='h1' className={styles['title']}>
        {t('errorTitle')}
      </Title1>
      <Text size={400} className={styles['message']}>
        {t('errorMessage')}
      </Text>
      {error && (
        <details className={styles['error-details']}>
          <summary className={styles['error-summary']}>{t('errorDetails')}</summary>
          <pre className={styles['error-stack']}>{error.message}</pre>
        </details>
      )}
      <Button appearance='primary' onClick={onReset} className={styles['reset-button']}>
        {t('errorReset')}
      </Button>
    </div>
  );
};
