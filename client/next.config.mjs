/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kansai-resilience-forum.jp",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.nightcafe.studio",
        port: "",
        pathname: "//assets/profile.png"
      },
      {
        protocol: "https",
        hostname: "cdn.linkupevents.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.linkupevents.com",
        port: "",
        pathname: "/society/**",
      },
    ],
  },
};

export default nextConfig;
