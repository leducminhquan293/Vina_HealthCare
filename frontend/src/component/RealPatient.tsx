"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGES } from "../constant/theme";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import 'swiper/css/navigation';
import { testiswipeerdata } from "../constant/alldata";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";

function RealPatient() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="container">
                <div className="row content-wrapper style-2">
                    <div className="col-xl-6">
                        <div className="content-media">
                            <div className="dz-media">
                                <Image src={IMAGES.about2png} alt="" />
                            </div>
                            <div className="circle-wrapper" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                                <span className="circle1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <span className="circle2">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div className="item1" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                                <div className="info-widget style-1 move-3">
                                    <div className="avatar-group">
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar1} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar2} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar3} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar4} alt="" />
                                    </div>
                                    <div className="clearfix ms-2">
                                        <span className="number text-primary">150k</span>
                                        <span>Patient recovers</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item2" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                                <div className="info-widget style-3 move-1">
                                    <div className="widget-head">
                                        <div className="widget-media">
                                            <Image src={IMAGES.smallavatar5} alt="" />
                                        </div>
                                        <div className="widget-content">
                                            <h6 className="title">Dr. Natali jackson</h6>
                                            <ul className="star-list">
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>“It is a long established fact that a reader will be distracted by the readable content”</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-10 align-self-center m-b30">
                        <div className="section-head style-1 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                            <h2 className="title text-white m-b0">Real Patients, Real Stories. And our achievements </h2>
                        </div>
                        <div className="swiper-btn-center-lr wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">
                            <Swiper className="swiper testimonial-swiper1"
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                }}
                                navigation={{
                                    nextEl: ".swiper1-button-next",
                                    prevEl: ".swiper1-button-prev",                                    
                                }}
                                modules={[Navigation, Autoplay]}
                            >
                                {testiswipeerdata.map((data, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="testimonial-1 shadow-md">
                                            <div className="dz-media">
                                                <div className="media-inner">
                                                    <Image src={data.image} alt="/" />
                                                    <Link onClick={handleShow} href={"#"} className="video-bx1 video-sm popup-youtube">
                                                        <div className="video-btn bg-primary"> <i className="fa fa-play" /> </div>
                                                        <span>Watch The Video</span>
                                                    </Link>
                                                </div>
                                                <div className="testimonial-info">
                                                    <h5 className="testimonial-name">{data.name}</h5>
                                                    <span className="testimonial-position">Patient</span>
                                                </div>
                                            </div>
                                            <div className="testimonial-detail">
                                                <div className="testimonial-text">
                                                    <h3 className="title">Best Treatment</h3>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper1-button-prev btn-prev" role="button">
                                <Image src={IMAGES.arrowleft} alt="" />
                            </div>
                            <div className="swiper1-button-next btn-next" role="button">
                                <Image src={IMAGES.arrowright} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ" title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Modal>
        </>
    )
}
export default RealPatient;