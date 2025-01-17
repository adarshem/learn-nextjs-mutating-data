/** @type {import('next').NextConfig} */

//https://nextjs.org/docs/app/building-your-application/optimizing/images#remote-images
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
