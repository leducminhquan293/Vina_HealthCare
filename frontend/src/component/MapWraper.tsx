import Link from "next/link";
import { mapdata } from "../constant/alldata";

function MapWraper() {
    return (
        < >
            <section className="content-wrapper style-4">
                <div className="container">
                    <div className="map-wrapper">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-8">
                            <div className="content-info bg-secondary">
                                <div className="section-head style-1 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                                    <h2 className="title m-b0 text-white">Get in Touch with us</h2>
                                    <p className="text-white">Lorem Ipsum is simply dummy</p>
                                </div>
                                {mapdata.map((data, i) => (
                                    <div className="icon-bx-wraper style-1 m-b20 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
                                        <div className="icon-bx">
                                            <span className="icon-cell"> {data.icon} </span>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-title">{data.title}</h5>
                                            {data.para}
                                        </div>
                                    </div>
                                ))}
                                <Link href="/appointment" className="btn btn-lg btn-icon btn-primary w-100 m-t20 btn-shadow wow fadeInUp" data-wow-delay="1.2s" data-wow-duration="0.8s">
                                    <span className="w-100">Appointment</span>
                                    <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MapWraper;