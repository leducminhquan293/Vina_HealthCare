import Frequently from "@/component/Frequently";
import PageBanner from "@/component/PageBanner";
import Pricing from "@/component/Pricing";
import RealPatient from "@/component/RealPatient";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

function PricingTable() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Pricing Table" bnrimage={IMAGES.bnr1.src} />
                <section className="content-inner">
                    <div className="container">
                        <Pricing />
                    </div>
                </section>
                <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden" 
                    style={{ backgroundImage: `url(${IMAGES.bg3.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover' }}
                >
                    <RealPatient />
                </section>
                <Frequently />
            </main>
            <Footer />            
        </>
    );
}
export default PricingTable;