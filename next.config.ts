import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ik.imagekit.io/8fifwnm7r/**")],
  },
};

export default nextConfig;
