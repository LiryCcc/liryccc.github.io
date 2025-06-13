import { OnlyChildrenFC } from '@/typings/components';
import { createMeta } from '@/utils/metadata';

const metadata = createMeta({
  title: 'Liry Main Site',
  description: "Liry's main site"
});

const Home: OnlyChildrenFC = ({ children }) => {
  return <></>;
};

export default Home;
export { metadata };
