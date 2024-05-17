/** @type {import('next').NextConfig} */

let output = "export";
let trailingSlash = true;
if (process.env.NODE_ENV === "test") {
  // Static export doesn't work with current e2e script.
  console.log('>>>> NODE_ENV set to "test". Using standalone output.');
  output = "standalone";
  trailingSlash = false;
}

const nextConfig = {
  output,
  trailingSlash,
  distDir: "out",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
