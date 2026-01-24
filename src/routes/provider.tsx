import { type FC } from 'react';
import { RouterProvider } from 'react-router';
import { router } from '.';

const LiryRouter: FC = () => {
  return <RouterProvider router={router} />;
};

export default LiryRouter;
