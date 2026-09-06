import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Do NOT add @payloadcms/richtext-lexical to serverExternalPackages.
  // When marked external, Node loads it natively on the server but webpack
  // bundles it for the client — these two instances don't share React module
  // references, causing "Invalid hook call" on create/edit pages.
  // The css-noop-loader.mjs (NODE_OPTIONS=--import) already handles the
  // bundled.css ESM issue at the Node loader level without needing externals.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Vercel Blob storage — uploaded media served from here in production
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Payload CMS absolute URLs (old Vercel deployment)
      { protocol: 'https', hostname: 'gix-nexus-digitalplatform.vercel.app' },
      // Dokploy deployment
      { protocol: 'https', hostname: '185.170.198.250.nip.io' },
      // Any custom domain — add your domain here when you have one
      // { protocol: 'https', hostname: 'gixnexustelecom.com' },
      // Localhost — Payload media files in development
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default withNextIntl(withPayload(nextConfig));
