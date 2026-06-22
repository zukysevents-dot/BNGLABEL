import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    // Spotify CDN — povoleno pro budoucí reálná data z API.
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: 'patrik-o6',
  project: 'zakazka',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
});
