import '@/app/globals.css';
import LiryProvider from '@/components/providers';
import '@/styles/liry-custom.scss';
import type { OnlyChildrenFC } from '@/typings/components';
import classNames from 'classnames';

const RootLayout: OnlyChildrenFC = ({ children }) => {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}></meta>
      </head>
      <body>
        <LiryProvider>
          {' '}
          <div
            id={'root'}
            className={classNames('fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'w-full', 'flex', 'flex-col')}
          >
            <header className={classNames('h-10', 'bg-gray-900', 'w-full', 'flex-shrink-0')}></header>
            <main className={classNames('flex-1', 'bg-blue-900/75', 'overflow-y-auto', 'liry-hide-scrollbar')}>
              <div className={classNames('container', 'mx-auto p-4', 'text-white')}>
                <div className={classNames('mt-4', 'h-[4800px]', 'bg-blue-900/85', 'liry-hover', 'rounded-4xl')}>
                  {children}
                </div>
              </div>
              <footer className={classNames('bg-gray-700', 'w-full', 'text-white', 'p-4', 'flex-shrink-0')}></footer>
            </main>
          </div>
        </LiryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
