import { IMAGES } from "@/constant/theme";
import Frequently from "@/component/Frequently";
import PageBanner from "@/component/PageBanner";
import Schedule from "@/component/Schedule";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Connect from "@/component/Connect";
import Getintouch from "@/component/Getintouch";

function Faqs() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Faq's" bnrimage={IMAGES.bnr2.src} />
                <Frequently />
                <Schedule />
                <section className="content-inner">
                    <div className="container">
                        <div className="row g-xl-4 align-items-center">
                            <Connect />
                            <Getintouch />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default Faqs;