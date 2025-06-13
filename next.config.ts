import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const defineConfig = (config: NextConfig) => {
  return config;
};

const config = defineConfig({
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  images: {},
  output: 'export',
  transpilePackages: [],
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  },
  productionBrowserSourceMaps: true
});

const nextConfig = createMDX({})(config);

export default nextConfig;
