import Gomoku from '@/components/gomoku';
import { createMeta } from '@/utils/metadata';

const metadata = createMeta({
  title: 'Liry Main Site',
  description: "Liry's main site"
});

const Home = () => {
  return <Gomoku />;
};

export default Home;
export { metadata };
