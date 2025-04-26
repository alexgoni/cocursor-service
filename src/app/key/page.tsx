'use client';

import GetKeyForm from '@/components/key/GetKeyForm';
import KeyList from '@/components/key/KeyList';
import { useUserContext } from '@/context/user';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KeyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, authReady } = useUserContext();

  useEffect(() => {
    if (authReady && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [authReady, user, pathname, router]);

  if (!authReady || !user) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-8 sm:px-8 md:p-16 xl:px-30 2xl:px-60">
      <GetKeyForm />
      <div className="my-12 border-t border-gray-700" />
      <KeyList />
    </div>
  );
}
