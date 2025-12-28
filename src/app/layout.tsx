import '@/app/globals.css';
import logo from '@/assets/logo.jpg';
import LiryProvider from '@/components/providers';
import { LIRY_SITES } from '@/configs';
import type { OnlyChildrenFC } from '@/typings/components';
import cn from 'classnames';
import Link from 'next/link';
import s from './layout.module.scss';

const RootLayout: OnlyChildrenFC = () => {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}></meta>
      </head>
      <body>
        <LiryProvider>
          <header className={cn(s['header'])}>
            <img className={cn(s['logo'])} src={logo.src} alt={'logo'} />
            {LIRY_SITES.map((site) => {
              return (
                <Link key={site.key} href={site.url}>
                  {site.comment || site.key}
                </Link>
              );
            })}
          </header>
          {/* <main>{children}</main> */}
        </LiryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
