import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Required: prevents SSR issues with Payload's Monaco/CodeMirror editor
  serverExternalPackages: [
    '@payloadcms/richtext-lexical',
    '@faceless-ui/modal',
  ],
  // OPEN QUESTION: image domains — update once hosting is decided
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(withPayload(nextConfig));
