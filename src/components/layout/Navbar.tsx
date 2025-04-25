'use client';

import { logout } from '@/api/auth';
import { useUserContext } from '@/context/user';
import { ClickAwayListener, Popper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from 'nextra-theme-docs';
import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';

import Profile from '../shared/Profile';

export default function CustomNavbar() {
  const pathname = usePathname();
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('다음에 다시 만나요!');
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Navbar
      logo={
        <div className="flex items-center gap-1">
          <svg
            style={{ width: '16px', height: '16px' }}
            viewBox="0 0 96 104"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.86065 0.697766L95.7812 51.5907L50.3553 59.6832L34.4976 103.014L0.86065 0.697766Z"
              fill="#FF7667"
            />
          </svg>
          <b>CoCursor</b>
        </div>
      }
    >
      {!!user ? (
        <>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <button type="button" onClick={handleClick}>
              <Profile name={user.displayName ?? ''} />
            </button>
          </ClickAwayListener>
          <Popper
            open={!!anchorEl}
            anchorEl={anchorEl}
            placement="bottom-end"
            className="z-40"
          >
            <div className="mt-2 w-36 rounded-lg border border-neutral-700 bg-neutral-900 p-2 shadow-lg">
              <button
                onClick={() => router.push('/my-page')}
                className="w-full rounded-md px-4 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-neutral-800"
              >
                마이페이지
              </button>
              <button
                onClick={() => mutation.mutate()}
                className="w-full rounded-md px-4 py-2 text-left text-sm text-red-400 transition-colors hover:bg-neutral-800"
              >
                로그아웃
              </button>
            </div>
          </Popper>
        </>
      ) : (
        <Link
          href={`/login?redirect=${pathname}`}
          className="rounded-lg bg-[#FF7667] px-3 py-1 text-gray-100"
        >
          로그인
        </Link>
      )}
    </Navbar>
  );
}
