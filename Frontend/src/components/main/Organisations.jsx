import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Loader from '../Loader';

const Organisations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchOrganizations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/organization/info`);
            setOrganizations(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrganizations();
    }, []);

    return (
        <div>
            <section className="py-12 px-4 bg-gray-50 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3 md:mb-4">Organizations You Can Help</h2>
                    <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
                        ChainAid partners with verified organizations that provide essential services to those in need.
                    </p>

                    <div className="relative py-6 md:py-10">
                        {loading && <Loader />}

                        {organizations.length > 0 && (
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                initialSlide={1}
                                loop={true}
                                coverflowEffect={{
                                    rotate: 20,
                                    stretch: 0,
                                    depth: 200,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                modules={[EffectCoverflow, Autoplay]}
                                className="mySwiper"
                            >
                                {organizations.map((org) => (
                                    <SwiperSlide key={org.id} className="swiper-slide-custom">
                                        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full">
                                            <div className="h-36 md:h-48 bg-gray-200">
                                                <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-4 md:p-6">
                                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2 truncate">{org.name}</h3>
                                                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3">{org.vision}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs md:text-sm font-medium text-indigo-600">Goal: Ξ {org.donationAmount} {org.currency}</span>
                                                    <button onClick={() => window.location.href = '/auth'} className="outline-0 px-3 py-1 md:px-4 md:py-2 bg-indigo-600 text-white rounded-lg text-xs md:text-sm cursor-pointer">Donate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className="text-center mt-8 md:mt-10">
                        <button onClick={() => window.location.href = '/auth'} className="cursor-pointer px-4 py-2 md:px-6 md:py-3 border border-indigo-600 text-indigo-600 text-sm md:text-base font-medium rounded-full hover:bg-indigo-50 transition-colors duration-200">
                            View All Organizations
                        </button>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .swiper {
                    width: 100%;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
                
                @media (min-width: 768px) {
                    .swiper {
                        padding-top: 50px;
                        padding-bottom: 50px;
                    }
                }
                
                .swiper-slide-custom {
                    background-position: center;
                    background-size: cover;
                    width: 280px;
                    height: auto;
                    filter: blur(2px);
                    transform: scale(0.9);
                    transition: all 0.3s ease;
                }
                
                @media (min-width: 768px) {
                    .swiper-slide-custom {
                        width: 350px;
                    }
                }
                
                .swiper-slide-active {
                    filter: blur(0);
                    transform: scale(1);
                }
            `}</style>
        </div>
    );
};

export default Organisations;