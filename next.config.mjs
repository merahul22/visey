/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-custom-header",
            value: "custom value",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "protoforge.in",
      },
      {
        protocol: "https",
        hostname: "archive.org",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "api.outrank.so",
      },
      {
        // NOTE: Using ImageKit is temporary as it was urgent to implement this image hosting solution.
        // TODO: Remove in the future and use better CDN options.
        protocol: "https",
        hostname: "media-hosting.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "imagekit.io",
      },
    ],
  },
};

export default nextConfig;
