import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // @payloadcms/richtext-lexical imports bundled.css at the ESM level.
  // Node's ESM loader can't handle .css — css-noop-loader.mjs intercepts it.
  serverExternalPackages: ['@payloadcms/richtext-lexical'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default withNextIntl(withPayload(nextConfig));
