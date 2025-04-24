import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import ResponsiveRenderer from '../shared/ResponsiveRenderer';

export default function FourthSlide() {
  return (
    <ResponsiveRenderer mobile={<MobileComponent />} pc={<PCComponent />} />
  );
}

function MobileComponent() {
  return (
    <div className="flex h-full items-center justify-between p-6">
      모바일입니당
    </div>
  );
}

function PCComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersection = useIntersectionObserver(containerRef);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isIntersection) {
      mainControls.start('visible');
    }
  }, [isIntersection, mainControls]);

  return (
    <div ref={containerRef} className="h-full px-20 py-28">
      <motion.h1
        className="text-center text-4xl leading-snug font-semibold text-white lg:text-5xl"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        transition={{ duration: 0.6 }}
      >
        화면이 달라도, 경험은 같게
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
        디스플레이 비율을 기준으로 위치를 추적합니다
      </motion.p>

      <div className="mt-20 -ml-12 flex items-center justify-center gap-20 lg:mt-14">
        <div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[278px] shrink-0 overflow-hidden rounded-2xl border-4 border-[#FF7667] object-cover shadow-lg shadow-[#FF766770] lg:h-[355px]"
          >
            <source src="/videos/home/1920-1080.mp4" />
          </video>
          <p className="mt-3 text-center text-sm text-gray-300">1920 x 1080</p>
        </div>
        <div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[278px] w-[160px] shrink-0 overflow-hidden rounded-2xl border-4 border-[#FF7667] object-cover shadow-lg shadow-[#FF766770] lg:h-[355px] lg:w-[200px]"
          >
            <source src="/videos/home/iphone-se.mp4" />
          </video>
          <p className="mt-3 text-center text-sm text-gray-300">iPhone SE</p>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/login"
          className="inline-block rounded-xl bg-[#FFB199] px-8 py-2 text-lg font-semibold text-black shadow-2xl transition hover:brightness-110"
        >
          지금 시작하기
        </Link>
      </div>
    </div>
  );
}
