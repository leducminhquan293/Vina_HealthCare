"use client"
import { Accordion } from "react-bootstrap";
import { IMAGES } from "../constant/theme";
import Link from "next/link";
import { accordiondata } from "../constant/alldata";
import Image from "next/image";

function Frequently() {
    return (
        <>
            <section className="content-inner" style={{ backgroundImage: `url(${IMAGES.bg3png.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', }}>
                <div className="container">
                    <div className="row content-wrapper style-5">
                        <div className="col-xxl-7 col-xl-6 col-lg-5 m-b30 align-self-center">
                            <div className="content-info">
                                <div className="section-head style-1 m-b30">
                                    <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s"> Frequently Asked Questions</h2>
                                    <p className="wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                </div>
                                <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
                                    {accordiondata.map((data, i) => (
                                        <Accordion.Item eventKey={data.key} key={i} className="wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.7s">
                                            <Accordion.Header>{data.title}</Accordion.Header>
                                            <Accordion.Body>
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                        <div className="col-xxl-5 col-xl-6 col-lg-7 m-b30">
                            <div className="content-media" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                                <div className="dz-media">
                                    <Image src={IMAGES.about3} alt="" />
                                </div>
                                <div className="item1">
                                    <div className="info-widget style-5">
                                        <div className="widget-media text-primary">
                                            <i className="feather icon-phone-call dz-ring-effect" />
                                        </div>
                                        <div className="widget-content">
                                            <h6 className="title">Contact us</h6>
                                            <Link href="tel:+11234567890" className="text-secondary">+1 123 456 7890</Link>
                                        </div>
                                    </div>
                                    <Link href="/appointment" className="btn btn-lg btn-icon btn-primary btn-shadow">
                                        <span className="w-100">Appointment</span> <span className="right-icon">
                                            <i className="feather icon-arrow-right" /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Frequently;