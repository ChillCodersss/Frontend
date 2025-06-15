import { } from "react";
import { Fade } from '@mui/material';
import Logo from "@/assets/Notebook.svg";
import './Services.css';


function Services() {
    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    };

    const services_banner_h = "خدمات";

    // useEffect(() => {
    //     const secondImage = document.querySelectorAll(`[id="secondImage"]`);

    //     const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0];

    //         if (entry.isIntersecting && entries[0].target === secondImage[0]) {
    //             setSecondImageVisible(true);
    //             observer.unobserve(secondImage[0]);
    //         }
    //     }, {
    //         threshold: 0.3,
    //     });

    //     observer.observe(secondImage[0]);
    // }, []);

    return (
        <div style={{width: "100%"}}>
            <main>
                <section className='sv-container sv-banner'>
                    <div className='sv-banner-bg'>
                        <img className="sv-banner-bg-img" src={Logo}/>
                    </div>
                    <Fade {...fade_sx}>
                        <h1 className='sv-banner-h'>{services_banner_h}</h1>
                    </Fade>
                </section>
            </main>
        </div>
    )
}

export default Services;