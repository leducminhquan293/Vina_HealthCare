import Link from "next/link";
import { IMAGES } from "../constant/theme";

function StayInformed() {
    return (
        <>
            <section className="content-inner-1">
                <div className="container">
                    <div className="section-head style-1 m-b30 row align-items-end">
                        <div className="col-lg-7 col-md-8 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                            <h2 className="title m-b0">Stay Informed with <br /> Our Latest Health Blogs</h2>
                        </div>
                        <div className="col-lg-5 col-md-4 text-md-end d-none d-md-block wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                            <Link href="/blog-grid" className="btn btn-icon btn-primary btn-shadow"> View All
                                <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                            </Link>
                        </div>
                    </div>
                    <div className="row g-20">
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                            <div className="dz-card style-2 dz-card-overlay overlay-none" style={{ backgroundImage: `url(${IMAGES.blogoverlay1.src})` }}>
                                <div className="dz-info">
                                    <div className="content-half">
                                        <div className="post-date">12 Jan 2025</div>
                                        <h3 className="dz-title"> <Link href="/blog-details">The Art of Managing Business and Patient Care</Link> </h3>
                                    </div>
                                    <div className="bottom-info">
                                        <Link href="/blog-details" className="btn btn-icon btn-lg btn-primary btn-shadow"> Read More
                                            <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-8 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                            <div className="dz-card style-2 dz-card-overlay" style={{ backgroundImage: `url(${IMAGES.blogoverlaylarge1.src})` }}>
                                <div className="dz-info">
                                    <div className="post-date">12 Jan 2025</div>
                                    <div className="bottom-info">
                                        <h3 className="dz-title"> <Link href="/blog-details">The Art of Managing Business and Patient Care</Link> </h3>
                                        <Link href="/blog-details" className="btn btn-square btn-white rounded-circle">
                                            <i className="feather icon-arrow-up-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-12">
                            <div className="row g-20">
                                <div className="col-xl-12 col-md-6 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">
                                    <div className="dz-card style-2 dz-card-overlay card-sm no-image">
                                        <div className="dz-info">
                                            <div className="post-date">12 Jan 2025</div>
                                            <h3 className="dz-title"> <Link href="/blog-details">Strategies for Balancing Business Demands with Optimal</Link> </h3>
                                            <div className="bottom-info ms-auto">
                                                <Link href="/blog-details" className="btn btn-square btn-white rounded-circle">
                                                    <i className="feather icon-arrow-up-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-md-6 wow fadeInUp" data-wow-delay="0.8s" data-wow-duration="0.8s">
                                    <div className="dz-card style-2 dz-card-overlay card-sm" style={{ backgroundImage: `url(${IMAGES.blogoverlaysmall1.src})` }}>
                                        <div className="dz-info">
                                            <div className="post-date">12 Jan 2025</div>
                                            <div className="bottom-info">
                                                <h3 className="dz-title"> <Link href="/blog-details">Effective Healthcare Tips</Link> </h3>
                                                <Link href="/blog-details" className="btn btn-square btn-white rounded-circle">
                                                    <i className="feather icon-arrow-up-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default StayInformed;