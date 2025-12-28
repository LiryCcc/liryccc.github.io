import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const Layout = lazy(() => import('@/pages/layout'));
const Home = lazy(() => import('@/pages/home'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
];
