import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "staticfile.batdongsan.com.vn" },
      { protocol: "https", hostname: "139-59-232-15.sslip.io" },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
