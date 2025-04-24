'use client';

import Link from 'next/link';
import { Navbar } from 'nextra-theme-docs';

export default function CustomNavbar() {
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
      <Link
        href="/login"
        className="rounded-lg bg-[#FF7667] px-3 py-1 text-gray-100"
      >
        로그인
      </Link>
    </Navbar>
  );
}
