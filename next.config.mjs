import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "callawyamedia.blob.core.windows.net", pathname: "/media/**" },
      { protocol: "https", hostname: "calawya.sfo3.digitaloceanspaces.com", pathname: "/**" },
    ],
  },
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    return [{ source: "/for-lawyers", destination: "/how-it-works#lawyer-faqs", permanent: true }];
  },
};

export default nextConfig;
