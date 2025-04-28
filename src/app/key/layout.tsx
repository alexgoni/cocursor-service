import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'API Key',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
