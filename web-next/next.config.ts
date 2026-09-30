import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = {
  // Published Sanity content is authoritative, including on hosts with old preview variables.
  env: { CONTENT_MODE: 'sanity' },
  turbopack: { root: path.resolve(process.cwd(), '..') },
  outputFileTracingRoot: path.resolve(process.cwd(), '..'),
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
