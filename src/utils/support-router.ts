export const supportBrowserRouter = async (): Promise<boolean> => {
  // 检测当前网站是否支持browser router
  const notFound = await fetch('/not-found');
  if (notFound.status !== 200) {
    return false;
  }
  return true;
};
