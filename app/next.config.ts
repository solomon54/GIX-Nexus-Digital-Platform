import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  serverExternalPackages: ['@payloadcms/richtext-lexical'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  webpack: (config) => {
    // Silence Sass @import deprecation warnings from @payloadcms/ui@3.33.0.
    const sassRule = config.module.rules.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => Array.isArray(rule?.oneOf)
    )
    if (sassRule?.oneOf) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const rule of sassRule.oneOf as any[]) {
        if (!Array.isArray(rule?.use)) continue
        const sassLoader = rule.use.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (u: any) => typeof u?.loader === 'string' && u.loader.includes('sass-loader')
        )
        if (sassLoader) {
          sassLoader.options = {
            ...sassLoader.options,
            sassOptions: {
              ...(sassLoader.options?.sassOptions ?? {}),
              silenceDeprecations: ['import'],
            },
          }
        }
      }
    }
    return config
  },
};

export default withNextIntl(withPayload(nextConfig));
