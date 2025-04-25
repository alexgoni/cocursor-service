import Navbar from '@/components/layout/Navbar';
import QueryClientProvider from '@/components/layout/QueryClientProvider';
import ToastContainer from '@/components/layout/ToastContainer';
import UserProvider from '@/context/user';
import '@/styles/globals.css';
import { Layout } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { ReactNode } from 'react';

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
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
              docsRepositoryBase="https://github.com/alexgoni/cocursor"
              footer={<></>}
              darkMode={false}
              nextThemes={{ defaultTheme: 'dark' }}
            >
              {children}
            </Layout>
            <ToastContainer />
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
