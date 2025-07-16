"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { awarddata, awardswiperdata } from "../constant/alldata";
import Image from "next/image";

function Awards() {
    return (
        <>
            <section className="content-inner-1 bg-light overflow-hidden">
                <div className="container-left">
                    <div className="row g-0 align-items-center">
                        <div className="col-xxl-3">
                            <div className="section-head style-1 m-b30">
                                <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Awards </h2>
                                <p className="wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                            {awarddata.map((item, i) => (
                                <Link href={"#"} scroll={false} className="btn btn-outline-light btn-rounded m-r5 m-b10 wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.8s" key={i}>{item.title}</Link>
                            ))}
                        </div>
                        <div className="col-xxl-9">
                            <Swiper className="swiper awards-swiper wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s"
                                loop={true}
                                slidesPerView={4.5}
                                autoplay={{
                                    delay: 3000,
                                }}
                                breakpoints={{
                                    1200: {
                                        slidesPerView: 4.5,
                                    },
                                    991: {
                                        slidesPerView: 4,
                                    },
                                    767: {
                                        slidesPerView: 3,
                                    },
                                    575: {
                                        slidesPerView: 2.5,
                                    },
                                    320: {
                                        slidesPerView: 1.5,
                                    },
                                }}
                                modules={[Autoplay]}
                            >
                                {awardswiperdata.map((data, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="dz-img-box style-1 box-lg grid-bx text-center">
                                            <div className="dz-media">
                                                <Image src={data.image} alt="" />
                                            </div>
                                            <div className="dz-content">
                                                <h3 className="title">ClinicMaster 2024</h3>
                                                <p>Quality and Accreditation Institute</p>
                                                <Link href={"#"} scroll={false} className="btn-link">Save the Childern</Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
export default Awards;