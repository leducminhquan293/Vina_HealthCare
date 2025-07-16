import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import PageBanner from "@/component/PageBanner";
import { servicedetails, worldclasslistdata } from "@/constant/alldata";
import Image from "next/image";
import AccordionBlog from "./_components/AccordionBlog";
import SurgeryBlog from "./_components/SurgeryBlog";

function ServiceDetail() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Service Detail" bnrimage={IMAGES.bnr2.src} />
                <section className="content-inner service-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 single-inner order-lg-1">
                                <div className="single-media dz-media single-media height-sm radius-lg wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.7s">
                                    <Image src={IMAGES.bloggrid2} alt="" className="object-fit-cover" />
                                </div>
                                <div className="content-item wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                    <h2>Angioplasty</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.</p>
                                </div>
                                <div className="content-item wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="0.7s">
                                    <h3>Steps in Angioplasty</h3>
                                    <ul className="list-check text-secondary grid-2 m-b30">
                                        {worldclasslistdata.map((item, i) => (
                                            <li key={i}>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="content-item wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">
                                    <h3>Available Doctors Under Surgery</h3>
                                    <SurgeryBlog />
                                </div>
                                <div className="content-item wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="0.7s">
                                    <h3>Frequently asked questions</h3>
                                   <AccordionBlog />
                                </div>
                            </div>
                            <div className="col-lg-4 m-b30">
                                <aside className="side-bar sticky-top left">
                                    <div className="widget service_menu_nav bg-secondary wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                        <div className="widget-title">
                                            <h4 className="title">All Services</h4>
                                        </div>
                                        <ul>
                                            {servicedetails.map((item, i) => (
                                                <li key={i} className={item.columnstand}><Link href="#" scroll={false}>{item.title}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="widget_contact wow fadeInUp" 
                                        style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }} data-wow-delay="0.4s" data-wow-duration="0.7s"
                                    >
                                        <div className="widget-content">
                                            <Image src={IMAGES.question} width="80" alt="" />
                                            <h4 className="title">Do you need any help?</h4>
                                            <div className="phone-number">
                                                <Link href="tel:+11234567890">+1 123 456 7890</Link>
                                            </div>
                                            <div className="email">
                                                <Link href="mailto:info@support.com">info@support.com</Link>
                                            </div>
                                            <div className="link-btn">
                                                <Link href="#" scroll={false} className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
                                                    Contact Us <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default ServiceDetail;