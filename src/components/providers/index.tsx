import { OnlyChildrenFC } from '@/typings/components';
import { StrictMode } from 'react';

const LiryProvider: OnlyChildrenFC = (props) => {
  return <StrictMode>{props.children}</StrictMode>;
};

export default LiryProvider;
