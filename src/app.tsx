import { ErrorBoundary } from './components/error-boundary';
import LiryProvider from './components/liry-provider';
import LiryRouter from './routes/provider';

const App = () => {
  return (
    <ErrorBoundary>
      <LiryProvider>
        <LiryRouter />
      </LiryProvider>
    </ErrorBoundary>
  );
};

export default App;
