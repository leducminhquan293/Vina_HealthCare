"use client"
import { useState } from "react";
import Link from "next/link";
import { IMAGES, SVGICONS } from "../constant/theme";
import { mapdata } from "../constant/alldata";
import Image from "next/image";

function Connect() {
    const [active, setactive] = useState(1)
    return (
        <>
            <div className="col-xl-7 pe-xl-4 m-b10">
                <div className="section-head style-1 m-b30">
                    <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Connect with Us for <br /> Your Healthcare Needs</h2>
                    <p className="small wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">Reach out for support, feedback, or to schedule an appointment. Fill out the form, and we'll promptly assist you and confirm your visit with our healthcare professionals.</p>
                </div>
                <div className="clearfix m-b60 m-lg-b30">
                    <div className="d-flex align-items-center m-b15 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">
                        <div className="info-widget style-12 m-r10 bg-light">
                            <div className="avatar-group">
                                <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar1} alt="avatar1" />
                                <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar2} alt="avatar2" />
                                <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar3} alt="avatar3" />
                                <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar4} alt="avatar4" />
                            </div>
                            <div className="clearfix">
                                <span>Talk to over 215 doctor</span>
                            </div>
                        </div>
                        <Link href="/team" className="btn btn-square btn-xl btn-light btn-rounded" 
                            dangerouslySetInnerHTML={{__html : SVGICONS.uparrow}}
                        /> 
                    </div>
                    <div className="widget-rating3 wow fadeInUp" data-wow-delay="0.8s" data-wow-duration="0.8s">
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
                <div className="row">
                    {mapdata.map((data, i) => (
                        <div className="col-md-6 m-b20 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
                            <div className={`icon-bx-wraper style-8 box-hover ${active === data.id ? 'active' : ''}`} onMouseEnter={() => setactive(data.id)}>
                                <div className="icon-bx">
                                    <span className="icon-cell"> {data.icon} </span>
                                </div>
                                <div className="icon-content">
                                    <h4 className="dz-title">{data.title}</h4>
                                    {data.para}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Connect;