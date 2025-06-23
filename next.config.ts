// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'miro.medium.com',
      'public.tableau.com',
      'encrypted-tbn0.gstatic.com',
      'www.cmu.ac.th'
    ]
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
