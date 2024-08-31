/** @type {import('next').NextConfig} */

//AWS S3 Image CDN Config
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnqrmenu.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
