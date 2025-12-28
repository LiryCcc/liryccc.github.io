import { BrowserRouter, useRoutes } from 'react-router';
import LiryProvider from './components/liry-provider';
import { routes } from './routes';

const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  return (
    <LiryProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </LiryProvider>
  );
};

export default App;
