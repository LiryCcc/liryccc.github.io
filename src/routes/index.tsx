import Layout from '@/pages/layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const Home = lazy(() => import('@/pages/home'));
const Gomoku = lazy(() => import('@/pages/gomoku'));
const NotFound = lazy(() => import('@/pages/not-found'));
const Dev = lazy(() => import('@/pages/dev'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'gomoku',
        Component: Gomoku
      },
      {
        path: 'dev',
        Component: import.meta.env.DEV ? Dev : NotFound
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]);
