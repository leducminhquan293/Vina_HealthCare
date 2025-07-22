"use client"
import { Accordion } from "react-bootstrap"
import { accordiondata } from "@/constant/alldata";

const AccordionBlog = () =>{
    return(
        <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
            {accordiondata.map((data, i) => (
                <Accordion.Item eventKey={data.key} key={i} className="wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.7s">
                    <Accordion.Header>{data.title}</Accordion.Header>
                    <Accordion.Body>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
export default AccordionBlog;