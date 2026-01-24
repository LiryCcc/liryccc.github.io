/**
 * 检测当前环境是否支持 Browser Router
 * 对于静态托管（如 GitHub Pages），通常不支持 Browser Router，需要使用 Hash Router
 * 对于有服务器配置的环境（如开发环境或支持 SPA 的服务器），可以使用 Browser Router
 */
export const supportBrowserRouter = async (): Promise<boolean> => {
  // 开发环境通常支持 Browser Router
  if (import.meta.env.DEV) {
    return true;
  }

  // 生产环境：尝试检测是否有服务器配置支持
  // 通过检查 index.html 是否存在来判断（静态站点通常能访问到）
  // 如果访问不存在的路径返回 404，说明不支持 Browser Router
  try {
    const response = await fetch('/not-found-test-path-that-should-not-exist', {
      method: 'HEAD',
      cache: 'no-cache'
    });
    // 如果返回 404，说明有服务器处理，可能支持 Browser Router
    // 如果返回 200 或其他，可能是静态托管，不支持 Browser Router
    return response.status === 404;
  } catch {
    // 网络错误或其他异常，保守起见返回 false
    return false;
  }
};
