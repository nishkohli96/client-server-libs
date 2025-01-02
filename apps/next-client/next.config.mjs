import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com'
      }
    ]
  },
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `$var: red;`,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withNextIntl(withMDX(nextConfig));
