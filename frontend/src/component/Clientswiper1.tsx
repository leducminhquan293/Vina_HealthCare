"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { clientswiperdata1 } from "../constant/alldata";
import Image from "next/image";

function Clientswiper1() {
    return (
        <>
            <section className="content-inner">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-4">
                            <div className="section-head style-1 m-b30">
                                <h2 className="title m-b0 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Our Accepted insurance</h2>
                            </div>
                        </div>
                        <div className="col-xl-8 m-b30">
                            <Swiper className="swiper client-swiper2"
                                slidesPerView={4}
                                spaceBetween={30}
                                autoplay={{
                                    delay: 3000,
                                }}
                                loop={true}
                                breakpoints={{
                                    767: {
                                        slidesPerView: 4,
                                    },
                                    575: {
                                        slidesPerView: 3,
                                    },
                                    320: {
                                        slidesPerView: 2,
                                    },
                                }}
                                modules={[Autoplay]}
                            >
                                {clientswiperdata1.map((item, i) => (
                                    <SwiperSlide key={i} className="wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.8s">
                                        <div className="clients-logo2">
                                            <Image src={item.image} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Clientswiper1;