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
    // Silence Sass legacy JS API deprecation warnings from @payloadcms/ui@3.33.0.
    // Next.js uses its own bundled sass-loader at compiled/sass-loader/cjs.js.
    // We walk every rule that has a use array and patch any loader whose path
    // contains "sass-loader" (handles both external and Next's internal copy).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function patchSassLoaders(rules: any[]) {
      for (const rule of rules) {
        if (Array.isArray(rule?.oneOf)) {
          patchSassLoaders(rule.oneOf)
          continue
        }
        if (!Array.isArray(rule?.use)) continue
        for (const use of rule.use) {
          if (typeof use?.loader === 'string' && use.loader.includes('sass-loader')) {
            use.options = {
              ...(use.options ?? {}),
              sassOptions: {
                ...(use.options?.sassOptions ?? {}),
                silenceDeprecations: ['legacy-js-api', 'import'],
                quietDeps: true,
              },
            }
          }
        }
      }
    }
    patchSassLoaders(config.module.rules)
    return config
  },
};

export default withNextIntl(withPayload(nextConfig));
