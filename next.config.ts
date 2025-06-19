import { defineCustom } from '@liry-ccc/common-config';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const defineConfig = defineCustom<NextConfig>;

const config = defineConfig({
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  images: {},
  output: 'export',
  transpilePackages: [],
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  },
  compiler: {},
  productionBrowserSourceMaps: true
});

const nextConfig = createMDX({})(config);

export default nextConfig;
