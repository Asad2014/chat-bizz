// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // TurboPack disable karne ke liye
    },
  },
};

export default nextConfig;
