import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import QueryClientProvider from '@/components/layout/QueryClientProvider';
import ToastContainer from '@/components/layout/ToastContainer';
import UserProvider from '@/context/user';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Layout } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'CoCursor',
    template: 'CoCursor | %s',
  },
  description: 'Figma의 커서를 당신의 웹페이지 위로 옮겨보세요.',
  metadataBase: new URL('https://cocursor.vercel.app'),
  alternates: {
    canonical: 'https://cocursor.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'lCueZr4AwkB0nk57FvIe7cBJa0NG7ur2l95G-ePMFW4',
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="ko"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
      <body>
        <QueryClientProvider>
          <UserProvider>
            <Layout
              navbar={<Navbar />}
              pageMap={await getPageMap()}
              docsRepositoryBase="https://github.com/alexgoni/cocursor-service/tree/main"
              footer={<Footer />}
              darkMode={false}
              nextThemes={{ defaultTheme: 'dark' }}
            >
              <div className="min-h-[calc(100dvh-64px)]">{children}</div>
            </Layout>
            <ToastContainer />
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
