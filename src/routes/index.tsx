import Layout from '@/pages/layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const Home = lazy(() => import('@/pages/home'));
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
        path: 'dev',
        Component: Dev
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]);
