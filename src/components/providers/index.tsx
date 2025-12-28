import type { OnlyChildrenFC } from '@/typings/components';
import { StrictMode } from 'react';
import { I18nProvider } from '@/i18n';

const LiryProvider: OnlyChildrenFC = (props) => {
  return (
    <StrictMode>
      <I18nProvider>{props.children}</I18nProvider>
    </StrictMode>
  );
};

export default LiryProvider;
