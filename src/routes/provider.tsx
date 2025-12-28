import { useI18n } from '@/hooks';
import { supportBrowserRouter } from '@/utils/support-router';
import { useActionState, useEffect, useMemo, type FC } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router';
import { routes } from '.';

const LiryRouter: FC = () => {
  const { t } = useI18n('common');
  const [support, checkSupport, isPending] = useActionState(supportBrowserRouter, false);
  useEffect(() => {
    checkSupport();
  }, [checkSupport]);
  // const support = use(supportBrowserRouter());
  const router = useMemo(() => {
    if (support) {
      return createBrowserRouter(routes);
    }
    return createHashRouter(routes);
  }, [support]);

  if (isPending) {
    return <div>{t('loading')}</div>;
  }
  return <RouterProvider router={router} />;
};

export default LiryRouter;
