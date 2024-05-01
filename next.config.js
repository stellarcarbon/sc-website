/** @type {import('next').NextConfig} */

let output = "export";
if (process.env.NODE_ENV === "test") {
  // Static export doesn't work with current e2e script.
  console.log('>>>> NODE_ENV set to "test". Using standalone output.');
  output = "standalone";
}

const nextConfig = {
  output,
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
