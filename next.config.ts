import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://ik.imagekit.io/8fifwnm7r/**")],
  },
};

export default nextConfig;
