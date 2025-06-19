import '@/app/globals.css';
import LiryProvider from '@/components/providers';
import type { OnlyChildrenFC } from '@/typings/components';
import cn from 'classnames';
import styles from './layout.module.scss';

const RootLayout: OnlyChildrenFC = ({ children }) => {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}></meta>
      </head>
      <body>
        <LiryProvider>
          <header className={cn(styles.header)}></header>
        </LiryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
