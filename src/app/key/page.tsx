'use client';

import { useUserContext } from '@/context/user';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KeyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, []);

  if (!user) return null;

  return <></>;
}
