import type { NextConfig } from 'next';
import withRspack from 'next-rspack';

const config: NextConfig = {
  output: 'export',
  transpilePackages: [],
  reactStrictMode: true,
  productionBrowserSourceMaps: true
};

const nextConfig = withRspack(config);

export default nextConfig;
