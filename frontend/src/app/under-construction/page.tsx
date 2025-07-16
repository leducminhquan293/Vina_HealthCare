"use client"
import Link from "next/link";
import { IMAGES, SVGICONS } from "../../constant/theme";
import { useRef } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";

function UnderConstruction() {
    let year = new Date().getFullYear();

    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        const result = await sendEmail(form.current);
        if (result.success) {
            console.log('SUCCESS!', result.message);
        } else {
            console.error('FAILED...', result.message);
        }
    };
    
    return (
        <>
            <main className="page-content">
                <section className="under-construct-wrapper">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="under-construct-logo">
                                <Link href="/"><Image src={IMAGES.logo} alt="" /></Link>
                            </div>
                            <div className="dz-content">
                                <h2 className="dz-title">Our website is <span className="text-primary">under construction</span></h2>
                                <p>We’re working hard to bring you a better experience! Our website is under construction, but we’ll be back soon. Stay tuned!</p>
                                <form className="dzSubscribe style-3" ref={form} onSubmit={handleSubmit}>
                                    <div className="dzSubscribeMsg"></div>
                                    <div className="form-group">
                                        <div className="input-group mb-0">
                                            <input name="dzEmail" required type="email" className="form-control" placeholder="Your Email Address" />
                                            <div className="input-group-addon">
                                                <button name="submit" value="Submit" type="submit" className="btn btn-primary btn-hover1">
                                                    <span className="btn-text">Subscribe Now</span>
                                                    <span className="btn-icon">
                                                        <i className="fa-solid fa-paper-plane" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="dz-social-icon style-4">
                                    <ul>
                                        <li><Link href="https://www.facebook.com/dexignzone" target="_blank"><i className="fa-brands fa-facebook-f" /></Link></li>
                                        <li><Link href="https://x.com/dexignzone" target="_blank"><i className="fa-brands fa-twitter" /></Link></li>
                                        <li><Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank"><i className="fa-brands fa-linkedin" /></Link></li>
                                        <li><Link href="https://www.instagram.com/dexignzone" target="_blank"><i className="fa-brands fa-instagram" /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="construct-media">
                                <span dangerouslySetInnerHTML={{__html :  SVGICONS.underconstruction}} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="site-footer">
                <div className="footer-bottom">
                    <div className="container">
                        <div className="fb-inner text-center border-0">
                            <p className="copyright-text">© <span className="current-year">{year}</span> 
                            <Link href="https://themeforest.net/user/dexignzone">DexignZone</Link> Theme. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default UnderConstruction;