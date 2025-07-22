import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import AppointmentData from "@/component/AppointmentData";
import Whychoose from "@/component/WhyChoose";
import Frequently from "@/component/Frequently";
import Alllocation from "@/component/Alllocation";

const Appointment = () =>{
    return(
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Appointment" bnrimage={IMAGES.bnr2.src} />                
                <AppointmentData />
                <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
                    <div className="container">
                        <Whychoose />
                    </div>
                </section>
                <Alllocation />
                <Frequently />
            </main>
            <Footer /> 
        </>
    )
}
export default Appointment;