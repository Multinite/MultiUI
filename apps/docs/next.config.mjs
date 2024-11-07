/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
        port: "",
      },
    ],
  },
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
