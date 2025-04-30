import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useCoCursor } from 'cocursor';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShikiHighlighter from 'react-shiki';

export default function ThirdSlide() {
  const {
    showMyCursor,
    setShowMyCursor,
    allowMyCursorShare,
    setAllowMyCursorShare,
    disabled,
    setDisabled,
  } = useCoCursor();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersection = useIntersectionObserver(containerRef);
  const mainControls = useAnimation();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (isIntersection) {
      mainControls.start('visible');
    }
  }, [isIntersection, mainControls]);

  useEffect(() => {
    setCode(
      `function Component() {
  const { setShowMyCursor, setAllowMyCursorShare, setDisabled } = useCoCursor();
  
  return (
    <>
      <button type="button" onClick={() => setShowMyCursor((prev) => !prev)}>
        내 커서 ${showMyCursor ? '숨기기' : '보이기'}
      </button>
      <button type="button" onClick={() => setAllowMyCursorShare((prev) => !prev)}>
        내 정보 공유 ${allowMyCursorShare ? '끄기' : '켜기'}
      </button>
      <button type="button" onClick={() => setDisabled((prev) => !prev)}>
        CoCursor ${disabled ? '활성화' : '비활성화'}
      </button>
    </>
  );
}`,
    );
  }, [showMyCursor, allowMyCursorShare, disabled]);

  return (
    <div
      ref={containerRef}
      className="flex h-full items-center justify-center overflow-hidden px-6 md:px-20 lg:px-40"
    >
      <div>
        <motion.h1
          className="text-center text-4xl font-semibold"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          transition={{ duration: 0.6 }}
        >
          CoCursor의{' '}
          <span className="bg-gradient-to-r from-[#FF7667] to-[#FFB199] bg-clip-text text-transparent">
            모든 기능을 쉽게 컨트롤해보세요
          </span>
        </motion.h1>
        <motion.p
          className="mt-2 text-center text-lg text-gray-300"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          DX를 고려해 설계했습니다
        </motion.p>
        <ShikiHighlighter
          language="tsx"
          theme="kanagawa-wave"
          showLanguage={false}
          className="mt-8 hidden w-full overflow-hidden rounded-2xl border-4 border-[#FF7667] text-xs shadow-lg shadow-[#FF766770] sm:block md:mt-8 md:text-sm lg:text-base"
        >
          {code}
        </ShikiHighlighter>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:mt-10 sm:flex-row sm:gap-8">
          <button
            type="button"
            onClick={() => setShowMyCursor((prev) => !prev)}
            className={`flex w-[166px] cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] sm:w-auto ${
              showMyCursor
                ? 'border-blue-400 bg-blue-500 text-gray-200 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]'
                : 'border-red-400 bg-red-500 text-gray-200 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
            }`}
          >
            {showMyCursor ? '내 커서 숨기기' : '내 커서 보이기'}
          </button>
          <button
            type="button"
            onClick={() => setAllowMyCursorShare((prev) => !prev)}
            className={`flex w-[166px] cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] sm:w-auto ${
              allowMyCursorShare
                ? 'border-teal-400 bg-teal-500 text-gray-200 [box-shadow:0_8px_0_0_#009689,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]'
                : 'border-red-400 bg-red-500 text-gray-200 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
            }`}
          >
            {allowMyCursorShare ? '내 정보 공유 끄기' : '내 정보 공유 켜기'}
          </button>
          <button
            type="button"
            onClick={() => setDisabled((prev) => !prev)}
            className={`flex w-[166px] min-w-[166px] cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] sm:w-auto ${
              !disabled
                ? 'border-cyan-400 bg-cyan-500 text-gray-200 [box-shadow:0_8px_0_0_#0092B8,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]'
                : 'border-red-400 bg-red-500 text-gray-200 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
            }`}
          >
            {disabled ? 'CoCursor 활성화' : 'CoCursor 비활성화'}
          </button>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block text-center text-sm text-gray-300 underline"
        >
          새 창을 열어 확인해보세요!
        </Link>
      </div>
    </div>
  );
}
