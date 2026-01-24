import { Loading } from '@/components/loading';
import { supportBrowserRouter } from '@/utils/support-router';
import { useEffect, useMemo, useState, type FC } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router';
import { routes } from '.';

const LiryRouter: FC = () => {
  const [support, setSupport] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkSupport = async () => {
      const result = await supportBrowserRouter();
      if (!cancelled) {
        setSupport(result);
      }
    };

    checkSupport();

    return () => {
      cancelled = true;
    };
  }, []);

  const router = useMemo(() => {
    if (support === null) {
      return null;
    }
    if (support) {
      return createBrowserRouter(routes);
    }
    return createHashRouter(routes);
  }, [support]);

  if (support === null || router === null) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
};

export default LiryRouter;
