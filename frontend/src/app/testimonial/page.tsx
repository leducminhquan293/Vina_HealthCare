"use client"
import { useState } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { IMAGES, SVGICONS } from "@/constant/theme";
import PageBanner from "@/component/PageBanner";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import RealPatient from "@/component/RealPatient";
import ClientSwiper2 from "@/component/ClientSwiper2";
import { testidata, testiswipeerdata2 } from "@/constant/alldata";
import Image from "next/image";


function Testimonial() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Testimonial" bnrimage={IMAGES.bnr2.src} />
                <section className="content-inner">
                    <div className="container">
                        <div className="row justify-content-center">
                            {testidata.map((item, i) => (
                                <div className="col-xl-6 col-lg-12 m-b20 wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.7s" key={i}>
                                    <div className="testimonial-1">
                                        <div className="dz-media">
                                            <div className="media-inner">
                                                <Image src={item.image} alt="/" />
                                                <div className="video-bx1 video-sm">
                                                    <Link onClick={handleShow} href="#" scroll={false} className="popup-youtube video-btn bg-primary">
                                                        <i className="fa fa-play" />
                                                    </Link>
                                                    <span>Watch The Video</span>
                                                </div>
                                            </div>
                                            <div className="testimonial-info">
                                                <h5 className="testimonial-name">{item.title}</h5>
                                                <span className="testimonial-position">{item.position}</span>
                                            </div>
                                        </div>
                                        <div className="testimonial-detail">
                                            <div className="testimonial-text">
                                                <h3 className="title">{item.treat}</h3>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="content-inner-1 bg-light bg-opacity-50">
                    <div className="container">
                        <div className="row g-4 align-items-center content-wrapper style-19">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                <Swiper className="swiper testimonial-thumb-swiper4"
                                    slidesPerView={1}
                                    effect="fade"
                                    autoplay={{
                                        delay: 3000,
                                    }}
                                    modules={[EffectFade, Thumbs,Autoplay]}
                                    thumbs={{ swiper: thumbsSwiper }}
                                >
                                    {testiswipeerdata2.map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <div className="content-media">
                                                <Image src={item.image} alt="" className="radius-xl shadow-sm object-fit-cover" />
                                                <div className="video-bx3 video-bx">
                                                    <Link onClick={handleShow} href={"#"} scroll={false} className="popup-youtube video-btn">
                                                        <i className="fa fa-play" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="col-lg-6 overflow-hidden wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">
                                <div className="section-head style-1 m-b30">
                                    <h2 className="title">Video Testimonials.</h2>
                                </div>
                                <div className="swiper-btn-center-lr">
                                    <Swiper className="swiper testimonial-swiper4"
                                        slidesPerView={1}
                                        spaceBetween={20}
                                        centeredSlides={true}
                                        navigation={{
                                            nextEl: '.swiper4-button-next',
                                            prevEl: '.swiper4-button-prev',
                                        }}
                                        autoplay={{
                                            delay: 3000,
                                        }}
                                        loop={true}
                                        modules={[Navigation, Autoplay, Thumbs]}
                                        watchSlidesProgress                                       
                                        onSwiper={setThumbsSwiper}
                                    >
                                        {testiswipeerdata2.map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <div className="testimonial-4">
                                                    <div className="testimonial-text">
                                                        <div className="title-head">
                                                            <div className="quote-icon">
                                                                <Image src={IMAGES.quotation} alt="" />
                                                            </div>
                                                            <h2 className="title">Best Treatment</h2>
                                                        </div>
                                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable</p>
                                                        <div className="quote">“ It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ”</div>
                                                    </div>
                                                    <div className="testimonial-detail">
                                                        <div className="dz-media">
                                                            <Image src={item.image} alt="item" />
                                                        </div>
                                                        <div className="clearfix">
                                                            <h5 className="testimonial-name">{item.name}</h5>
                                                            <span className="testimonial-position">Patient</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="pagination-align">
                                        <div className="swiper4-button-prev btn-prev" dangerouslySetInnerHTML={{__html : SVGICONS.prev}} role="button">                                            
                                        </div>
                                        <div className="swiper4-button-next btn-next" dangerouslySetInnerHTML={{__html : SVGICONS.next}} role="button">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden" style={{ backgroundImage: `url(${IMAGES.bg3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover' }}>
                    <RealPatient />
                </section>
                <ClientSwiper2 />
            </main>
            <Footer />                       
            <Modal show={show} onHide={handleClose} centered  size={"lg"} className="video-model">                           
                <video controls style={{width:"100%"}} autoPlay>
                    <source src="/assets/images/demo.mp4" type="video/mp4" />
                </video>
            </Modal>
        </>
    );
}
export default Testimonial;