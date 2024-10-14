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
};

export default nextConfig;
