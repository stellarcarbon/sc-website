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
  // reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
