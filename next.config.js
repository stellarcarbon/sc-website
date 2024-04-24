/** @type {import('next').NextConfig} */

const basePath = process.env.NODE_ENV === 'development' ? '' : '/sc-website'

const nextConfig = {
  output: 'export',
  basePath,
};

module.exports = nextConfig;
