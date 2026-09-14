import Provider from '@/components/Provider';
import { AUTH_COOKIES } from '@/constants/common/constants';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import StyledComponentRegistry from '@/lib/registry';
import QueryClientProvider from '@/services/QueryClientProvider';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import Script from 'next/script';

export const metadata = {
  title: '부산소프트웨어마이스터고 입학전형 | 마루',
  description: '부산소프트웨어마이스터고등학교 입학전형 시스템 마루입니다.',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const cookieStore = cookies();
  const initialLoggedIn = AUTH_COOKIES.some((name) => cookieStore.has(name));

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/images/school_background.webp"
          as="image"
          fetchPriority="high"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
        </noscript>
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Script id="pretendard-stylesheet" strategy="afterInteractive">
          {`
            (() => {
              const id = 'pretendard-font-stylesheet';
              if (document.getElementById(id)) return;
              const link = document.createElement('link');
              link.id = id;
              link.rel = 'stylesheet';
              link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';
              document.head.appendChild(link);
            })();
          `}
        </Script>
        <StyledComponentRegistry>
          <main>
            <QueryClientProvider>
              <Provider initialLoggedIn={initialLoggedIn}>{children}</Provider>
            </QueryClientProvider>
          </main>
        </StyledComponentRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
