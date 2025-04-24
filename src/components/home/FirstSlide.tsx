import { motion } from 'framer-motion';
import Link from 'next/link';

import ResponsiveRenderer from '../shared/ResponsiveRenderer';

export default function FirstSlide() {
  return (
    <ResponsiveRenderer mobile={<MobileComponent />} pc={<PCComponent />} />
  );
}

function MobileComponent() {
  return (
    <div className="flex h-full items-center justify-between p-6 py-40">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl leading-tight font-semibold lg:text-6xl">
          <span className="bg-gradient-to-r from-[#FF7667] to-[#FFB199] bg-clip-text text-transparent">
            Figma의 커서를
          </span>
          <br />
          당신의 웹사이트로 옮겨보세요
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          웹에서 실시간 커서 협업을 경험하세요
        </p>
        <Link
          href="/login"
          className="mt-16 inline-block rounded-lg bg-[#FFB199] px-6 py-3 text-black transition hover:brightness-110"
        >
          로그인
        </Link>
      </motion.div>
    </div>
  );
}

function PCComponent() {
  return (
    <div className="flex h-full items-center justify-between pr-28 pl-6 xl:p-40 2xl:p-60">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl leading-tight font-semibold lg:text-6xl">
          <span className="bg-gradient-to-r from-[#FF7667] to-[#FFB199] bg-clip-text text-transparent">
            Figma의 커서를
          </span>
          <br />
          당신의 웹사이트로 옮겨보세요
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          웹에서 실시간 커서 협업을 경험하세요
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-[#FFB199] px-6 py-3 text-black transition hover:brightness-110"
        >
          로그인
        </Link>
      </motion.div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="pointer-events-none absolute top-0 left-[-32%] z-0 h-20 w-20 -translate-y-1/2 rounded-full bg-[#FF7667]/50 blur-xl transition-all" />
        <Arrow />
        <div className="absolute top-[50%] left-[calc(100%+4px)] rounded-lg bg-[#FF7667] px-2 py-1 text-lg text-white">
          CoCursor
        </div>
      </motion.div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      style={{ width: '100px', height: '100px' }}
      viewBox="0 0 96 104"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.86065 0.697766L95.7812 51.5907L50.3553 59.6832L34.4976 103.014L0.86065 0.697766Z"
        fill="#FF7667"
      />
    </svg>
  );
}
