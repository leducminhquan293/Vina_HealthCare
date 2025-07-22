import { Fragment } from "react"
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import AboutUs from "./_components/AboutUs"

const AboutUsPage = () =>{
    return(
        <Fragment>
            <Header />
            <AboutUs />
            <Footer />
        </Fragment>
    )
}
export default AboutUsPage;