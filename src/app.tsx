import LiryProvider from './components/liry-provider';
import LiryRouter from './routes/provider';

const App = () => {
  return (
    <LiryProvider>
      <LiryRouter />
    </LiryProvider>
  );
};

export default App;
