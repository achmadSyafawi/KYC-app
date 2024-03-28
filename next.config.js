/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/kyc-app",
  // output: "export", //enable export
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://api.vision.glair.ai/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
