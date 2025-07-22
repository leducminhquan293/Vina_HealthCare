"use client"
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import Countdown from 'react-countdown';
import { useEffect, useRef, useState } from "react";
import type { CountdownRenderProps } from 'react-countdown';
import { useEmailService } from "@/constant/useEmailService";

function ComingSoon() {
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    useEffect(() => {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 28, 23, 59, 59);
        setTargetDate(nextMonth);
    }, []);    
    // const targetDate = new Date('2025-12-31T23:59:59');
    const renderer = ({ days, hours, minutes, seconds, completed } : CountdownRenderProps) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            return (
                <div className="d-flex">
                    <div className="date">
                        <span className="time" id="day">{days}</span>
                        <span className="text"> Days</span>
                    </div>
                    <div className="date">
                        <span className="time" id="hour">{hours}</span>
                        <span className="text">Hours</span>
                    </div>
                    <div className="date">
                        <span className="time" id="min">{minutes}</span>
                        <span className="text">Minutes</span>
                    </div>
                    <div className="date">
                        <div className="time lost" id="second">{seconds}</div>
                        <span className="text">Seconds</span>
                    </div>
                </div>
            );
        }
    };
    
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
            <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 px-0">
                    <div className="dz-coming-bx">
                        <div className="top-wrapper">
                            <div className="coming-soon-logo">
                                <Link href="/"><Image src={IMAGES.logo} alt="logo" /></Link>
                            </div>
                            <div className="dz-content">
                                <h2 className="dz-title pe-xl-4">We Are <br /> Coming Soon</h2>
                                <div className="countdown">                                    
                                    {targetDate && <Countdown date={targetDate} renderer={renderer} />}
                                </div>
                                <p>Big things are coming! ClinicMaster will be opening its doors soon. Be the first to experience something special!</p>
                                <form className="dzSubscribe style-3" ref={form} onSubmit={handleSubmit} method="post">
                                    <div className="dzSubscribeMsg"></div>
                                    <div className="form-group">
                                        <div className="input-group mb-0">
                                            <input name="dzEmail" required type="email" className="form-control" placeholder="enter Your Email Address" />
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
                            </div>
                        </div>
                        <div className="bottom-wrapper">
                            <div className="dz-social-icon style-4 m-b20">
                                <ul>
                                    <li><Link href="https://www.facebook.com/dexignzone" target="_blank"><i className="fa-brands fa-facebook-f" /></Link></li>
                                    <li><Link href="https://x.com/dexignzone" target="_blank"><i className="fa-brands fa-twitter" /></Link></li>
                                    <li><Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank"><i className="fa-brands fa-linkedin" /></Link></li>
                                    <li><Link href="https://www.instagram.com/dexignzone" target="_blank"><i className="fa-brands fa-instagram" /></Link></li>
                                </ul>
                            </div>
                            <p className="copyright-text m-0">© <span className="current-year">2025</span> <Link href="https://themeforest.net/user/dexignzone">DexignZone</Link> Theme. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 px-0">
                    <div className="dz-coming-media">
                        <Image src={IMAGES.comingsoon} alt="coming" />
                    </div>
                </div>
            </div>               
        </>
    );
}
export default ComingSoon;