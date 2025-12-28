import { I18nProvider } from '@/i18n';
import type { OnlyChildrenFC } from '@/typings/components';
import { StrictMode } from 'react';

const LiryProvider: OnlyChildrenFC = (props) => {
  return (
    <StrictMode>
      <I18nProvider>{props.children}</I18nProvider>
    </StrictMode>
  );
};

export default LiryProvider;
