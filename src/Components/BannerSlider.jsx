import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BannerSlider = () => {
    return (
        <div>
            <Swiper
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
                {/* Slide 1 */}
                <SwiperSlide className="relative">
                    <img
                        className='h-full w-full object-cover'
                        src="https://i.ibb.co.com/PsLq0xXP/moric.jpg"
                        alt="Chili"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Stay Aware of Food Expiry</h2>
                        <p className="text-lg md:text-xl">Reduce waste and save money by tracking expiry dates.</p>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className="relative">
                    <img
                        className='h-full w-full object-cover'
                        src="https://i.ibb.co.com/bjfn7RV2/bati.jpg"
                        alt="Food Bowl"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Healthy Food, Right Time</h2>
                        <p className="text-lg md:text-xl">Don’t let expired food affect your health.</p>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="relative">
                    <img
                        className='h-full w-full object-cover'
                        src="https://i.ibb.co.com/8gzmp8G2/kadol.jpg"
                        alt="Vegetables"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Smart Expiry Tracking</h2>
                        <p className="text-lg md:text-xl">Keep your kitchen fresh and organized easily.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BannerSlider;
