import '@/app/globals.css';
import '@/styles/liry-custom.scss';
import type { OnlyChildrenFC } from '@/typings/components';

const RootLayout: OnlyChildrenFC = ({ children }) => {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}></meta>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
