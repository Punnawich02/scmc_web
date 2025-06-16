// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // ใช้ได้ทั้งแบบ domains ⬇
    // domains: ['www.cmu.ac.th'],

    // หรือแบบละเอียด remotePatterns ⬇
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cmu.ac.th',
        port: '',          // เว้นว่างถ้าไม่มี port
        pathname: '/**',   // อนุญาตทุก path
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
