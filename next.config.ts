
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const repo = "wedding"; // 👈 назва твого GitHub репозиторію

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;