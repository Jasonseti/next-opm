import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://services.f-ck.me/v1/image/**"),
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/onepunchman/images/**",
      },
    ],
  },
};

export default nextConfig;
