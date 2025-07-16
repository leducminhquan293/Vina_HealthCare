"use client"
import { useRef } from "react";
import { IMAGES } from "../constant/theme";
import { useEmailService } from "@/constant/useEmailService";

function Getintouch() {
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
            <div className="col-xl-5 m-b30" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
                <div className="form-wrapper style-1">
                    <div className="form-body bg-primary background-blend-burn" 
                        style={{ backgroundImage: `url(${IMAGES.bg2png.src})`, backgroundSize: 'cover' }} 
                    >
                        <div className="section-head style-1 m-b30">
                            <h2 className="title text-white m-b0">Get in Touch</h2>
                            <p className="text-white m-b0 fw-medium">You can react us anytime</p>
                        </div>
                        <form ref={form} onSubmit={handleSubmit} className="dzForm">
                            <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
                            <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />
                            <div className="dzFormMsg"></div>
                            <div className="row">
                                <div className="col-sm-6 m-b30">
                                    <div className="form-floating floating-underline input-light">
                                        <input name="dzFirstName" type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                                        <label htmlFor="inputFirstName">First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 m-b30">
                                    <div className="form-floating floating-underline input-light">
                                        <input name="dzLastName" type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                                        <label htmlFor="inputLastName">Last Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 m-b30">
                                    <div className="form-floating floating-underline input-light">
                                        <input name="dzEmail" type="email" className="form-control" id="inputYourEmail" placeholder="Your Email" />
                                        <label htmlFor="inputYourEmail">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 m-b30">
                                    <div className="form-floating floating-underline input-light">
                                        <input name="dzPhoneNumber" type="number" className="form-control dz-number" id="inputPhoneNumber" placeholder="Phone Number" />
                                        <label htmlFor="inputPhoneNumber">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 m-b30">
                                    <div className="form-floating floating-underline input-light">
                                        <textarea name="dzMessage" className="form-control" id="inputMessage" rows={6} placeholder="Select Service"></textarea>
                                        <label htmlFor="inputMessage">Message</label>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type="submit" name="submit" className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
                                        Submit <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Getintouch;