/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      // Firebase Storage
      {
        protocol: "https",
        hostname: "*.firebaseapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.googleapis.com",
        pathname: "/**",
      },
      // Optional: Google profile photos
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // Optional: Supabase bucket (example)
      {
        protocol: "https",
        hostname: "aujlnnzdadcbyiwqnogk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: true, // avoids blocking builds on lint errors
  },
};

export default nextConfig;
