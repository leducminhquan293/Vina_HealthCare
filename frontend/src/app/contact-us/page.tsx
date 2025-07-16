import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Connect from "@/component/Connect";
import Getintouch from "@/component/Getintouch";
import Alllocation from "@/component/Alllocation";
import Image from "next/image";

function Contactus() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Contact Us" bnrimage={IMAGES.bnr1.src} />
                <section className="content-inner">
                    <div className="container">
                        <div className="row g-xl-4 align-items-center">
                            <Connect />
                            <Getintouch />
                        </div>
                    </div>
                </section>
                <Alllocation />
                <div className="clearfix">
                    <div className="map-wrapper style-2">
                        <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"                         
                            style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        />                            
                        
                        <div className="container">
                            <div className="content-bx style-5 position-absolute wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.5s">
                                <div className="content-logo">
                                    <Image src={IMAGES.logo} alt="logo" />
                                </div>
                                <div className="content-text">
                                    <p className="m-b0">1234 Elm Street Springfield, IL 62704 USA</p>
                                </div>
                                <div className="dz-footer">
                                    <Link href="https://www.google.com/maps/" target="_blank" className="icon-link-hover-end">Open Google Map 
                                        <i className="feather icon-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />            
        </>
    );
}
export default Contactus;