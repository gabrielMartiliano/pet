/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
     
      {
        source: '/api/:path*',
        destination: `http://localhost:3000/auth/:path*`, // Encaminha chamadas /api para o NestJS
      },
    ];
  },
};

export default nextConfig;