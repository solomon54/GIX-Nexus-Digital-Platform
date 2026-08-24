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
      // Payload CMS absolute URLs (generated via hardcoded serverURL)
      { protocol: 'https', hostname: 'gix-nexus-digitalplatform.vercel.app' },
    ],
  },
};

export default withNextIntl(withPayload(nextConfig));
