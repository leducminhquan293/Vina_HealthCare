"use client"
import { useState } from "react";
import Link from "next/link";
import { serviceboxdata } from "../constant/alldata";

function ServiceBox() {
    const [active, setActive] = useState(1);
    return (
        <>
            <div className="row">
                {serviceboxdata.map((data, i) => (
                    <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
                        <div className={`icon-bx-wraper style-3 box-hover ${active === data.id ? 'active' : ''}`} onMouseEnter={() => setActive(data.id)}>
                            <div className="icon-bx-head">
                                <div className="icon-bx"> 
                                    <span className="icon-cell" dangerouslySetInnerHTML={{__html : data.svg1}}>  
                                    </span> 
                                </div>
                                <span className="icon-bg" 
                                    dangerouslySetInnerHTML={{__html : data.svg2}}> 
                                </span>
                                <div className="icon-content">
                                    <h3 className="dz-title">{data.title}</h3>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                            </div>
                            <div className="icon-bx-footer">
                                <span className="text-badge"><i className="fa fa-circle text-primary" /> 25+ Doctor</span>
                                <Link href="/service-detail" className="btn btn-square btn-primary rounded-circle">
                                    <i className="feather icon-arrow-up-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
} 
export default ServiceBox;