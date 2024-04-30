/** @type {import('next').NextConfig} */
const nextConfig = {
  // Settings from digitalocean nextjs sample https://github.com/digitalocean/sample-nextjs/
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
