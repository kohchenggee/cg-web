/** @type {import('next').NextConfig} */

const { ON_GITHUB_PAGES } = process.env;

const assetPrefix = ON_GITHUB_PAGES ? "/cg-web/" : "";
const basePath = ON_GITHUB_PAGES ? "/cg-web" : "";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix,
  basePath,
};

module.exports = nextConfig;
