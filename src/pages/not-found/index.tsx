import { useI18n } from '@/hooks';

const NotFound = () => {
  const { t } = useI18n('common');
  return <div>{t('notFound')}</div>;
};

export default NotFound;
