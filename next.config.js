/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/kyc-app",
  // output: "export", //enable export
  output: "standalone",
  distDir: "dir",
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
