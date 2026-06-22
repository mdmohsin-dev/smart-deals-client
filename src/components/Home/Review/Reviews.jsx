import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import useAxios from '../../../hooks/useAxios';

const Reviews = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const publicUrl = useAxios()

    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await publicUrl.get('/reviews');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className='max-w-350 w-11/12 mx-auto mt-40 text-center'>
                <p>Loading reviews...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='max-w-350 w-11/12 mx-auto mt-40 text-center'>
                <p>Failed to load reviews.</p>
            </div>
        );
    }

    return (
        <div className='max-w-350 w-11/12 mx-auto my-28 text-black'>
            <div className='text-center lg:w-8/12 w-full mx-auto'>
                <h3 className='text-4xl font-bold'>What our customers are sayings</h3>
                <p className='pt-5'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <div className='mt-16 relative'>
                <div
                    className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
                />
                {/* Right fade mask */}
                <div
                    className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
                />

                {/* Top-right nav arrows */}
                <div className='absolute -top-14 right-0 z-20 flex gap-3'>
                    <button
                        ref={prevRef}
                        className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer'
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <button
                        ref={nextRef}
                        className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer'
                    >
                        <FaArrowRight size={16} />
                    </button>
                </div>

                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    className="mySwiper"
                >
                    {
                        reviews?.map((review) => (
                            <SwiperSlide key={review._id}>
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;