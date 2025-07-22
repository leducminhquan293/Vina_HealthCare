import type { Metadata } from "next";
// import "./globals.css";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import "../../public/assets/css/style.css"
import ScrolltoTop from "@/component/ScrolltoTop";


export const metadata: Metadata = {
  title: "ClinicMaster - Health & Medical NextJs Template",
  description: "ClinicMaster is a clean and modern Health & Medical Next.js template. Ideal for clinics, hospitals, and healthcare providers, with responsive design, booking system, and customizable components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme-color="skin-1">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        {children}
        <ScrolltoTop />
      </body>
    </html>
  );
}
