/** @type {import('next').NextConfig} */
const nextConfig = {
  // Settings from digitalocean nextjs sample https://github.com/digitalocean/sample-nextjs/
  output: "export",
  distDir: "_static",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
