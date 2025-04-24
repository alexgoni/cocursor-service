import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useMediaQuery, { PC_WIDTH } from '@/hooks/useMediaQuery';
import { useCoCursor } from 'cocursor';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ShikiHighlighter from 'react-shiki';

export default function ThirdSlide() {
  const isPC = useMediaQuery(PC_WIDTH);

  return <>{isPC ? <PCComponent /> : <TabletComponent />}</>;
}

function MobileComponent() {
  return (
    <div className="flex h-full items-center justify-between p-6">
      모바일입니당
    </div>
  );
}

function TabletComponent() {
  const {
    showMyCursor,
    setShowMyCursor,
    allowInfoSend,
    setAllowInfoSend,
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
  const { setShowMyCursor, setAllowInfoSend, setDisabled } = useCoCursor();
  
  return (
    <>
      <button type="button" onClick={() => setShowMyCursor((prev) => !prev)}>
        내 커서 ${showMyCursor ? '숨기기' : '보이기'}
      </button>
      <button type="button" onClick={() => setAllowInfoSend((prev) => !prev)}>
        내 정보 공유 ${allowInfoSend ? '끄기' : '켜기'}
      </button>
      <button type="button" onClick={() => setDisabled((prev) => !prev)}>
        CoCursor ${disabled ? '활성화' : '비활성화'}
      </button>
    </>
  );
}`,
    );
  }, [showMyCursor, allowInfoSend, disabled]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden px-6 py-20 md:px-20 lg:px-40"
    >
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
        className="mt-8 hidden w-full overflow-hidden rounded-2xl border-4 border-[#FF7667] text-xs shadow-lg shadow-[#FF766770] sm:block md:mt-8 md:text-sm xl:w-[80%]"
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
          onClick={() => setAllowInfoSend((prev) => !prev)}
          className={`flex w-[166px] cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] sm:w-auto ${
            allowInfoSend
              ? 'border-teal-400 bg-teal-500 text-gray-200 [box-shadow:0_8px_0_0_#009689,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]'
              : 'border-red-400 bg-red-500 text-gray-200 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
          }`}
        >
          {allowInfoSend ? '내 정보 공유 끄기' : '내 정보 공유 켜기'}
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
    </div>
  );
}

function PCComponent() {
  const {
    showMyCursor,
    setShowMyCursor,
    allowInfoSend,
    setAllowInfoSend,
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
  const { setShowMyCursor, setAllowInfoSend, setDisabled } = useCoCursor();
  
  return (
    <>
      <button type="button" onClick={() => setShowMyCursor((prev) => !prev)}>
        내 커서 ${showMyCursor ? '숨기기' : '보이기'}
      </button>
      <button type="button" onClick={() => setAllowInfoSend((prev) => !prev)}>
        내 정보 공유 ${allowInfoSend ? '끄기' : '켜기'}
      </button>
      <button type="button" onClick={() => setDisabled((prev) => !prev)}>
        CoCursor ${disabled ? '활성화' : '비활성화'}
      </button>
    </>
  );
}`,
    );
  }, [showMyCursor, allowInfoSend, disabled]);

  return (
    <div
      ref={containerRef}
      className="flex h-full items-center justify-between overflow-hidden px-12 py-40 2xl:px-44"
    >
      <motion.div
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-semibold">
          CoCursor의{' '}
          <span className="bg-gradient-to-r from-[#FF7667] to-[#FFB199] bg-clip-text text-transparent">
            모든 기능을 쉽게 컨트롤
          </span>
          해보세요
        </h1>
        <p className="mt-2 text-lg text-gray-300">DX를 고려해 설계했습니다</p>
        <ShikiHighlighter
          language="tsx"
          theme="kanagawa-wave"
          showLanguage={false}
          className="mx-auto mt-12 overflow-hidden rounded-2xl border-4 border-[#FF7667] shadow-lg shadow-[#FF766770]"
        >
          {code}
        </ShikiHighlighter>
      </motion.div>

      <motion.div
        className="mt-20 flex items-center gap-4"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <button
          type="button"
          onClick={() => setShowMyCursor((prev) => !prev)}
          className={`flex cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap text-gray-200 transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] ${
            showMyCursor
              ? 'border-blue-400 bg-blue-500 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]'
              : 'border-red-400 bg-red-500 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
          }`}
        >
          {showMyCursor ? '내 커서 숨기기' : '내 커서 보이기'}
        </button>
        <button
          type="button"
          onClick={() => setAllowInfoSend((prev) => !prev)}
          className={`flex cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap text-gray-200 transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] ${
            allowInfoSend
              ? 'border-teal-400 bg-teal-500 [box-shadow:0_8px_0_0_#009689,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#009689,0_0px_0_0_#1b70f841]'
              : 'border-red-400 bg-red-500 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
          }`}
        >
          {allowInfoSend ? '내 정보 공유 끄기' : '내 정보 공유 켜기'}
        </button>
        <button
          type="button"
          onClick={() => setDisabled((prev) => !prev)}
          className={`flex min-w-[166px] cursor-pointer items-center justify-center rounded-lg border-[1px] px-4 py-2 text-nowrap text-gray-200 transition-all duration-150 outline-none select-none active:translate-y-2 active:border-b-[0px] ${
            !disabled
              ? 'border-cyan-400 bg-cyan-500 [box-shadow:0_8px_0_0_#0092B8,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#0092B8,0_0px_0_0_#1b70f841]'
              : 'border-red-400 bg-red-500 [box-shadow:0_8px_0_0_#f87171,0_13px_0_0_#f8717141] active:[box-shadow:0_0px_0_0_#f87171,0_0px_0_0_#f8717141]'
          }`}
        >
          {disabled ? 'CoCursor 활성화' : 'CoCursor 비활성화'}
        </button>
      </motion.div>
    </div>
  );
}
