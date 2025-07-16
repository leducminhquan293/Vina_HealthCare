"use client"
import { useEffect, useState } from "react";

function ScrolltoTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = (): void => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} className={`scroltop ${isVisible ? 'show' : ''}`}>
            <i className="fas fa-arrow-up" />
        </button>
    );
}

export default ScrolltoTop;