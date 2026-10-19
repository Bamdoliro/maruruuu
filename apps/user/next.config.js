const backendBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getBackendUrl = () => {
  if (!backendBaseUrl) return null;

  try {
    return new URL(backendBaseUrl);
  } catch {
    return null;
  }
};

const backendUrl = getBackendUrl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  transpilePackages: [
    '@maru/design-system',
    '@maru/hooks',
    '@maru/icon',
    '@maru/ui',
    '@maru/utils',
  ],
  poweredByHeader: false,
  images: {
    unoptimized: false,
    remotePatterns: backendUrl
      ? [
          {
            protocol: backendUrl.protocol.replace(':', ''),
            hostname: backendUrl.hostname,
            port: backendUrl.port || undefined,
          },
        ]
      : [],
  },
  reactStrictMode: true,
  async rewrites() {
    if (!backendBaseUrl) return [];

    return [
      {
        source: '/api/:path*',
        destination: `${backendBaseUrl}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/(.*)?',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
