import type { NextConfig } from 'next';

const defineConfig = (config: NextConfig) => {
  return config;
};

const config = defineConfig({
  output: 'export',
  transpilePackages: [],
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  },
  productionBrowserSourceMaps: true
});

const nextConfig = config;

export default nextConfig;
