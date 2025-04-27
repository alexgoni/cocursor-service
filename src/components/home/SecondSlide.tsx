import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function SecondSlide() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersection = useIntersectionObserver(containerRef);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isIntersection) {
      mainControls.start('visible');
    }
  }, [isIntersection, mainControls]);

  return (
    <div
      ref={containerRef}
      className="flex h-full items-center justify-center overflow-hidden px-6 lg:px-40"
    >
      <div>
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
          프로젝트에{' '}
          <span className="bg-gradient-to-r from-[#FF7667] to-[#FFB199] bg-clip-text text-transparent">
            색다른 사용자 경험
          </span>
          을 고민 중이신가요?
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
          이런 방식으로 활용해보세요
        </motion.p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-12 md:mt-20">
          <div className="group transition-all duration-300">
            <div className="mx-auto w-4/5 overflow-hidden rounded-2xl border-4 border-[#FF7667] shadow-lg shadow-[#FF766770] transition-transform duration-300 hover:scale-105 sm:w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-xl"
              >
                <source src="/videos/home/planit.mp4" />
              </video>
            </div>
            <p className="mt-4 text-center text-gray-300">
              팀 일정 관리 서비스
            </p>
          </div>

          <div className="group transition-all duration-300">
            <div className="mx-auto w-4/5 overflow-hidden rounded-2xl border-4 border-[#FF7667] shadow-lg shadow-[#FF766770] transition-transform duration-300 hover:scale-105 sm:w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-xl"
              >
                <source src="/videos/home/panda-market.mp4" />
              </video>
            </div>
            <p className="mt-4 text-center text-gray-300">중고마켓 페이지</p>
          </div>
        </div>
      </div>
    </div>
  );
}
