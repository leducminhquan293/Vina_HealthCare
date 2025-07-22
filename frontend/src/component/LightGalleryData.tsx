"use client"
// import Link from "next/link";
import { IMAGES } from "../constant/theme";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Image from "next/image";

function LightGalleryData() {
    return (        
        <div className="overflow-hidden">
            <LightGallery
                zoom={true}
                thumbnail={true}
                plugins={[lgThumbnail, lgZoom]}
                selector='.lightimg'
            >
                <div className="dz-img-wrapper" id="lightgallery">
                    <div className="left-wrapper">
                        <div className="dz-media media-lg">
                            <a href={IMAGES.portfolio1.src} data-src={IMAGES.portfolio1.src} className="lg-item lightimg">
                                <Image src={IMAGES.portfolio1} alt="portfolio" />
                            </a>
                        </div>
                        <div className="media-inner">
                            <div className="dz-media media-md">
                                <a href={IMAGES.portfolio2.src} data-src={IMAGES.portfolio2.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio2} alt="portfolio" />
                                </a>
                            </div>
                            <div className="dz-media media-sm">
                                <a href={IMAGES.portfolio3.src} data-src={IMAGES.portfolio3.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio3} alt="portfolio" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="media-inner">
                            <div className="dz-media media-sm">
                                <a href={IMAGES.portfolio4.src} data-src={IMAGES.portfolio4.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio4} alt="portfolio" />
                                </a>
                            </div>
                            <div className="dz-media media-md">
                                <a href={IMAGES.portfolio5.src} data-src={IMAGES.portfolio5.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio5} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="dz-media media-lg">
                            <a href={IMAGES.portfolio6.src} data-src={IMAGES.portfolio6.src} className="lg-item lightimg">
                                <Image src={IMAGES.portfolio6} alt="portfolio" />
                            </a>
                        </div>
                    </div>
                    <div className="left-wrapper">
                        <div className="dz-media media-lg">
                            <a href={IMAGES.portfolio1.src} data-src={IMAGES.portfolio1.src} className="lg-item lightimg">
                                <Image src={IMAGES.portfolio1} alt="portfolio" />
                            </a>
                        </div>
                        <div className="media-inner">
                            <div className="dz-media media-md">
                                <a href={IMAGES.portfolio2.src} data-src={IMAGES.portfolio2.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio2} alt="portfolio" />
                                </a>
                            </div>
                            <div className="dz-media media-sm">
                                <a href={IMAGES.portfolio3.src} data-src={IMAGES.portfolio3.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio3} alt="portfolio" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="media-inner">
                            <div className="dz-media media-sm">
                                <a href={IMAGES.portfolio4.src} data-src={IMAGES.portfolio4.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio4} alt="portfolio" />
                                </a>
                            </div>
                            <div className="dz-media media-md">
                                <a href={IMAGES.portfolio5.src} data-src={IMAGES.portfolio5.src} className="lg-item lightimg">
                                    <Image src={IMAGES.portfolio5} alt="portfolio" />
                                </a>
                            </div>
                        </div>
                        <div className="dz-media media-lg">
                            <a href={IMAGES.portfolio6.src} data-src={IMAGES.portfolio6.src} className="lg-item lightimg">
                                <Image src={IMAGES.portfolio6} alt="portfolio" />
                            </a>
                        </div>
                    </div>
                </div>
            </LightGallery >
        </div >        
    )
}
export default LightGalleryData;