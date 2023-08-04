/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compiler: {
    styledComponents:
      true |
      {
        displayName: true,
        ssr: true,
      },
  },
};

module.exports = nextConfig;
