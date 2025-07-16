"use client"
import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES, SVGICONS } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Sidebar from "@/component/Sidebar";
import { blogdata, BlogItem } from "@/constant/alldata";
import { useState } from "react";

function BlogGrid() {
    const [addData, setAddData] = useState<BlogItem[]>(blogdata);
    const [refresh, setRefresh] = useState(false);
    const handleMoreItem = (): void => {
        setRefresh(true);
        setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * addData.length);
        const randomItem = addData[randomIndex];
        setAddData(prevData => [...prevData, randomItem]);
        setRefresh(false);
        }, 1000);
    };
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Blog Grid" bnrimage={IMAGES.bnr2.src} />
                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 m-b30 pe-xl-5">
                                <div className="row loadmore-content">
                                    {addData.map((item, i) => (
                                        <div className="col-lg-6 col-md-6 m-b25 wow fadeInUp" data-wow-delay={item.dealy} data-wow-duration="0.5s" key={i}>
                                            <div className="dz-card style-2 dz-card-overlay" style={{ backgroundImage: `url(${item.image.src})` }}>
                                                <div className="dz-info">
                                                    <div className="post-date">12 Jan 2025</div>
                                                    <div className="bottom-info">
                                                        <h3 className="dz-title"> <Link href="/blog-details">{item.title}</Link> </h3>
                                                        <Link href="/blog-details" className="btn btn-square btn-white rounded-circle" 
                                                            dangerouslySetInnerHTML={{__html : SVGICONS.uparrow2}}>  
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center m-t30 m-lg-t0 wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="0.5s"
                                        onClick={()=>handleMoreItem()}
                                    >
                                        <Link href={"#"} scroll={false} className={`btn btn-lg btn-icon btn-primary ${refresh ? "dz-load-more": ""}`}>
                                            Load More <span className="right-icon"><i className="feather icon-refresh-ccw" /></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-12">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default BlogGrid;