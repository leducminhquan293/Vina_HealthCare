"use client"

import { IMAGES, SVGICONS } from "@/constant/theme";
import Image from "next/image";
import { useState } from "react";

import CalendarData from "./CalendarData";
import DepartmentSelect from "./DepartmentSelect";
import NameSelect from "./NameSelect";

const steps = ["Step Title", "Date & Time", "Your Information", "Payment"];

const AppointmentWizard = () =>{
  	const [currentStep, setCurrentStep] = useState(0);
  	const goNext = () => {
    	if (currentStep < steps.length - 1) {
      		setCurrentStep(prev => prev + 1);
    	}
  	};
  	const goPrev = () => {
    	if (currentStep > 0) {
      		setCurrentStep(prev => prev - 1);
    	}
  	};

    return(
        <section className="content-inner bg-light bg-opacity-50">
			<div className="container">				
				<div id="smartwizard" className="wizard-section sw sw-theme-basic sw-justified">
					<ul className="nav">						
						{steps.map((title, index) => (
							<li className="nav-item" key={index}>
								<div className="nav-item-content">
									<button
										className={`nav-link default ${currentStep === index ? "active" : ""}`}
										onClick={() => setCurrentStep(index)}
									>
										{title}
									</button>
									<input
										className="form-check-input form-check1 ms-auto form-check-secondary"
										type="radio"
										name="stepRadio"
										checked={currentStep === index}
										readOnly
									/>
								</div>
							</li>
						))}
						<li className="wizard-bottom-content">
							<div className="content-info">
								<h5 className="title">Get in Touch</h5>
								<a href="mailto:email@example.com" className="text-primary">email@example.com</a>
							</div>
						</li> 
					</ul>
				
					<div className="tab-content">
						<div className="top-bar">
							<div className="sw-toolbar toolbar toolbar-bottom" role="toolbar">
								<button id="prevBtn" className="btn sw-btn-prev sw-btn" type="button"  onClick={goPrev}>
									<span dangerouslySetInnerHTML={{__html : SVGICONS.previousArrow}} />
									<span className="prev-label"> {steps[currentStep]} </span>
								</button>
							</div>
						</div>
						{currentStep === 0 && (
							<div id="step-1" className="tab-pane d-block" role="tabpanel" aria-labelledby="step-1">
								<div className="row">
									<div className="col-12 m-b10 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">										
										<DepartmentSelect />
									</div>
									<div className="col-12 m-b10 wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="0.8s">
										<NameSelect />
									</div>
								</div>
							</div>
						)}
						{currentStep === 1 && (
							<div id="step-2" className="tab-pane d-block" role="tabpanel" aria-labelledby="step-2">								
								<CalendarData	 />
							</div>
						)}
						{currentStep === 2 && (
							<div id="step-3" className="tab-pane d-block" role="tabpanel" aria-labelledby="step-3">
								<div className="row">
									<div className="col-sm-6 m-b30">
										<div className="form-floating floating-outline input-light">
											<input name="dzFirstName" type="text" className="form-control" id="inputFirstName" required placeholder="First Name" />
											<label htmlFor="inputFirstName">First Name</label>
										</div>
									</div>
									<div className="col-sm-6 m-b30">
										<div className="form-floating floating-outline input-light">
											<input name="dzLastName" type="text" className="form-control" id="inputLastName" required placeholder="Last Name" />
											<label htmlFor="inputLastName">Last Name</label>
										</div>
									</div>
									<div className="col-sm-6 m-b30">
										<div className="form-floating floating-outline input-light">
											<input name="dzEmail" type="email" className="form-control" id="inputYourEmail" required placeholder="Your Email" />
											<label htmlFor="inputYourEmail">Your Email</label>
										</div>
									</div>
									<div className="col-sm-6 m-b30">
										<div className="form-floating floating-outline input-light">
											<input name="dzPhoneNumber" type="text" className="form-control dz-number" id="inputPhoneNumber" required placeholder="Phone Number" />
											<label htmlFor="inputPhoneNumber">Phone Number</label>
										</div>
									</div>
								</div>
							</div>
						)}

						{currentStep === 3 && (
							<div id="step-4" className="tab-pane d-block" role="tabpanel" aria-labelledby="step-4">

								<div className="row m-b30">
									<div className="col-md-12">
										<h4 className="title m-b15 text-capitalize">Payment Methods</h4>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods5" />
											<label className="custom-checkbox form-check-label payment" htmlFor="Methods5">
												<Image src={IMAGES.paypal} alt="/" />
												<span>
													<span className="title">Paypal</span>
												</span>
											</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods6" />
											<label className="custom-checkbox form-check-label payment" htmlFor="Methods6">
												<Image src={IMAGES.debit} alt="/" />
												<span>
													<span className="title">Credit or Debit Card</span>
												</span>
											</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods7" />
												<label className="custom-checkbox form-check-label payment" htmlFor="Methods7">
												<Image src={IMAGES.bank} alt="/" />
												<span>
													<span className="title">Direct bank Transfer</span>
												</span>
											</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods8" />
											<label className="custom-checkbox form-check-label payment" htmlFor="Methods8">
												<Image src={IMAGES.cash} alt="/" />
												<span>
													<span className="title">Cash on Delivery</span>
												</span>
											</label>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6 m-b30">
										<div className="form-floating floating-outline input-light">
											<input 
											name="dzCardNumber" type="text" className="form-control" id="inputCardNumber"  pattern="\d{13,19}" maxLength={19} required placeholder="1234 4567 8910 1112" />
											<label htmlFor="inputCardNumber">Card Number</label>
										</div>
									</div>	
									<div className="col-sm-3 m-b30">
										<div className="form-floating floating-outline input-light">
										<input 
											name="dzExpiryDate" type="date" className="form-control" id="inputExpiryDate" required />
										<label htmlFor="inputExpiryDate">Expiry Date</label>
										</div>
									</div>									
									
									<div className="col-sm-3 m-b30">
										<div className="form-floating floating-outline input-light">
											<input name="dzCVV" type="text" className="form-control" id="inputYourCVV"  pattern="\d{3,4}" maxLength={4} required placeholder="CVC/CVV" />
											<label htmlFor="inputYourCVV">CVC/CVV</label>
										</div>
									</div>
								</div>
							</div>
						)}

						<div className="bottom-bar">
							<div className="sw-toolbar toolbar toolbar-bottom" role="toolbar">
								<button onClick={goNext} className="btn sw-btn-next sw-btn" type="button" >
									Continue
								</button>
							</div>
						</div> 
					</div>
				</div>  
			</div>
		</section>
    )
}
export default AppointmentWizard;