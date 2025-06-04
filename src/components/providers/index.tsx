import { OnlyChildrenFC } from '@/typings/components';

const LiryProvider: OnlyChildrenFC = (props) => {
  return <>{props.children}</>;
};

export default LiryProvider;
