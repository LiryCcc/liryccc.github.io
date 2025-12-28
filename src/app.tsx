import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router';
import LiryProvider from './components/liry-provider';
import { useI18n } from './hooks';
import { routes } from './routes';

const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

const LoadingFallback = () => {
  const { t } = useI18n('common');
  return <div>{t('loading')}</div>;
};

const App = () => {
  return (
    <LiryProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes />
        </Suspense>
      </BrowserRouter>
    </LiryProvider>
  );
};

export default App;
