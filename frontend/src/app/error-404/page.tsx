import Link from "next/link";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";

function Error404() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Error 404" bnrimage={IMAGES.bnr2.src} />
                <section className="error-page style-1">
                    <div className="container">
                        <div className="inner-content text-center">
                            <h2 className="dz-error wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s" data-name="404">404</h2>
                            <p className="text wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">We are sorry. But the page you are looking for cannot be found.</p>
                            <Link href="/" className="btn btn-lg btn-primary btn-hover1 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">Back To Home</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />            
        </>
    );
}
export default Error404;