import Link from "next/link";
import { pricingdata1, pricingdata2 } from "../constant/alldata";

function Pricing() {
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                    <div className="pricingtable-wrapper style-3 pricingtable-detail">
                        <div className="pricing-content-box">
                            <div className="pricingtable-price">
                                <h2 className="pricingtable-bx">Service Plan <span className="badge">20% Off</span></h2>
                                <p className="text">Choose your workspace plan according to your organisational plan</p>
                            </div>
                        </div>
                        <div className="pricingtable-list">
                            <ul className="pricingtable-features">
                                {pricingdata1.map((item, i) => (
                                    <li key={i}>{item.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {pricingdata2.map((item, i) => (
                    <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.8s" key={i}>
                        <div className={`pricingtable-wrapper style-3 ${item.coloumnstand}`}>
                            <div className="pricing-content-box">
                                <div className="pricingtable-price">
                                    {item.title}
                                </div>
                                <div className="pricingtable-button">
                                    <Link href={"#"} scroll={false} className="btn btn-primary btn-hover1 w-100"><span>Choose This Plan</span></Link>
                                </div>
                            </div>
                            <div className="pricingtable-list">
                                {item.feature}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Pricing;