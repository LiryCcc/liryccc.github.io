import '@/app/globals.css';
import LiryProvider from '@/components/providers';
import type { OnlyChildrenFC } from '@/typings/components';
import cn from 'classnames';
import s from './layout.module.scss';

const RootLayout: OnlyChildrenFC = ({ children }) => {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}></meta>
      </head>
      <body>
        <LiryProvider>
          <header className={cn(s.header)}>
            {Array.from(Array(100).keys()).map((item) => {
              return <div key={item}>{item}</div>;
            })}
          </header>
        </LiryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
