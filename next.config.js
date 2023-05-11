/** @type {import('next').NextConfig} */
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const nextConfig = {
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
