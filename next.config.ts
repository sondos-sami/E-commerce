import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",

      },
    ],
  },
  typescript:{
    ignoreBuildErrors:true,
  }

};

export default nextConfig;
