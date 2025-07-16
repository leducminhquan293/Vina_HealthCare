"use client"
import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Sidebar from "@/component/Sidebar";
import { blogdata2, BlogItem } from "@/constant/alldata";
import Image from "next/image";
import { useState } from "react";

function BlogListSidebar() {
    const [addData, setAddData] = useState<BlogItem[]>(blogdata2);
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
                <PageBanner title="Blog List Sidebar" bnrimage={IMAGES.bnr2.src} />
                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 m-b30 pe-xl-5">
                                <div className="row loadmore-content">
                                    {addData.map((item, i) => (
                                        <div className="dz-card style-2 blog-half m-b35 wow fadeInUp" data-wow-delay={item.dealy} data-wow-duration="0.5s" key={i}>
                                            <div className="dz-media">
                                                <Image src={item.image} alt="" />
                                            </div>
                                            <div className="dz-info">
                                                <div className="dz-meta">
                                                    <ul>
                                                        <li className="post-date">AUGUST 5, 2025</li>
                                                        <li className="post-author">By <Link href={"#"} scroll={false}>ClinicMaster</Link></li>
                                                        <li className="post-comments">2 COMMENTS</li>
                                                    </ul>
                                                </div>
                                                <h3 className="dz-title"><Link href={"#"} scroll={false}>{item.title}</Link></h3>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                <Link href={"#"} scroll={false} className="btn icon-link-hover-end btn-primary radius-sm">
                                                    Read More <i className="feather icon-arrow-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center m-t30 m-lg-t0 wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="0.5s">
                                        <Link href={"#"} scroll={false} className={`btn btn-lg btn-icon btn-primary ${refresh ? "dz-load-more": ""}`}
                                            onClick={()=>handleMoreItem()}
                                        >
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
export default BlogListSidebar;