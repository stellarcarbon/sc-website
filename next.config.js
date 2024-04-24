/** @type {import('next').NextConfig} */

let basePath = "";
if (process.env.NODE_ENV === "production") {
  basePath = "/sc-website";
}

const nextConfig = {
  output: "export",
  basePath,
};

module.exports = nextConfig;
