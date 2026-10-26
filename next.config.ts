import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity and Unsplash resize on their own CDNs; see lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
