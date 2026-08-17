import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // OPEN QUESTION: image domains — update once hosting is decided
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(withPayload(nextConfig));
