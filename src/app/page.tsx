'use client';

import FirstSlide from '@/components/home/FirstSlide';
import FourthSlide from '@/components/home/FourthSlide';
import SecondSlide from '@/components/home/SecondSlide';
import ThirdSlide from '@/components/home/ThirdSlide';
import CoCursorProvider from 'cocursor';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
  return (
    <CoCursorProvider apiKey={process.env.NEXT_PUBLIC_COCURSOR_API_KEY!}>
      <div className="h-[calc(100vh-64px)] overflow-y-hidden">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel={true}
          modules={[Mousewheel]}
          style={{ height: '100%' }}
        >
          <SwiperSlide>
            <FirstSlide />
          </SwiperSlide>
          <SwiperSlide>
            <SecondSlide />
          </SwiperSlide>
          <SwiperSlide>
            <ThirdSlide />
          </SwiperSlide>
          <SwiperSlide>
            <FourthSlide />
          </SwiperSlide>
        </Swiper>
      </div>
    </CoCursorProvider>
  );
}
