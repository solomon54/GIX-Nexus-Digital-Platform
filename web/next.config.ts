import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Increase upstream image timeout — local media can be slow on cold start
  experimental: {
    // 30 seconds for image optimization — prevents 504 on local media files
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Vercel Blob storage — uploaded media served from here in production
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Payload CMS absolute URLs (old Vercel deployment)
      { protocol: 'https', hostname: 'gix-nexus-digitalplatform.vercel.app' },
      // Dokploy deployments — old IP-based domain kept for existing DB URLs
      { protocol: 'https', hostname: '185.170.198.250.nip.io' },
      // Production domain
      { protocol: 'https', hostname: 'gixnexus.net.et' },
      { protocol: 'https', hostname: 'www.gixnexus.net.et' },
      // Localhost — Payload media files in development
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default withNextIntl(withPayload(nextConfig));
