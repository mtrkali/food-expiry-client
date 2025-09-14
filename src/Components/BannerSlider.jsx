import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BannerSlider = () => {

    return (
        <div>
            <Swiper modules={[Navigation, Pagination, Autoplay]}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                speed={800}
                className="h-[500px]"
            >
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src="https://picsum.photos/id/1018/600/400" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src="https://picsum.photos/id/1018/600/400" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src="https://picsum.photos/id/1018/600/400" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BannerSlider;