/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/kyc-app",
  // output: "export", //enable export
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
