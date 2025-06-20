// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // ใช้ได้ทั้งแบบ domains ⬇
    domains: [
      'miro.medium.com',
      'public.tableau.com',
      'encrypted-tbn0.gstatic.com'
    ]
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
