import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "tes.cloudinary.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
