/** @type {import('next').NextConfig} */

let basePath = "";
if (process.env.DEPLOYMENT_SERVICE === "digitalocean") {
  basePath = "/sc-website";
}

const nextConfig = {
  output: "export",
  basePath,
};

module.exports = nextConfig;
