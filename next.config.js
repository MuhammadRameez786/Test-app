/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["day-galpu-club.infura-ipfs.io", "infura-ipfs.io", "daygalpu.infura-ipfs.io", "res.cloudinary.com", "i.seadn.io"],
  },
};

module.exports = nextConfig;
