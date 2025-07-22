import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../constant/theme";
import { worldclasslistdata } from "../constant/alldata";

function WorldClass() {
    return (
        <>
            <div className="row content-wrapper style-1 align-items-center">
                <div className="col-xl-6 m-b30">
                    <div className="content-media">
                        <div className="dz-media">
                            <Image src={IMAGES.about1} alt="" />
                        </div>
                        <div className="item1" data-bottom-top="transform: translateY(-50px)" data-top-bottom="transform: translateY(50px)">
                            <div className="info-widget style-7">
                                <div className="widget-content bg-secondary">
                                    Video Call Support
                                </div>
                                <div className="widget-media">
                                    <Image src={IMAGES.about2} alt="" />
                                    <div className="call-widget">
                                        <Link href={"#"} scroll={false}> <Image src={IMAGES.camerasvg} alt="" /> </Link>
                                        <Link href={"#"} scroll={false}> <Image src={IMAGES.massagesvg} alt="" /> </Link>
                                        <Link href={"#"} scroll={false} className="active"> <Image src={IMAGES.callsvg} alt="" /> </Link>
                                        <Link href={"#"} scroll={false}> <Image src={IMAGES.mikesvg} alt="" /> </Link>
                                        <Link href={"#"} scroll={false}> <Image src={IMAGES.videosvg} alt="" /> </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item2" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                            <div className="info-widget style-6 bg-primary">
                                <div className="info-icon bg-secondary">
                                    <Image src={IMAGES.clocksvg} alt="" />
                                </div>
                                <div className="widget-content">
                                    <h4 className="title">Open Hours</h4>
                                    <ul>
                                        <li>Monday <strong>09:30 - 07:30</strong></li>
                                        <li>Tuesday <strong>09:30 - 07:30</strong></li>
                                        <li>Wednesday <strong>09:30 - 07:30</strong></li>
                                        <li>Thursday <strong>09:30 - 07:30</strong></li>
                                        <li>Friday <strong>09:30 - 07:30</strong></li>
                                        <li>Saturday <strong>09:30 - 07:30</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 m-b30">
                    <div className="section-head style-1 m-b30">
                        <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">World ClassName Patient Facilities Designed for You </h2>
                        <p className="wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">Experience the future of healthcare. Our state-of-the-art facilities are equipped with the latest technology, ensuring you receive the world's best quality treatment. Here, cutting-edge tools meet unparalleled expertise, providing a comfortable and effective path to optimal health.</p>
                    </div>
                    <ul className="list-check text-secondary grid-2 fw-medium m-b30 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">
                        {worldclasslistdata.map((data, i) => (
                            <li key={i}>{data.title}</li>
                        ))}
                    </ul>
                    <div className="d-flex flex-wrap align-items-center wow fadeInUp" data-wow-delay="0.8s" data-wow-duration="0.8s">
                        <Link href="/appointment" className="btn btn-lg btn-icon btn-secondary btn-shadow m-r30 mb-3 mb-sm-0">
                            Appointment
                            <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                        </Link>
                        <div className="info-widget style-5">
                            <div className="widget-media text-primary">
                                <i className="feather icon-phone-call dz-ring-effect" />
                            </div>
                            <div className="widget-content">
                                <h6 className="title">Contact us</h6>
                                <Link href="tel:+11234567890" className="text-secondary">+1 123 456 7890</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} export default WorldClass;