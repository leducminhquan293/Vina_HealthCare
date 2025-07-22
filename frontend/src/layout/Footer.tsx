"use client"
import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { footerdata1, footerdata2 } from "../constant/alldata";
import { useRef } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";


function Footer() {
    let year =  new Date().getFullYear();
    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        const result = await sendEmail(form.current);
        if (result.success) {
            console.log('SUCCESS!', result.message);
        } else {
            console.error('FAILED...', result.message);
        }
    };
    return (
        <>
            <footer className="site-footer style-1 overlay-primary-light" style={{ backgroundImage: `url(${IMAGES.bg4.src})` }} >
                <div className="footer-head">
                    <div className="container">
                        <div className="fh-inner">
                            <div className="row g-3 align-items-center">
                                <div className="col-xl-3 col-md-12 col-sm-6 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                                    <h3 className="title">Get in Touch with us</h3>
                                    <p className="text">Lorem Ipsum is simply dummy</p>
                                </div>
                                {footerdata1.map((data, i) => (
                                    <div className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
                                        <div className="icon-bx-wraper style-1">
                                            <div className="icon-bx bg-secondary">
                                                <span className="icon-cell">
                                                    {data.icon}
                                                </span>
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="dz-title">{data.title}</h5>
                                                <p>{data.paragraph}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-sm-12 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                                <div className="widget widget_about me-2">
                                    <div className="footer-logo logo-white">
                                        <Link href="/"><Image src={IMAGES.logo} alt="" /></Link>
                                    </div>
                                    <p><span className="text-primary">ClinicMaster</span> Ipsum Dolor Sit Amet, Consectetuer Adipiscing Elit, Sed Diam Nonummy Nibh Euismod Tincidunt Ut Laoreet Dolore Agna Aliquam Erat . Wisi Enim Ad Minim Veniam, Quis Tation. Sit Amet, Consec Tetuer. Ipsum Dolor</p>
                                </div>
                            </div>
                            {footerdata2.map((data, i) => (
                                <div className="col-xl-2 col-md-3 col-6 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
                                    <div className="widget widget_services">
                                        <h2 className="footer-title">{data.title} </h2>
                                        <ul className="list-hover1">
                                            <li><Link href={data.link1}><span>{data.span1}</span></Link></li>
                                            <li><Link href={data.link2}><span>{data.span2}</span></Link></li>
                                            <li><Link href={data.link3}><span>{data.span3}</span></Link></li>
                                            <li><Link href={data.link4}><span>{data.span4}</span></Link></li>
                                            <li><Link href={data.link5}><span>{data.span5}</span></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-middle">
                    <div className="container">
                        <div className="fm-inner">
                            <div className="row align-items-center g-lg-5 g-4">
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                                    <h2 className="title">Important Updates Waiting for you</h2>
                                    <p>Get our latest and best contents right into your inbox</p>
                                </div>
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                                    <form className="dzSubscribe style-1" ref={form} onSubmit={handleSubmit}>
                                        <div className="dzSubscribeMsg"></div>
                                        <div className="form-group">
                                            <div className="input-group mb-0">
                                                <input name="dzEmail" required type="email" className="form-control" placeholder="Your Email Address" />
                                                <div className="input-group-addon">
                                                    <button name="submit" value="Submit" type="submit" className="btn btn-primary btn-hover1">
                                                        <span className="btn-text">Subscribe Now</span>
                                                        <span className="btn-icon">
                                                            <i className="fa-solid fa-paper-plane" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="fb-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 text-start">
                                    <p className="copyright-text">© <span className="current-year">{year}</span> 
                                    <Link href="https://themeforest.net/user/dexignzone" target="_blank"> DexignZone</Link> Theme. All Rights Reserved.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 text-end">
                                    <div className="d-flex align-items-center justify-content-center justify-content-md-center justify-content-xl-end">
                                        <div className="widget-rating1">
                                            <Image src={IMAGES.google} alt="google" />
                                            <ul className="star-list">
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                            </ul>
                                            <span className="rating">(4.8)</span>
                                            <span className="text">12k+ ratings on google</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item1">
                    <div className="info-widget style-4">
                        <div className="widget-media">
                            <Image src={IMAGES.smallavatar6} alt="" />
                        </div>
                        <div className="widget-content">
                            <h6 className="title">Have a Question?</h6>
                            <Link href="mailto:info@example.com">info@example.com</Link>
                            <span className="text">John Cane</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;