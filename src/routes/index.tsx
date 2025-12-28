import Layout from '@/pages/layout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const Home = lazy(() => import('@/pages/home'));
const Gomoku = lazy(() => import('@/pages/gomoku'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
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
        path: '*',
        Component: NotFound
      }
    ]
  }
];
